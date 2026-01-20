export default function NavButton({ text, onClick, variant = "default" }) {
  return (
    <button
      className={`nav-button ${variant}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
