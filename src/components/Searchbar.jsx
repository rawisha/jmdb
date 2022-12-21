import React, { useRef } from "react";
import "../styles/Searchbar.css";

function Searchbar(props) {
  //vi tar ut de props vi behöver från props
  const { query, setResults, setQuery } = props;
  const refQuery = useRef(null);

  const handleKeyDown = (e) => {
    if (e.which === 13) {
      doSearch();
    }
  };

  async function doSearch() {
    //om det ej söks, sätt tomt state
    if (!query) {
      setResults([]);
      return;
    }

    //vi sätter vår söklänk beroende på vad vi söker på (queryn)
    const url = `${process.env.REACT_APP_apiurl}${query}`;

    //fetchar vårt sök
    const res = await fetch(url);

    if (res.ok) {
      const jsonRes = await res.json();
      setResults(jsonRes);
    }
  }

  const handleSearchInput = (e) => {
    setQuery(refQuery.current.value);
  };

  return (
    <div className="searchbar-wrapper">
      <i className="fa fa-search" aria-hidden="true" onClick={doSearch}></i>

      <input
        className="searchfield"
        type="text"
        placeholder="Search Movie here..."
        ref={refQuery}
        value={query}
        onChange={handleSearchInput}
        onKeyDown={(e) => handleKeyDown(e)}
      />
    </div>
  );
}

export default Searchbar;
