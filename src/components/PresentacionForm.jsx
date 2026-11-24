import { useState } from "react";

const inicial = { artistaId: "", escenario: "", fecha: "", hora: "" };

export default function PresentacionForm({ artistas, onCrear }) {
  const [form, setForm] = useState(inicial);
  const [errores, setErrores] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validar = () => {
    const nuevos = {};
    if (!form.artistaId) nuevos.artistaId = "Selecciona un artista";
    if (!form.escenario.trim()) nuevos.escenario = "El escenario es obligatorio";
    if (!form.fecha) nuevos.fecha = "La fecha es obligatoria";
    if (!form.hora) nuevos.hora = "La hora es obligatoria";
    return nuevos;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nuevos = validar();
    setErrores(nuevos);
    if (Object.keys(nuevos).length > 0) return;

    const ok = await onCrear({
      artistaId: Number(form.artistaId),
      escenario: form.escenario.trim(),
      fecha: form.fecha,
      hora: form.hora,
    });
    if (ok) setForm(inicial);
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <label>
        Artista
        {/* Selector alimentado con los artistas obtenidos de la API */}
        <select name="artistaId" value={form.artistaId} onChange={handleChange}>
          <option value="">-- Selecciona un artista --</option>
          {artistas.map((a) => (
            <option key={a.id} value={a.id}>
              {a.nombre}
            </option>
          ))}
        </select>
        {errores.artistaId && <small className="error">{errores.artistaId}</small>}
      </label>
      <label>
        Escenario
        <input name="escenario" value={form.escenario} onChange={handleChange} />
        {errores.escenario && <small className="error">{errores.escenario}</small>}
      </label>
      <label>
        Fecha
        <input type="date" name="fecha" value={form.fecha} onChange={handleChange} />
        {errores.fecha && <small className="error">{errores.fecha}</small>}
      </label>
      <label>
        Hora
        <input type="time" name="hora" value={form.hora} onChange={handleChange} />
        {errores.hora && <small className="error">{errores.hora}</small>}
      </label>
      <button type="submit">Registrar presentación</button>
    </form>
  );
}
