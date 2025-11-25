function PlayerRow({ player, index, onClick, darkMode, rowColors, isFavorite, onToggleFavorite }) {
  const isPar = index % 2 === 0;

  const getRowClass = () => {
    if (rowColors === "pares" && isPar) return "row-par";
    if (rowColors === "impares" && !isPar) return "row-impar";
    return "";
  };

  return (
    <tr
      className={getRowClass()}
      onClick={() => onClick(player)}
      style={{ cursor: "pointer" }}
    >
      <td>{player.id}</td>
      <td>{player.name}</td>
      <td>{player.position}</td>
      <td>{player.age}</td>
      <td onClick={(e) => { e.stopPropagation(); onToggleFavorite(player.id); }}>
        {isFavorite ? "⭐" : "☆"}
      </td>
    </tr>
  );
}

export default PlayerRow;
