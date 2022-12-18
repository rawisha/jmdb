import React, { useEffect, useRef } from "react";
import "../styles/Searchbar.css";


function Searchbar(props) {
  //vi tar ut de props vi behöver från props
  const { query, setResults, setQuery } = props;
  const refQuery = useRef(null)
  

  const handleKeyDown = (e) => {
    if(e.which === 13) {
      doSearch()
    }
  }


  useEffect(()=> {
    fetch('https://wonulla.to/api/search?search=weird', {
      headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
        'Host': 'wonulla.to'
      }
    })
    .then(response => response.json())
    .then(data => console.log(data))
  },[])

  async function doSearch() {
    
    //om det ej söks, sätt tomt state
    if (!query) {
      setResults([]);
      return;
    }

    //vi sätter vår söklänk beroende på vad vi söker på (queryn)
    const url = `api/search?search=${query}`;
  
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
  


  return (
    <div className="searchbar-wrapper">
      <i className="fa fa-search" aria-hidden="true" onClick={doSearch}></i>
      
      <input
        className="searchfield"
        type="text"
        placeholder="Search Movie here..."
        ref = {refQuery}
        value={query}
        onChange={handleSearchInput}
        onKeyDown={(e) => handleKeyDown(e)}
      />
      
    </div>
    
  );
}

export default Searchbar;
