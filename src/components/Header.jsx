import React, { useState } from 'react'
import "../styles/Header.css"
import Searchbar from './Searchbar'
import { useNavigate } from "react-router-dom";

const Header = (props) => {
  const [query, setQuery] = useState("");
  let navigate = useNavigate();
  

  return (
    <div className='header'>
      <h1 onClick={() => { navigate("/") }}>JMDB <i onClick={() => { navigate("/") }} className="fa fa-film" aria-hidden="true"></i></h1>
      <div className="header-item-container">
        <Searchbar query={query} setResults={props.setResults} setQuery={setQuery} />
        <div className="header-button-container">
          <button className='header-item' onClick={() => { navigate("/") }}>Home</button>
          <button className='header-item' onClick={() => { navigate("/favorites") }}>Favorites</button>
        </div>
      </div>
    </div>
  )
}

export default Header;