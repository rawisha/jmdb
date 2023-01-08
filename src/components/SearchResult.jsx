import React, { useRef, useEffect } from "react";
import "../styles/SearchResult.css";
import Card from "./Card";

const SearchResult = ({ movieData }) => {
  const resultElement = useRef();
  //** SCROLLEN **
  const ref = useRef(null);
  const scroll = (scrollOffset) => {
    ref.current.scrollLeft += scrollOffset;
  };

  const handleSmoothScroll = () => {
    if (!resultElement.current) return;
    resultElement.current.scrollIntoView({
      block: "center",
      behavior: "smooth",
    });
  };

  useEffect(() => {
    handleSmoothScroll();
  }, [movieData]);
  return (
    <div>
      <div className="searchResult-Container">
        <h1 ref={resultElement}>Search Results</h1>
        {/*vi vill se om det finns innehåll i favorites, finns ej printa h1 */}
        {movieData?.length === 0 && <div className="none"></div>}
        <div className="favorite-card-container">
          {/*om det finns innehåll i favContext mappa över */}
          {movieData?.length > 0 &&
            movieData?.map((movie) => (
              <Card key={movie._id} movieData={movie} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
