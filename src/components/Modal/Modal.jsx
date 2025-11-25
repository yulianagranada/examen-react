export default function Modal({ isOpen, onClose, player }) {
  if (!isOpen || !player) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>X</button>

        <h2>{player.name}</h2>
        <p>Posición: {player.position}</p>
        <p>Edad: {player.age}</p>
        <p>Número: {player.number}</p>
      </div>
    </div>
  );
}
