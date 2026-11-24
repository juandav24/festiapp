# FestiApp

Aplicación web desarrollada con React para administrar artistas y presentaciones de un festival musical, consumiendo una API REST simulada con JSON Server.

## Tabla de contenido

- [Descripción del proyecto](#descripción-del-proyecto)
- [Tecnologías](#tecnologías)
- [Requisitos previos](#requisitos-previos)
- [Cómo ejecutar](#cómo-ejecutar)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Modelo de datos](#modelo-de-datos)
- [Endpoints de la API](#endpoints-de-la-api)
- [Arquitectura (components/services)](#arquitectura-componentsservices)
- [Pruebas con Postman](#pruebas-con-postman)
- [Documentación](#documentación)
- [Autores](#autores)

## Descripción del proyecto

FestiApp es una aplicación React enfocada en la gestión de artistas y presentaciones de un festival musical. El frontend permite registrar, listar, consultar y eliminar información, mientras que la capa de datos consume una API REST local construida con JSON Server.

La solución implementa una relación entre artistas y presentaciones para representar, de manera simple, un escenario real de programación de eventos musicales.

## Tecnologías

| Tecnología | Versión | Uso principal |
| --- | --- | --- |
| React | 18 | Construcción de la interfaz de usuario |
| Vite | 5 | Entorno de desarrollo y empaquetado |
| JSON Server | 0.17.4 | Simulación de API REST sobre `db.json` |
| `fetch` nativo | Navegador | Consumo HTTP desde servicios |

## Requisitos previos

- Node.js 18 o superior
- npm

## Cómo ejecutar

> **Importante:** la API debe iniciarse antes que la aplicación React.

1. Instalar dependencias:

   ```bash
   npm install
   ```

2. Iniciar API (JSON Server) en `http://localhost:3001`:

   ```bash
   npm run api
   ```

3. En otra terminal, iniciar la aplicación React en `http://localhost:5173`:

   ```bash
   npm run dev
   ```

## Estructura del proyecto

```text
festiapp/
├── docs/                                  # Informe final y evidencias gráficas
│   ├── FestiApp_Informe_Final.pdf         # Documento técnico consolidado
│   └── evidencias/                        # Capturas de ejecución y pruebas
├── postman/
│   └── FestiApp_Postman_Collection.json   # Colección de pruebas API
├── public/                                # Recursos estáticos públicos
├── src/
│   ├── components/                        # Componentes de interfaz (formularios, listados, mensajes)
│   │   ├── ArtistaForm.jsx
│   │   ├── ArtistaList.jsx
│   │   ├── Mensaje.jsx
│   │   ├── PresentacionForm.jsx
│   │   └── PresentacionList.jsx
│   ├── services/                          # Lógica de consumo HTTP
│   │   ├── api.js
│   │   ├── artistasService.js
│   │   └── presentacionesService.js
│   ├── App.jsx                            # Estado principal y composición de vistas
│   ├── App.css                            # Estilos principales
│   └── main.jsx                           # Punto de entrada React
├── db.json                                # Base de datos simulada para JSON Server
├── index.html                             # HTML base
├── package.json                           # Scripts y dependencias
└── vite.config.js                         # Configuración de Vite
```

## Modelo de datos

### Recurso: `artistas`

| Campo | Tipo | Descripción |
| --- | --- | --- |
| `id` | number | Identificador único del artista |
| `nombre` | string | Nombre del artista o banda |
| `genero` | string | Género musical principal |
| `pais` | string | País de origen |

### Recurso: `presentaciones`

| Campo | Tipo | Descripción |
| --- | --- | --- |
| `id` | number | Identificador único de la presentación |
| `artistaId` | number | Referencia al artista asociado |
| `escenario` | string | Escenario asignado |
| `fecha` | string | Fecha de presentación |
| `hora` | string | Hora de presentación |

La relación entre recursos es **uno a muchos**: un artista puede tener múltiples presentaciones, y cada presentación pertenece a un único artista. Esta asociación se implementa mediante el campo `artistaId`.

## Endpoints de la API

| Método | URL | Función |
| --- | --- | --- |
| GET | `/artistas` | Lista todos los artistas |
| POST | `/artistas` | Registra un nuevo artista |
| GET | `/presentaciones` | Lista todas las presentaciones |
| GET | `/presentaciones?artistaId=X` | Consulta presentaciones filtradas por artista |
| POST | `/presentaciones` | Registra una nueva presentación |
| DELETE | `/presentaciones/:id` | Elimina una presentación por ID |

## Arquitectura (components/services)

La solución está separada en dos capas principales:

- **`components/`**: encapsula la interfaz y la interacción del usuario (formularios, listados y mensajes).
- **`services/`**: centraliza las operaciones HTTP y el acceso a recursos REST.

En `src/services/api.js`, la función `request()` abstrae la configuración base de las peticiones (`fetch`, método, cabeceras y serialización), reduciendo duplicación y facilitando el mantenimiento. Los servicios específicos (`artistasService.js` y `presentacionesService.js`) delegan en esta función para ejecutar las operaciones CRUD de cada recurso.

## Pruebas con Postman

La colección se encuentra en:

- [`postman/FestiApp_Postman_Collection.json`](postman/FestiApp_Postman_Collection.json)

### Cómo importar la colección

1. Abrir Postman.
2. Seleccionar **Import**.
3. Cargar el archivo `postman/FestiApp_Postman_Collection.json`.
4. Verificar la variable `baseUrl = http://localhost:3001`.
5. Ejecutar las peticiones en orden para reproducir el flujo completo.

### Matriz de pruebas ejecutadas

| # | Prueba | Estado esperado |
| --- | --- | --- |
| 1 | GET `/artistas` | 200 OK |
| 2 | POST `/artistas` | 201 Created |
| 3 | GET `/presentaciones` | 200 OK |
| 4 | POST `/presentaciones` | 201 Created |
| 5 | DELETE `/presentaciones/5` | 200 OK |
| 6 | GET `/presentaciones` (verificación final) | 200 OK, con IDs `2, 3, 4, 6` |

## Documentación

- Informe técnico final: [`docs/FestiApp_Informe_Final.pdf`](docs/FestiApp_Informe_Final.pdf)
- Evidencias gráficas: [`docs/evidencias/`](docs/evidencias/)

## Autores

- **Juan David López**
- **Elian Lima Bejarano**

**Asignatura:** Ingeniería Web 2 – NRC 57-73004  
**Institución:** UNIMINUTO  
**Actividad:** Actividad experiencial Unidad II (noviembre de 2026)  
**Tutor:** Zaida Patricia Ojeda Guzmán

---

**Nota de uso académico:** este repositorio y su documentación se presentan con fines formativos y académicos en el contexto de la asignatura Ingeniería Web 2.
