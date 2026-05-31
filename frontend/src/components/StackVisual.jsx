export default function StackVisual({ items, loading }) {
  if (loading) {
    return <div className="stack-empty">Carregando pilha...</div>;
  }

  if (items.length === 0) {
    return (
      <div className="stack-container">
        <div className="stack-label">topo ↑</div>
        <div className="stack-frame empty">
          <div className="stack-empty">Pilha vazia</div>
        </div>
        <div className="stack-label">base ↓</div>
      </div>
    );
  }

  const reversed = [...items].reverse();

  return (
    <div className="stack-container">
      <div className="stack-label">topo ↑</div>
      <div className="stack-frame">
        {reversed.map((item, index) => (
          <div
            key={item.id}
            className={`stack-block ${index === 0 ? 'top' : ''}`}
            style={{ animationDelay: `${index * 40}ms` }}
          >
            <span className="block-value">{item.value}</span>
            {index === 0 && <span className="block-tag">TOPO</span>}
          </div>
        ))}
      </div>
      <div className="stack-label">base ↓</div>
    </div>
  );
}
