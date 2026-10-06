import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { processChatRequest } from './api/chat.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;
  const isProd = process.env.NODE_ENV === 'production';

  app.use(express.json());

  // Backend Chat API endpoint
  app.post('/api/chat', async (req, res) => {
    try {
      const messages = req.body?.messages || [];
      if (!Array.isArray(messages) || messages.length === 0) {
        return res.status(400).json({ error: 'Invalid payload: "messages" array is required.' });
      }

      const result = await processChatRequest(messages);
      return res.status(200).json(result);
    } catch (error: any) {
      console.error('Server /api/chat error:', error);
      return res.status(500).json({
        error: 'Failed to process chat request.',
        detail: error?.message
      });
    }
  });

  if (!isProd) {
    // Development mode: attach Vite middleware
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true, host: '0.0.0.0', port: PORT },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production mode: serve built assets
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Command Center running at http://localhost:${PORT} (${isProd ? 'production' : 'development'})`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
