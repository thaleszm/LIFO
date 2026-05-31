import pool from '../db.js';

export async function getStack() {
  const { rows } = await pool.query(
    'SELECT id, value, position, created_at FROM stack_items ORDER BY position ASC'
  );
  return rows;
}

export async function getSize() {
  const { rows } = await pool.query('SELECT COUNT(*)::int AS size FROM stack_items');
  return rows[0].size;
}

export async function peek() {
  const { rows } = await pool.query(
    'SELECT id, value, position, created_at FROM stack_items ORDER BY position DESC LIMIT 1'
  );
  return rows[0] ?? null;
}

export async function push(value) {
  const trimmed = String(value).trim();
  if (!trimmed) {
    throw new Error('Valor não pode ser vazio');
  }

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const { rows } = await client.query(
      'SELECT COALESCE(MAX(position), 0) + 1 AS next FROM stack_items'
    );
    const nextPosition = rows[0].next;

    const inserted = await client.query(
      'INSERT INTO stack_items (value, position) VALUES ($1, $2) RETURNING id, value, position, created_at',
      [trimmed, nextPosition]
    );

    await client.query('COMMIT');
    return inserted.rows[0];
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}

export async function pop() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const { rows } = await client.query(
      'SELECT id, value, position FROM stack_items ORDER BY position DESC LIMIT 1 FOR UPDATE'
    );

    if (rows.length === 0) {
      await client.query('ROLLBACK');
      return null;
    }

    const top = rows[0];
    await client.query('DELETE FROM stack_items WHERE id = $1', [top.id]);

    await client.query('COMMIT');
    return top;
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}

export async function clearStack() {
  const { rowCount } = await pool.query('DELETE FROM stack_items');
  return rowCount;
}
