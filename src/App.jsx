import { useState } from "react";
import MovieCard from "./components/MovieCard";
import movieListData from "./data/movieListData.json";

function App() {
  // 더미데이터(movieListData) 상태관리
  const [movies, setMovies] = useState(movieListData.results);
  console.log(movies);

  return (
    <main>
      <section className="max-w-7xl mx-auto">
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-4">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              posterPath={movie.poster_path}
              title={movie.title}
              rating={movie.vote_average}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default App;
