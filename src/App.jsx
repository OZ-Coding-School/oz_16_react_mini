import { useState } from "react";
import { useNavigate } from "react-router-dom";
import movieListData from "./data/movieListData.json";
import MovieCard from "./components/MovieCard";
import "./App.css";

function App() {
  const [movies] = useState(movieListData.results);
  const navigate = useNavigate();

  return (
    <div className="wrap">
      <h1 className="title">OZ 무비</h1>

      <div className="grid">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            posterPath={movie.poster_path}
            title={movie.title}
            voteAverage={movie.vote_average}
            onClick={() => navigate("/details")}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
