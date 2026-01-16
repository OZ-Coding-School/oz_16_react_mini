import { Routes, Route, useNavigate } from "react-router-dom";

import MovieDetail from "./MovieDetail.jsx";
import movieListData from "./movieListData.json";
import "./App.css";
import Layout from "./component/LayOut.jsx";
import MovieCard from "./MovieCard.jsx";

function MovieList() {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate("/details");
  };

  return (
    <div className="movie-list">
      {movieListData.results.map((movie) => (
        <MovieCard key={movie.id} movie={movie} onClick={handleCardClick} />
      ))}
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<MovieList />} />
        <Route path="/details" element={<MovieDetail />} />
      </Route>
    </Routes>
  );
}
