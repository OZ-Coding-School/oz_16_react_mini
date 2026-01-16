import movieListData from "../data/movieListData.json";
import MovieCard from "../components/MovieCard.jsx";

export default function MainPage() {
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
