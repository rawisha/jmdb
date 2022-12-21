import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../styles/PlayerPage.css";
import ThePlayer from "../video/ThePlayer";
import Header from "./Header";
import ResultCard from "./ResultCard";

function MoviePage() {
  const location = useLocation();
  const { movieID } = location.state;
  const [movieData, setMovieData] = useState();
  const [playUrl, setPlayUrl] = useState([]);
  const [results, setResults] = useState([]);
  const url = `${process.env.REACT_APP_apimovie}${movieID}`;

  useEffect(() => {
    async function getShit() {
      const res = await fetch(url);
      const apiInfo = await res.json();

      apiInfo.map((newInfo) => {
        const domain =
          newInfo.s1Domain ||
          newInfo.s2Domain ||
          newInfo.s3Domain ||
          newInfo.s4Domain;
        const bucket =
          newInfo.s1Bucket ||
          newInfo.s2Bucket ||
          newInfo.s3Bucket ||
          newInfo.s4Bucket;
        const video720 =
          newInfo.s1Video720 ||
          newInfo.s2Video720 ||
          newInfo.s3Video720 ||
          newInfo.s4Video720;
        const video1080 =
          newInfo.s1Video1080 ||
          newInfo.s2Video1080 ||
          newInfo.s3Video1080 ||
          newInfo.s4Video1080;
        const video_url_720 = domain + "/" + bucket + "/" + video720;
        const video_url_1080 = domain + "/" + bucket + "/" + video1080;
        const url_data = [{ src: video_url_720 }, { src: video_url_1080 }];

        const dataObject = {
          title: newInfo.title,
          url_data: url_data,
          overview: newInfo.overview,
          rating: newInfo.vote_average,
          release: newInfo.release_date,
          runtime: newInfo.runtime,
          sevenp: video_url_720,
          tenp: video_url_1080,
        };
        setMovieData(dataObject);

        setPlayUrl(video_url_720);
      });
    }
    getShit();
  }, []);

  useEffect(() => {}, [results]);
  return (
    <>
      <Header results={results} setResults={setResults} />
      <div className="Player--container">
        <div className="result-Container">
          <ResultCard results={results} />
        </div>
        <div className="player--wrapper">
          <ThePlayer urlData={playUrl} />
        </div>

        <div className="info--container">
          <div className="infoText--container">
            <div className="infoTitle--Container">
              <h1>{movieData?.title}</h1>
              <div className="season--border">
                <li onClick={() => setPlayUrl(movieData?.sevenp)}>720p</li>
                <li onClick={() => setPlayUrl(movieData?.tenp)}>1080p</li>
              </div>
            </div>
            <div className="infoDetails--container">
              <p className="rating">{movieData?.rating}</p>
              <p className="releaseTime">{movieData?.release}</p>
              <p className="runTime">{movieData?.runtime} min</p>
            </div>
            <div className="overview--container">
              <h3>{movieData?.overview}</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MoviePage;
