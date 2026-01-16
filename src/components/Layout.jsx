/** @format */

import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Container from "./Container";

function Layout() {
  return (
    <>
      <NavBar />
      <Container className="pt-12">
        <Outlet />
      </Container>
    </>
  );
}

export default Layout;
