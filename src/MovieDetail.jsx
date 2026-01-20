import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BASE_URL = "https://image.tmdb.org/t/p/w500";

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?language=ko-KR`,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
          },
        },
      );

      const data = await response.json();
      setMovie(data);
    };

    fetchMovieDetail();
  }, [id]);

  if (!movie) return <div>로딩중...</div>;

  return (
    <div className="detail-wrap">
      <div className="detail-container">
        <img
          src={`${BASE_URL}${movie.poster_path}`}
          alt={movie.title}
          className="detail-poster"
        />

        <div className="detail-info">
          <h1>{movie.title}</h1>
          <p className="detail-rate">⭐ {movie.vote_average.toFixed(1)}</p>

          <div className="detail-genres">
            {movie.genres.map((genre) => (
              <span key={genre.id}>{genre.name}</span>
            ))}
          </div>

          <p className="detail-overview">{movie.overview}</p>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
