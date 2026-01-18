const BASE_URL = "https://image.tmdb.org/t/p/w500";

export default function MovieCard({ posterPath, title, voteAverage, onClick }) {
  return (
    <div className="card" onClick={onClick}>
      <img className="poster" src={`${BASE_URL}${posterPath}`} alt={title} />
      <div className="card-info">
        <div className="card-title">{title}</div>
        <div className="card-rate">⭐ {Number(voteAverage).toFixed(1)}</div>
      </div>
    </div>
  );
}
