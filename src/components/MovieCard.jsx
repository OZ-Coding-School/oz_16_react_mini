/** @format */
import { Link } from "react-router-dom";
import { IMG_BASE_URL } from "../constants/tmdb";

function MovieCard({ movie }) {
  const posterSrc = movie?.poster_path ? `${IMG_BASE_URL}${movie.poster_path}` : null;

  return (
    // 호버, group 테일윈드기능인데 신기하네
    <article className="group relative overflow-hidden rounded-xl bg-white/5 border border-white/10">
      <Link to={`/details/${movie.id}`} aria-label={`${movie.title} 상세 보기`} className="block">
        <div className="aspect-[2/3] w-full overflow-hidden bg-white/5">
          {posterSrc ? (
            <img
              src={posterSrc}
              alt={`${movie.title} 포스터`}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="h-full w-full grid  text-sm text-white/60" role="img" aria-label="포스터 없음">
              이미지 없음
            </div>
          )}
        </div>
        <div className="p-3 space-y-1">
          <h3 className="text-lg text-center font-semibold line-clamp-1">{movie.title}</h3>
        </div>

        {/* 호버 영역 */}
        <div className="pointer-events-none absolute inset-0 flex flex-col  bg-black/70 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <div className="p-3">
            <p className="text-base text-white/90 line-clamp-5">
              {movie.overview || "줄거리 정보가 없습니다."}
            </p>
          </div>
          <div className="mt-auto pb-12">
            <p className="text-center text-lg text-white">
              관람평 : <span className="text-yellow-200"> {Number(movie.vote_average).toFixed(1)}</span>
            </p>
          </div>
        </div>
      </Link>
    </article>
  );
}

export default MovieCard;
