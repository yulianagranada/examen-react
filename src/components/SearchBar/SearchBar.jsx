export default function SearchBar({ value, onChange, onClear, resultsCount }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        value={value}
        className="search-bar__input"
        placeholder="Buscar jugador..."
        onChange={(e) => onChange(e.target.value)}
      />
      
      {value && (
        <button className="search-bar__clear" onClick={onClear}>
          X
        </button>
      )}

      <span className="search-bar__count">
        Mostrando {resultsCount} resultados
      </span>
    </div>
  );
}
