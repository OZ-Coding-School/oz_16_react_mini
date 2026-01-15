import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar.jsx";

export default function Layout() {
  return (
    <div>
      <NavBar />
      <main style={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}

const styles = {
  main: {
    maxWidth: 1200,
    margin: "0 auto",
  },
};
