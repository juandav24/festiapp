export default function Mensaje({ mensaje }) {
  if (!mensaje) return null;
  return <div className={`mensaje ${mensaje.tipo}`}>{mensaje.texto}</div>;
}
