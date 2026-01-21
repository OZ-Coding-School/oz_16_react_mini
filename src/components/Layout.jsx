/** @format */

import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Container from "./Container";

function Layout() {
  return (
    <>
      <NavBar />
      <main>
        <Container className="pt-12">
          <Outlet />
        </Container>
      </main>
    </>
  );
}

export default Layout;
