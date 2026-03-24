import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import scriptsRouter from './routes/scripts';
import authRouter from './routes/auth';

const app = express();
const PORT = process.env.PORT ?? 3001;
const isProd = process.env.NODE_ENV === 'production';

if (!isProd) {
  app.use(cors({ origin: 'http://localhost:3000' }));
}

app.use(express.json());
app.use(cookieParser());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/auth', authRouter);
app.use('/api/scripts', scriptsRouter);

if (isProd) {
  const buildPath = path.join(__dirname, '../../build');
  app.use(express.static(buildPath));
  app.get('*', (_req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`StoryForge API running on http://localhost:${PORT}`);
});
