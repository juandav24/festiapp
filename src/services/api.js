const API_URL = "http://localhost:3001";

// Función genérica: centraliza fetch y el manejo de respuestas no exitosas
async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }

  // DELETE devuelve un objeto vacío; igual lo parseamos de forma segura
  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

export default request;
