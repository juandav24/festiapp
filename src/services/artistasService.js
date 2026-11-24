import request from "./api";

// GET /artistas
export const getArtistas = () => request("/artistas");

// POST /artistas
export const createArtista = (artista) =>
  request("/artistas", {
    method: "POST",
    body: JSON.stringify(artista),
  });
