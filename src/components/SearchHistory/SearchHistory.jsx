export default function SearchHistory({ history, onSelectSearch, onClearHistory }) {
  return (
    <div className="search-history">
      <h4>Historial de búsquedas</h4>

      <ul>
        {history.map((item, index) => (
          <li key={index} onClick={() => onSelectSearch(item)}>
            {item}
          </li>
        ))}
      </ul>

      {history.length > 0 && (
        <button onClick={onClearHistory}>Limpiar historial</button>
      )}
    </div>
  );
}
