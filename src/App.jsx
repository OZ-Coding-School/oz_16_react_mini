// import { useState } from "react";
import { Routes, Route } from "react-router-dom";

// page components
import Layout from "@/components/Layout";
import MovieList from "@/pages/MovieList";
import MovieDetail from "@/pages/MovieDetail";
import movieDetailData from "@/data/movieDetailData.json";
import SearchPage from "@/pages/SearchPage";


// css components
import "./App.css";


function App() {

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<MovieList />} />
        <Route
          path="/details/:id"
          element={<MovieDetail movie={movieDetailData} />}
        />
        <Route path="/search" element={<SearchPage />} />
      </Route>
    </Routes>
  );
}

export default App;
