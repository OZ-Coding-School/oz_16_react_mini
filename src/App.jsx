import { Routes, Route } from "react-router-dom";
import movieListData from "./data/movieListData.json";
import MovieCard from "./components/MovieCard.jsx";
import MovieDetail from "./pages/MovieDetail.jsx";
import Layout from "./pages/Layout.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path="/details/:id" element={<MovieDetail />} />
      </Route>
    </Routes>
  );
}

function MainPage() {
  return (
    <div>
      <h1>OZ무비</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: 16,
        }}
      >
        {movieListData.results.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
