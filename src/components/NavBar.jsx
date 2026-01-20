import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav
      style={{
        padding: "16px 40px",
        borderBottom: "1px solid #333",
        marginBottom: "20px",
      }}
    >
      <Link
        to="/"
        style={{ color: "#fff", textDecoration: "none", fontSize: "18px" }}
      >
        🎬 OZ 무비
      </Link>
    </nav>
  );
}

export default NavBar;
