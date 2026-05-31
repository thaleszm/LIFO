import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initDb } from './db.js';
import stackRouter from './routes/stack.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: '*' 
}));
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'LIFO Lab API' });
});

app.use('/api/stack', stackRouter);

async function start() {
  try {
    await initDb();
    app.listen(PORT, () => {
      console.log(`LIFO Lab API rodando em http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Falha ao iniciar:', err.message);
    process.exit(1);
  }
}

start();
