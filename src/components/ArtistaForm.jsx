import { useState } from "react";

const inicial = { nombre: "", genero: "", pais: "" };

export default function ArtistaForm({ onCrear }) {
  const [form, setForm] = useState(inicial);
  const [errores, setErrores] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validar = () => {
    const nuevos = {};
    if (!form.nombre.trim()) nuevos.nombre = "El nombre es obligatorio";
    if (!form.genero.trim()) nuevos.genero = "El género es obligatorio";
    if (!form.pais.trim()) nuevos.pais = "El país es obligatorio";
    return nuevos;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nuevos = validar();
    setErrores(nuevos);
    if (Object.keys(nuevos).length > 0) return;

    const ok = await onCrear({
      nombre: form.nombre.trim(),
      genero: form.genero.trim(),
      pais: form.pais.trim(),
    });
    if (ok) setForm(inicial);
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <label>
        Nombre
        <input name="nombre" value={form.nombre} onChange={handleChange} />
        {errores.nombre && <small className="error">{errores.nombre}</small>}
      </label>
      <label>
        Género musical
        <input name="genero" value={form.genero} onChange={handleChange} />
        {errores.genero && <small className="error">{errores.genero}</small>}
      </label>
      <label>
        País
        <input name="pais" value={form.pais} onChange={handleChange} />
        {errores.pais && <small className="error">{errores.pais}</small>}
      </label>
      <button type="submit">Registrar artista</button>
    </form>
  );
}
