import React, { useEffect, useRef } from "react";
import "../styles/Searchbar.css";
const cors = require('cors')



function Searchbar(props) {
  //vi tar ut de props vi behöver från props
  const { query, setResults, setQuery } = props;
  const refQuery = useRef(null)
  

  const handleKeyDown = (e) => {
    if(e.which === 13) {
      doSearch()
    }
  }

 


  async function doSearch() {cors()
    
    //om det ej söks, sätt tomt state
    if (!query) {
      setResults([]);
      return;
    }

    //vi sätter vår söklänk beroende på vad vi söker på (queryn)
    const url = `https://wonulla.to/api/search?search=${query}`;
  
    //fetchar vårt sök
    const res = await fetch(url, {
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNzBkZTdhNjU1MzlkMTlhZDIyMTFmNCIsImlhdCI6MTY2OTk1NTc3MywiZXhwIjoxNjcyNTQ3NzczfQ.Sb33AtcYjYZwKozkwQe-vVlENhjcHuQFyy-CU0lU3WI',
        'Accept': 'application/json, text/plain, */',
        'Host': 'wonulla.to',
        'Referer': 'https://wonulla.to/',
        'Sec-Fetch-Site': 'same-origin'
      }
    });
    
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
