/** @format */
import { Link } from "react-router-dom";
import Container from "./Container";

export default function NavBar() {
  return (
    <nav className="h-20 border-b border-white/20">
      <Container className="relative h-full flex items-center">
        <Link to="/" className="text-xl font-bold">
          MOVIE
        </Link>
        <Link to="search" className="absolute left-1/2 -translate-x-1/2 text-lg w-[360px] sm:w-[420px]">
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 shadow-sm focus-within:border-white/20">
            <span className="text-white/60">🔎</span>
            <input
              placeholder="영화 제목을 검색해보세요"
              className="w-full text-center bg-transparent text-sm outline-none placeholder:text-white/40"
            />
          </div>
        </Link>
        <div className="ml-auto flex items-center gap-6 font-medium">
          <Link to="login">로그인</Link>
          <Link to="join">회원가입</Link>
        </div>
      </Container>
    </nav>
  );
}
