export default function ArtistaList({ artistas, onVerPresentaciones, seleccionadoId }) {
  if (artistas.length === 0) {
    return <p className="vacio">No hay artistas registrados.</p>;
  }

  return (
    <ul className="lista">
      {artistas.map((a) => (
        <li
          key={a.id}
          className={`tarjeta ${seleccionadoId === a.id ? "activa" : ""}`}
        >
          <div>
            <strong>{a.nombre}</strong>
            <span>
              {a.genero} · {a.pais}
            </span>
          </div>
          <button className="btn-secundario" onClick={() => onVerPresentaciones(a)}>
            Ver presentaciones
          </button>
        </li>
      ))}
    </ul>
  );
}
