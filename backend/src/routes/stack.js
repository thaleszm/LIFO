import { Router } from 'express';
import * as stackService from '../services/stackService.js';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const items = await stackService.getStack();
    const size = items.length;
    res.json({
      items,
      size,
      isEmpty: size === 0,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/peek', async (_req, res) => {
  try {
    const top = await stackService.peek();
    if (!top) {
      return res.status(404).json({ error: 'Pilha vazia' });
    }
    res.json(top);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/push', async (req, res) => {
  try {
    const { value } = req.body;
    if (value === undefined || value === null) {
      return res.status(400).json({ error: 'Campo "value" é obrigatório' });
    }
    const item = await stackService.push(value);
    const size = await stackService.getSize();
    res.status(201).json({ item, size, message: 'Push realizado (LIFO)' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/pop', async (_req, res) => {
  try {
    const item = await stackService.pop();
    if (!item) {
      return res.status(404).json({ error: 'Pilha vazia — nada para remover' });
    }
    const size = await stackService.getSize();
    res.json({ item, size, message: 'Pop realizado (último a entrar, primeiro a sair)' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/clear', async (_req, res) => {
  try {
    const removed = await stackService.clearStack();
    res.json({ removed, message: 'Pilha esvaziada' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
