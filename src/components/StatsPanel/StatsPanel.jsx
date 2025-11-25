export default function StatsPanel({ stats }) {
  return (
    <div className="stats-panel">
      <h3>Estadísticas</h3>

      <p>Total jugadores: {stats.total}</p>
      <p>Promedio edad: {stats.avgAge.toFixed(1)}</p>
      <p>Mayor goleador: {stats.topScorer.name}</p>

      <h4>Distribución por posición</h4>
      {Object.entries(stats.positions).map(([pos, count]) => (
        <div key={pos}>
          {pos}: {count}
        </div>
      ))}
    </div>
  );
}
