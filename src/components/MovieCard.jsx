const baseUrl = "https://image.tmdb.org/t/p/w500";

export default function MovieCard({ movie }) {
  const posterUrl = movie.poster_path ? `${baseUrl}${movie.poster_path}` : "";

  return (
    <div style={styles.card}>
      <img src={posterUrl} alt={movie.title} style={styles.poster} />
      <h3>{movie.title}</h3>
      <p>⭐ {movie.vote_average}</p>
    </div>
  );
}

const styles = {
  card: {
    width: 180,
    border: "1px solid #ddd",
    padding: 10,
  },
  poster: {
    width: "100%",
  },
};
