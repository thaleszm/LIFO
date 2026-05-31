const BASE = import.meta.env.API_URL || '/api/stack';

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || 'Erro na requisição');
  }
  return data;
}

export const stackApi = {
  getStack: () => request('/'),
  peek: () => request('/peek'),
  push: (value) => request('/push', { method: 'POST', body: JSON.stringify({ value }) }),
  pop: () => request('/pop', { method: 'DELETE' }),
  clear: () => request('/clear', { method: 'DELETE' }),
};