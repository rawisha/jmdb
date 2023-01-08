import React, { useState, useContext } from "react";
import Header from "./Header";
import Banner from "./Banner";
import Footer from "./Footer";
import ResultCard from "./ResultCard";
import Row from "./Row";
import requests from "./requests";
import { FavContext } from "../App";
import FavoriteRow from "./FavoriteRow";
import Results2 from "./SearchResult";
import ResultCard2 from "./ResultCard2";

const Home = () => {
  const [results, setResults] = useState([]);
  const favContext = useContext(FavContext);
  return (
    <div className="app">
      <Header results={results} setResults={setResults} />
      <Banner />
      <ResultCard2 results={results} />
      <FavoriteRow title="Favorites" data={favContext} />
      <Row title="Series" fetchURL={requests.fetchSeries} />
      <Row title="Movies" fetchURL={requests.fetchMovies} />

      <Footer />
    </div>
  );
};

export default Home;
