import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { processChatRequest } from './api/chat.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();

  // Parse command line flags (--port <number>, --host <string>) or fallback to env vars / defaults
  let cliPort: number | undefined;
  let cliHost: string | undefined;
  for (let i = 2; i < process.argv.length; i++) {
    if (process.argv[i] === '--port' && process.argv[i + 1]) {
      cliPort = Number(process.argv[i + 1]);
    }
    if (process.argv[i] === '--host' && process.argv[i + 1]) {
      cliHost = process.argv[i + 1];
    }
  }

  const PORT = cliPort || Number(process.env.PORT) || 3000;
  const HOST = cliHost || process.env.HOST || '0.0.0.0';
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
      server: { middlewareMode: true, host: HOST, port: PORT },
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

  app.listen(PORT, HOST, () => {
    console.log(`Command Center running at http://${HOST}:${PORT} (${isProd ? 'production' : 'development'})`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
