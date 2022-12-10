import React, { useEffect,useRef } from "react";
import "../styles/Searchbar.css";

function Searchbar(props) {
  //vi tar ut de props vi behöver från props
  const { query, setResults, setQuery } = props;
  const refQuery = useRef(null)
  
 
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
      setResults(jsonRes);
    } 
  }
 
  const handleSearchInput = e => {
    setQuery(refQuery.current.value);
  };
  
  useEffect(() => {
    
    console.log(query)
  },[query])

  return (
    <div className="searchbar-wrapper">
      <i className="fa fa-search" aria-hidden="true" onClick={doSearch}></i>
      <form>
      <input
        className="searchfield"
        type="text"
        placeholder="Search Movie here..."
        ref = {refQuery}
        value={query}
        onChange={handleSearchInput}
      />
      </form>
    </div>
    
  );
}

export default Searchbar;
