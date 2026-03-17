import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import scriptsRouter from './routes/scripts';

const app = express();
const PORT = process.env.PORT ?? 3001;

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/scripts', scriptsRouter);

app.listen(PORT, () => {
  console.log(`StoryForge API running on http://localhost:${PORT}`);
});
