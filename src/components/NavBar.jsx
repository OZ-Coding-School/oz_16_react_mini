import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <header style={styles.header}>
      <div style={styles.inner}>
        <Link to="/" style={styles.logo}>
          OZ무비
        </Link>

        <nav style={styles.nav}>
          <Link to="/" style={styles.link}>
            홈
          </Link>
          <Link to="/details" style={styles.link}>
            상세
          </Link>
        </nav>
      </div>
    </header>
  );
}

const styles = {
  header: {
    position: "sticky",
    top: 0,
    zIndex: 10,
    background: "#111",
    color: "white",
    borderBottom: "1px solid #222",
  },
  inner: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "14px 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    color: "white",
    textDecoration: "none",
    fontWeight: 800,
    fontSize: 18,
  },
  nav: { display: "flex", gap: 14 },
  link: { color: "white", textDecoration: "none", opacity: 0.9 },
};
