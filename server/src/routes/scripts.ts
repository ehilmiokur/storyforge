import { Router, Request, Response } from 'express';
import { randomUUID } from 'crypto';
import { getScriptsContainer } from '../db/cosmos';
import { Script, Scene, ScriptStatus } from '../types';

const router = Router();

// GET /api/scripts
router.get('/', async (_req: Request, res: Response) => {
  try {
    const container = await getScriptsContainer();
    const { resources } = await container.items
      .query<Script>('SELECT c.id, c.title, c.status, c.createdAt, c.updatedAt, ARRAY_LENGTH(c.scenes) AS sceneCount FROM c')
      .fetchAll();
    res.json(resources);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch scripts' });
  }
});

// POST /api/scripts
router.post('/', async (req: Request, res: Response) => {
  const { title, status = 'idea' } = req.body as { title: string; status?: ScriptStatus };

  if (!title?.trim()) {
    res.status(400).json({ error: 'title is required' });
    return;
  }

  try {
    const container = await getScriptsContainer();
    const now = new Date().toISOString();
    const script: Script = {
      id: randomUUID(),
      title: title.trim(),
      status,
      scenes: [],
      createdAt: now,
      updatedAt: now,
    };

    const { resource } = await container.items.create<Script>(script);
    res.status(201).json(resource);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create script' });
  }
});

// GET /api/scripts/:id
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const container = await getScriptsContainer();
    const { resource } = await container.item(req.params.id, req.params.id).read<Script>();

    if (!resource) {
      res.status(404).json({ error: 'Script not found' });
      return;
    }

    res.json(resource);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch script' });
  }
});

// DELETE /api/scripts/:id
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const container = await getScriptsContainer();
    await container.item(req.params.id, req.params.id).delete();
    res.status(204).send();
  } catch (err: any) {
    if (err.code === 404) {
      res.status(404).json({ error: 'Script not found' });
      return;
    }
    res.status(500).json({ error: 'Failed to delete script' });
  }
});

// POST /api/scripts/:id/scenes
router.post('/:id/scenes', async (req: Request, res: Response) => {
  const { title, content = '' } = req.body as { title: string; content?: string };

  if (!title?.trim()) {
    res.status(400).json({ error: 'title is required' });
    return;
  }

  try {
    const container = await getScriptsContainer();
    const { resource: script } = await container.item(req.params.id, req.params.id).read<Script>();

    if (!script) {
      res.status(404).json({ error: 'Script not found' });
      return;
    }

    const now = new Date().toISOString();
    const scene: Scene = {
      id: randomUUID(),
      scriptId: script.id,
      title: title.trim(),
      content,
      order: script.scenes.length,
      createdAt: now,
      updatedAt: now,
    };

    script.scenes.push(scene);
    script.updatedAt = now;

    await container.item(script.id, script.id).replace(script);
    res.status(201).json(scene);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add scene' });
  }
});

// PUT /api/scripts/:id/scenes/:sceneId
router.put('/:id/scenes/:sceneId', async (req: Request, res: Response) => {
  const { title, content, order } = req.body as Partial<Pick<Scene, 'title' | 'content' | 'order'>>;

  try {
    const container = await getScriptsContainer();
    const { resource: script } = await container.item(req.params.id, req.params.id).read<Script>();

    if (!script) {
      res.status(404).json({ error: 'Script not found' });
      return;
    }

    const sceneIndex = script.scenes.findIndex(s => s.id === req.params.sceneId);
    if (sceneIndex === -1) {
      res.status(404).json({ error: 'Scene not found' });
      return;
    }

    const now = new Date().toISOString();
    script.scenes[sceneIndex] = {
      ...script.scenes[sceneIndex],
      ...(title !== undefined && { title: title.trim() }),
      ...(content !== undefined && { content }),
      ...(order !== undefined && { order }),
      updatedAt: now,
    };
    script.updatedAt = now;

    await container.item(script.id, script.id).replace(script);
    res.json(script.scenes[sceneIndex]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update scene' });
  }
});

export default router;
