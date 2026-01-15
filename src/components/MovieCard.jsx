import { useNavigate } from "react-router-dom";

const baseUrl = "https://image.tmdb.org/t/p/w500";

export default function MovieCard({ movie }) {
  const navigate = useNavigate();

  const posterUrl = movie.poster_path
    ? `${baseUrl}${movie.poster_path}`
    : "https://via.placeholder.com/180x270?text=No+Image";

  return (
    <div
      onClick={() => navigate(`/details/${movie.id}`)}
      style={{ cursor: "pointer" }}
    >
      <div style={styles.card}>
        <img src={posterUrl} alt={movie.title} style={styles.poster} />
        <h3 style={styles.title}>{movie.title}</h3>
        <p style={styles.rate}>⭐ {movie.vote_average}</p>
      </div>
    </div>
  );
}

const styles = {
  card: {
    width: 180,
    border: "1px solid #ddd",
    padding: 10,
    borderRadius: 8,
    background: "#fff",
  },
  poster: {
    width: "100%",
    borderRadius: 6,
    display: "block",
  },
  title: {
    margin: "8px 0 4px",
    fontSize: 14,
  },
  rate: {
    margin: 0,
    fontSize: 13,
  },
};
