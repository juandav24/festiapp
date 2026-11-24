import { useEffect, useState } from "react";
import { getArtistas, createArtista } from "./services/artistasService";
import {
  getPresentaciones,
  getPresentacionesByArtista,
  createPresentacion,
  deletePresentacion,
} from "./services/presentacionesService";
import ArtistaList from "./components/ArtistaList";
import ArtistaForm from "./components/ArtistaForm";
import PresentacionList from "./components/PresentacionList";
import PresentacionForm from "./components/PresentacionForm";
import Mensaje from "./components/Mensaje";

export default function App() {
  const [artistas, setArtistas] = useState([]);
  const [presentaciones, setPresentaciones] = useState([]);
  const [artistaFiltro, setArtistaFiltro] = useState(null); // artista seleccionado para consulta
  const [cargando, setCargando] = useState(true);
  const [mensaje, setMensaje] = useState(null);

  const mostrarMensaje = (tipo, texto) => {
    setMensaje({ tipo, texto });
    setTimeout(() => setMensaje(null), 4000);
  };

  // Carga inicial de ambos recursos
  const cargarDatos = async () => {
    try {
      setCargando(true);
      const [arts, pres] = await Promise.all([getArtistas(), getPresentaciones()]);
      setArtistas(arts);
      setPresentaciones(pres);
    } catch (error) {
      mostrarMensaje(
        "error",
        `No se pudo conectar con la API. ¿Está corriendo "npm run api"? (${error.message})`
      );
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  // Artistas: registrar
  const handleCrearArtista = async (nuevo) => {
    try {
      const creado = await createArtista(nuevo);
      setArtistas([...artistas, creado]);
      mostrarMensaje("exito", `Artista "${creado.nombre}" registrado correctamente.`);
      return true;
    } catch (error) {
      mostrarMensaje("error", `No se pudo registrar el artista: ${error.message}`);
      return false;
    }
  };

  // Presentaciones: registrar
  const handleCrearPresentacion = async (nueva) => {
    try {
      const creada = await createPresentacion(nueva);
      // Si hay un filtro activo, solo se agrega a la vista si coincide con ese artista
      if (!artistaFiltro || artistaFiltro.id === creada.artistaId) {
        setPresentaciones([...presentaciones, creada]);
      }
      mostrarMensaje("exito", "Presentación registrada correctamente.");
      return true;
    } catch (error) {
      mostrarMensaje("error", `No se pudo registrar la presentación: ${error.message}`);
      return false;
    }
  };

  // Presentaciones: eliminar
  const handleEliminarPresentacion = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar esta presentación?")) return;
    try {
      await deletePresentacion(id);
      setPresentaciones(presentaciones.filter((p) => p.id !== id));
      mostrarMensaje("exito", "Presentación eliminada correctamente.");
    } catch (error) {
      mostrarMensaje("error", `No se pudo eliminar la presentación: ${error.message}`);
    }
  };

  // Consultar presentaciones asociadas a un artista
  const handleVerPresentaciones = async (artista) => {
    try {
      const data = await getPresentacionesByArtista(artista.id);
      setPresentaciones(data);
      setArtistaFiltro(artista);
    } catch (error) {
      mostrarMensaje("error", `No se pudieron consultar las presentaciones: ${error.message}`);
    }
  };

  const handleVerTodas = async () => {
    try {
      setPresentaciones(await getPresentaciones());
      setArtistaFiltro(null);
    } catch (error) {
      mostrarMensaje("error", `No se pudieron consultar las presentaciones: ${error.message}`);
    }
  };

  return (
    <div className="app">
      <header>
        <h1>🎶 FestiApp</h1>
        <p>Administración de artistas y presentaciones del festival</p>
      </header>

      <Mensaje mensaje={mensaje} />

      {cargando ? (
        <p className="vacio">Cargando datos...</p>
      ) : (
        <main>
          <section className="panel">
            <h2>Artistas</h2>
            <ArtistaList
              artistas={artistas}
              onVerPresentaciones={handleVerPresentaciones}
              seleccionadoId={artistaFiltro?.id}
            />
            <h3>Registrar artista</h3>
            <ArtistaForm onCrear={handleCrearArtista} />
          </section>

          <section className="panel">
            <h2>
              Presentaciones
              {artistaFiltro && ` de ${artistaFiltro.nombre}`}
            </h2>
            {artistaFiltro && (
              <button className="btn-secundario" onClick={handleVerTodas}>
                Ver todas las presentaciones
              </button>
            )}
            <PresentacionList
              presentaciones={presentaciones}
              artistas={artistas}
              onEliminar={handleEliminarPresentacion}
            />
            <h3>Registrar presentación</h3>
            <PresentacionForm artistas={artistas} onCrear={handleCrearPresentacion} />
          </section>
        </main>
      )}
    </div>
  );
}
