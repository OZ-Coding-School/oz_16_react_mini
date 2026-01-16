import { Routes, Route } from "react-router-dom";
import movieListData from "./data/movieListData.json";
import MovieCard from "./components/MovieCard.jsx";
import MovieDetail from "./pages/MovieDetail.jsx";
import Layout from "./pages/Layout.jsx";
import MainPage from "./pages/MainPage.jsx";

export default function App() {
  console.log(movieListData.results?.[0]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path="details/:id" element={<MovieDetail />} />
      </Route>
    </Routes>
  );
}
