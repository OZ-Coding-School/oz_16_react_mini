/** @format */
// import movie from "../data/movieDetailData.json";
import { useParams } from "react-router-dom";
import { IMG_BASE_URL } from "../constants/tmdb";
import { useEffect, useState } from "react";
import { tmdbApi } from "../api/tmdbApi";

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    tmdbApi(`/movie/${id}?language=ko-KR`)
      .then((data) => setMovie(data))
      .catch(console.error);
  }, [id]);

  if (!movie) return <div>로딩중...</div>;

  const posterSrc = movie.poster_path ? `${IMG_BASE_URL}${movie.poster_path}` : "";

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* 좌측 이미지 */}
      <img
        className="
        w-full max-w-[420px] 
        md:w-72 lg:w-80 xl:w-96
        shrink-0
        rounded-lg
        object-cover"
        src={posterSrc}
        alt={movie.title}
      />
      {/* 우측 정보 */}
      <div className="space-y-3 w-100">
        <h2>
          <p className="text-4xl font-semibold text-white">{movie.title}</p>{" "}
          <p className="text-2xl text-end"> 평점 : {Number(movie.vote_average).toFixed(1)}</p>
        </h2>
        <ul className="flex flex-wrap gap-2">
          {(movie.genres ?? []).map((g) => (
            <li key={g.id} className="rounded-md bg-slate-600/60 px-2 py-1 text-base">
              {g.name}
            </li>
          ))}
        </ul>
        <div>
          <p className="text-2xl mt-10 mb-2 font-semibold">줄거리</p>
          <p>{movie.overview}</p>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
