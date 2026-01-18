import { useState } from "react";
import movieDetailData from "./data/movieDetailData.json";

const BASE_URL = "https://image.tmdb.org/t/p/w500";

export default function MovieDetail() {
  const [movie] = useState(movieDetailData);

  return (
    <div style={{ padding: "20px" }}>
      <h2>{movie.title}</h2>

      <img
        src={`${BASE_URL}${movie.poster_path}`}
        alt={movie.title}
        width={200}
      />

      <p>⭐ {Number(movie.vote_average).toFixed(1)}</p>

      <div>
        {movie.genres.map((g) => (
          <span key={g.id}>{g.name} </span>
        ))}
      </div>

      <p>{movie.overview}</p>
    </div>
  );
}
