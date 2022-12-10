import React, { useEffect } from "react";
import "../styles/Searchbar.css";

function Searchbar(props) {
  //vi tar ut de props vi behöver från props
  const { query, setResults, setQuery } = props;

  //useEffect körs automatiskt en gång
  useEffect(() => {
    
    async function doSearch() {
      //om det ej söks, sätt tomt state
      if (!query) {
        setResults([]);
        return;
      }

      //vi sätter vår söklänk beroende på vad vi söker på (queryn)
      const url = `https://wonulla.to/api/search?search=${query}`;
    
      //fetchar vårt sök
      const res = await fetch(url);
      if (res.ok) {
        const jsonRes = await res.json();
        setResults(jsonRes.results);
      } 
    }
    //kallar på sökfunktionen
    doSearch();
    //kör varje gång vårt query ändras
  }, [query]);

  //e.target.value = bokstäverna vi skriver när vi söker
  const handleSearchInput = e => {
    setQuery(e.target.value);
  };

  return (
    <div className="searchbar-wrapper">
      <i className="fa fa-search" aria-hidden="true"></i>
      <input
        className="searchfield"
        type="text"
        placeholder="Search Movie here..."
        value={query}
        onChange={e => handleSearchInput(e)}
      />
      {/*varje gång vi skriver nåt (onChange) startar funktionen som hanterar input */}
    </div>
  );
}

export default Searchbar;
