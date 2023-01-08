import React, { useEffect, useRef } from "react";
import Card from "./Card";
import SearchResult from "./SearchResult";
import Results2 from "./SearchResult";

function ResultCard2(props) {
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
        <div className="card-container" ref={ref} id="searchResult">
          <SearchResult movieData={results} />
        </div>
      </div>
    );
  }
}

export default ResultCard2;
