import { useCallback, useEffect, useState } from 'react';
import { stackApi } from './api';
import StackVisual from './components/StackVisual';
import Controls from './components/Controls';

export default function App() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const loadStack = useCallback(async () => {
    const data = await stackApi.getStack();
    setItems(data.items);
    return data;
  }, []);

  useEffect(() => {
    loadStack()
      .catch((err) => setMessage(err.message))
      .finally(() => setLoading(false));
  }, [loadStack]);

  const showMessage = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(''), 3500);
  };

  const handlePush = async () => {
    try {
      const data = await stackApi.push(input);
      setInput('');
      await loadStack();
      showMessage(`Push: "${data.item.value}" entrou no topo`);
    } catch (err) {
      showMessage(err.message);
    }
  };

  const handlePop = async () => {
    try {
      const data = await stackApi.pop();
      await loadStack();
      showMessage(`Pop: "${data.item.value}" saiu do topo`);
    } catch (err) {
      showMessage(err.message);
    }
  };

  const handlePeek = async () => {
    try {
      const top = await stackApi.peek();
      showMessage(`Peek: topo = "${top.value}" (sem remover)`);
    } catch (err) {
      showMessage(err.message);
    }
  };

  const handleClear = async () => {
    try {
      const data = await stackApi.clear();
      await loadStack();
      showMessage(`${data.removed} item(ns) removido(s)`);
    } catch (err) {
      showMessage(err.message);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <div>
          <p className="eyebrow">Estrutura de Dados</p>
          <h1>LIFO Lab</h1>
          <p className="subtitle">Last In, First Out — Pilha interativa</p>
        </div>
        <div className="badge">{items.length} {items.length === 1 ? 'item' : 'itens'}</div>
      </header>

      <main className="layout">
        <section className="panel">
          <StackVisual items={items} loading={loading} />
        </section>

        <section className="panel">
          <Controls
            input={input}
            onInputChange={setInput}
            onPush={handlePush}
            onPop={handlePop}
            onPeek={handlePeek}
            onClear={handleClear}
            isEmpty={items.length === 0}
          />

          <div className="info">
            <h2>Como funciona</h2>
            <ul>
              <li><strong>Push</strong> — empilha no topo</li>
              <li><strong>Pop</strong> — remove o último empilhado</li>
              <li><strong>Peek</strong> — observa o topo sem remover</li>
            </ul>
            <p className="hint">Os dados persistem no PostgreSQL entre sessões.</p>
          </div>
        </section>
      </main>

      {message && <div className="toast">{message}</div>}
    </div>
  );
}
