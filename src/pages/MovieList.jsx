import { useEffect, useState } from "react";
// import movieListData from "@/data/movieListData.json";
import MovieCard from "@/components/MovieCard";
import TopRated from "@/components/TopRated";
import { getPopularMovies } from "@/api/tmdb";
import "@/App.css";


function MovieList() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const movies = await getPopularMovies();

        const filteredMovies = (movies.results ?? []).filter(
          (movie) => movie.adult === false
        );

        setMovies(filteredMovies);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchMovies();
  }, []);



  if (error) {
    return <div className="error">Error: {error}</div>;
  }
  

  return (
    <div className="page">
      <TopRated movies={movies} />
      <h2 className="section-title">인기 상영작</h2>
      <div className="grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default MovieList;
