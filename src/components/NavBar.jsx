/** @format */
import { Link } from "react-router-dom";
import Container from "./Container";
import SearchBar from "./SearchBar";

export default function NavBar() {
  return (
    <nav className="h-20 border-b border-white/20">
      <Container className="relative h-full flex items-center">
        <Link to="/" className="text-xl font-bold">
          MOVIE
        </Link>
        <div className="flex-1 flex justify-center">
          <SearchBar />
        </div>
        <div className="ml-auto flex items-center gap-6 font-medium">
          <Link to="login">로그인</Link>
          <Link to="join">회원가입</Link>
        </div>
      </Container>
    </nav>
  );
}
