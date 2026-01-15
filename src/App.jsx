import movieListData from "./data/movieListData.json";
import MovieCard from "./components/MovieCard";

export default function App() {
  return (
    <div style={styles.page}>
      <h1 style={styles.title}>OZ무비</h1>

      <div style={styles.grid}>
        {movieListData.results.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

const styles = {
  page: { padding: 20 },
  title: { margin: "0 0 16px" },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
    gap: 16,
  },
};
