import "@/pages/MovieDetail.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetail } from "@/api/tmdb";

const IMG_BASE = "https://image.tmdb.org/t/p/w780";

function MovieDetail() {
  
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const data = await getMovieDetail(id);
        setMovie(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchMovieDetail();
  }, [id]);

  // error handling
  if (error) return <div>{error}</div>;
  if (!movie) return <div>Loading...</div>;

  const bg = movie.backdrop_path
    ? `${IMG_BASE}${movie.backdrop_path}`
    : movie.poster_path
    ? `${IMG_BASE}${movie.poster_path}`
    : null;

  const poster = movie.poster_path ? `${IMG_BASE}${movie.poster_path}` : null;

  return (
    <div className="detail">
      {/* 상단 배경 */}
      <div
        className="detail-hero"
        style={{
          backgroundImage: bg ? `url(${bg})` : "none",
        }}
      >
        <div className="detail-overlay">
          {/* 왼쪽: 포스터 */}
          <div className="detail-poster">
            {poster ? (
              <img src={poster} alt={movie.title} />
            ) : (
              <div className="poster-fallback">No Image</div>
            )}
          </div>

          {/* 오른쪽: 정보 */}
          <div className="detail-info">
            <h1 className="detail-title">{movie.title}</h1>
            <p className="detail-rating">⭐ {movie.vote_average.toFixed(1)}</p>

            <div className="detail-genres">
              {movie.genres?.map((g) => (
                <span key={g.id} className="genre-chip">
                  {g.name}
                </span>
              ))}
            </div>

            <p className="detail-overview">{movie.overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
