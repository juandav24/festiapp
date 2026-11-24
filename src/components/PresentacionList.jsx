export default function PresentacionList({ presentaciones, artistas, onEliminar }) {
  if (presentaciones.length === 0) {
    return <p className="vacio">No hay presentaciones para mostrar.</p>;
  }

  // Relación artistaId -> nombre del artista
  const nombreArtista = (id) => {
    const artista = artistas.find((a) => a.id === id);
    return artista ? artista.nombre : `Artista #${id}`;
  };

  return (
    <ul className="lista">
      {presentaciones.map((p) => (
        <li key={p.id} className="tarjeta">
          <div>
            <strong>{nombreArtista(p.artistaId)}</strong>
            <span>
              {p.escenario} · {p.fecha} · {p.hora}
            </span>
          </div>
          <button className="btn-peligro" onClick={() => onEliminar(p.id)}>
            Eliminar
          </button>
        </li>
      ))}
    </ul>
  );
}
