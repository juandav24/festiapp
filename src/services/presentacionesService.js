import request from "./api";

// GET /presentaciones
export const getPresentaciones = () => request("/presentaciones");

// GET /presentaciones?artistaId=X  (presentaciones de un artista)
export const getPresentacionesByArtista = (artistaId) =>
  request(`/presentaciones?artistaId=${artistaId}`);

// POST /presentaciones
export const createPresentacion = (presentacion) =>
  request("/presentaciones", {
    method: "POST",
    body: JSON.stringify(presentacion),
  });

// DELETE /presentaciones/:id
export const deletePresentacion = (id) =>
  request(`/presentaciones/${id}`, { method: "DELETE" });
