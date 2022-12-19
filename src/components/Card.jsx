import React, { useState, useContext } from 'react'
import { FavContext } from '../App'
import classNames from 'classnames'
import img from '../img/no-img.png'
import "../styles/Card.css"
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import PlayerPage from './SeriesPage'
const base_url = "https://image.tmdb.org/t/p/w200";


//** FILMKORTEN ** 
const Card = ({ movieData, removeOnly }) => {
   
    //läser in vårt globala kontext
    const favContext = useContext(FavContext)
    //vi kollar statusen på favorite globalt och tar in den
    const [favStatus, setFavStatus] = useState(favContext.isFav(movieData.id))

    
    //satt default till vår empty bild
    let imgsrc = img
    //om det finns en bild sätt istället base url + bildens länk
    if (movieData.poster) {
        imgsrc = base_url + movieData.poster
    }

    //Favoriteknappen - kallar på lägg till/ta bort beroende på vad den står på tidigare och skickar vidare filmen dit
    function handleFavClick(movie) {
        if (favStatus === false) {
            favContext.addFav(movie)
            setFavStatus(true)
        } else {
            favContext.removeFav(movie)
            setFavStatus(false)
        }
    }

    

    //hjärtat fyllt eller ej. {fa ska alltid finnas. tomt hjärta eller fyllt hjärta beroende på om favStatus är true/false}
    let heartStatusClasses = classNames({ 'fa': true, 'fa-heart-o': !favStatus, 'favorite': true, 'fa-heart': favStatus })
    //om removeOnly finns ska det istället bli - tecken istället för hjärta i favorites
    if (removeOnly) {
        heartStatusClasses = classNames({ 'fa': true, "fa-minus-circle": true, 'favorite': true });
    }

    return (
        <div >
            <div className='card 'key={movieData.id}>
            {movieData.tv_id ?  
            <div className='card-image-container'>
                <Link className='link-style' to={'/serie/' + movieData.tv_id + '-' + movieData.title.replace(' ', '-')} state={{tvID:movieData.tv_id, tvInfo:movieData}}>
                    <img src={imgsrc} alt={"Movie & Tv show poster name" + movieData?.name || movieData?.title || movieData.original_name} className='card-image' onClick={() => favContext.handleModelClick(movieData)} />
                    </Link> 
                    <i id="heart" onClick={() => handleFavClick(movieData)} className={heartStatusClasses} aria-hidden="true"></i>
                </div>
                    : 
                    <div className='card-image-container'>
                        <Link className='link-style' to={'/movie/' + movieData.tmdb_id + '-' + movieData.title.replace(' ', '-')} state={{movieID:movieData.imdb_id}}>
                    <img src={imgsrc} alt={"Movie & Tv show poster name" + movieData?.name || movieData?.title || movieData.original_name} className='card-image' onClick={() => favContext.handleModelClick(movieData)} />
                    </Link>
                    <i id="heart" onClick={() => handleFavClick(movieData)} className={heartStatusClasses} aria-hidden="true"></i>
                    </div>}

                
                <div className='card-text-container' >

                    {movieData.tv_id ?  <Link className='link-style' to={'/serie/' + movieData.tv_id + '-' + movieData.title.replace(' ', '-')} state={{tvID:movieData.tv_id, tvInfo:movieData}}>
                    <h3 className='card-text-title'>{movieData?.name || movieData?.title || movieData.original_name}</h3>
                    
                    </Link> : <Link className='link-style' to={'/movie/' + movieData.tmdb_id + '-' + movieData.title.replace(' ', '-')} state={{movieID:movieData.imdb_id}}>
                    <h3 className='card-text-title'>{movieData?.name || movieData?.title || movieData.original_name}</h3>
                    </Link> }
                    <div className='card-text-dv'>
                        <h3 className='date'>{movieData.release_date ? movieData.release_date.substring(0, 4) : movieData.first_air_date ? movieData.first_air_date.substring(0, 4) : "-"}</h3>
                        <h3 className='vote'>{movieData.vote_average}<i id="Star-logo" className="fa fa-star fa-xs" aria-hidden="true"></i></h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card