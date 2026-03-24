import { Router, Request, Response } from 'express';
import { randomUUID } from 'crypto';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getUsersContainer } from '../db/cosmos';
import { User } from '../types';

const router = Router();

// POST /api/auth/register
router.post('/register', async (req: Request, res: Response) => {
  const { email, password } = req.body as { email?: string; password?: string };

  if (!email || !password) {
    res.status(400).json({ error: 'email and password are required' });
    return;
  }

  if (password.length < 8) {
    res.status(400).json({ error: 'password must be at least 8 characters' });
    return;
  }

  try {
    const container = await getUsersContainer();
    const normalizedEmail = email.toLowerCase();

    const { resources } = await container.items
      .query<User>({
        query: 'SELECT * FROM c WHERE c.email = @email',
        parameters: [{ name: '@email', value: normalizedEmail }],
      })
      .fetchAll();

    if (resources.length > 0) {
      res.status(409).json({ error: 'A user with that email already exists' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const now = new Date().toISOString();
    const user: User = {
      id: randomUUID(),
      email: normalizedEmail,
      hashedPassword,
      createdAt: now,
    };

    await container.items.create<User>(user);

    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error('JWT_SECRET environment variable is not set');

    const token = jwt.sign({ userId: user.id, email: user.email }, secret, { expiresIn: '7d' });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const { hashedPassword: _omit, ...safeUser } = user;
    res.status(201).json({ user: safeUser });
  } catch (err) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

export default router;
