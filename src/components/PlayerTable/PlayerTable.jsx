import PlayerRow from "./PlayerRow";

export default function PlayerTable({
  players,
  onRowClick,
  onSort,
  sortConfig,
  darkMode,
  rowColors,
  favorites,
  onToggleFavorite
}) {
  const getArrow = (column) => {
    if (sortConfig.key !== column) return "";
    if (sortConfig.direction === "asc") return " ↑";
    if (sortConfig.direction === "desc") return " ↓";
    return "";
  };

  return (
    <table className={`player-table ${darkMode ? "dark" : ""}`}>
      <thead>
        <tr>
          <th onClick={() => onSort("number")}># {getArrow("number")}</th>
          <th onClick={() => onSort("name")}>Nombre {getArrow("name")}</th>
          <th onClick={() => onSort("position")}>Posición {getArrow("position")}</th>
          <th onClick={() => onSort("age")}>Edad {getArrow("age")}</th>
          <th>Fav</th>
        </tr>
      </thead>

      <tbody>
        {players.map((player, index) => (
          <PlayerRow
            key={player.id}
            player={player}
            index={index}
            onClick={() => onRowClick(player)}
            isFavorite={favorites.includes(player.id)}
            onToggleFavorite={() => onToggleFavorite(player.id)}
            rowColors={rowColors}
          />
        ))}
      </tbody>
    </table>
  );
}
