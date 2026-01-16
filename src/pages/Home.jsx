/** @format */

import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { tmdbApi } from "../api/tmdbApi";

function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // 한국어 추출도 제공
    tmdbApi("/movie/popular?language=ko-KR&page=1").then((data) => {
      setMovies((data.results ?? []).filter((m) => !m.adult));
    });
  }, []);

  return (
    <main className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </main>
  );
}

export default Home;
