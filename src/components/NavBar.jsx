import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <div style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>
      <Link to="/">Home</Link>
    </div>
  );
}
