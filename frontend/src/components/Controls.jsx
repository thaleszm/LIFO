export default function Controls({
  input,
  onInputChange,
  onPush,
  onPop,
  onPeek,
  onClear,
  isEmpty,
}) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') onPush();
  };

  return (
    <div className="controls">
      <h2>Operações</h2>

      <div className="input-row">
        <input
          type="text"
          placeholder="Valor para empilhar..."
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
          maxLength={50}
        />
        <button className="btn primary" onClick={onPush} disabled={!input.trim()}>
          Push
        </button>
      </div>

      <div className="btn-row">
        <button className="btn" onClick={onPop} disabled={isEmpty}>
          Pop
        </button>
        <button className="btn" onClick={onPeek} disabled={isEmpty}>
          Peek
        </button>
        <button className="btn danger" onClick={onClear} disabled={isEmpty}>
          Limpar
        </button>
      </div>
    </div>
  );
}
