/** @format */

import { useSearchParams } from "react-router-dom";
import { tmdbApi } from "../api/tmdbApi";
import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";

function Search() {
  const [searchParams] = useSearchParams();
  const q = (searchParams.get("q") ?? "").trim();

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (!q) {
      setMovies([]);
      return;
    }
    tmdbApi(`/search/movie?query=${encodeURIComponent(q)}&language=ko-KR`)
      .then((data) => setMovies(data.results ?? []))
      .catch(console.error);
  }, [q]);

  //검색어 없을시
  if (!q) return <p className="p-6">검색어를 입력해주세요</p>;
  //검색결과 없을시
  if (movies.length === 0) return <p className="p-6">검색 결과가 없습니다</p>;

  return (
    <main className="p-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </main>
  );
}

export default Search;
