import React, { useState, useContext } from 'react'
import Header from './Header'
import "../styles/Favorites.css"
import { FavContext } from '../App'
import Card from './Card'
import ResultCard from './ResultCard'
import Footer from "./Footer"
import { useNavigate } from "react-router-dom";
const Favorites = () => {
    const favContext = useContext(FavContext)
    const [results, setResults] = useState([]);
    let navigate = useNavigate();

    return (
        <div>
            <Header results={results} setResults={setResults} />
            <div className='favorite-container' >
                <div className='result-Container'>
                    <ResultCard results={results} />
                </div>
                <div className='breadcrum2'>
                <button className='header-item' onClick={() => { navigate("/") }}> -> Home</button> <p> / FAVORITES</p>
        </div>
                <h1>Your Favorites</h1>
                {/*vi vill se om det finns innehåll i favorites, finns ej printa h1 */}
                {favContext.favorites.length === 0 && <h3 className='favorite-h3'>Oooops it´s empty here! Please add some movies</h3>}
                <div className='favorite-card-container'>
                    {/*om det finns innehåll i favContext mappa över */}
                    {favContext.favorites.length > 0 && favContext.favorites.map(movie => <Card key={movie._id} movieData={movie} removeOnly />)}
                </div>
            </div >
            <Footer />
        </div >
    )
}

export default Favorites;