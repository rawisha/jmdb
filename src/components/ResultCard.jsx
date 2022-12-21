import React, { useEffect, useRef } from "react";
import Card from "./Card";

function ResultCard(props) {
  const resultElement = useRef();
  const { results } = props;
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

  //kör vår scroll för att få vårt sökresultat högt upp varje gång vårt resultat ändras
  useEffect(() => {
    handleSmoothScroll();
  }, [results]);

  //**SÖKRESULTATET */
  //om vi inte söker nåt, dölj sökresultatet
  if (results.length === 0) {
    return <div className="none"></div>;
  } else {
    //annars visa sökresultat
    return (
      <div className="row">
        <button className="btn__left" onClick={() => scroll(-270)}>
          <i className="fa fa-angle-left"></i>
        </button>
        <h2 ref={resultElement}>Search Results</h2>
        <div className="card-container" ref={ref} id="resultCard">
          {results.map((movie) => (
            <Card key={movie._id} movieData={movie} />
          ))}
        </div>
        <button className="btn__right " onClick={() => scroll(270)}>
          <i className="fa fa-angle-right"></i>
        </button>
      </div>
    );
  }
}

export default ResultCard;
