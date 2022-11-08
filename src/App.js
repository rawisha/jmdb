import React, { useState, useEffect } from 'react';
import "./styles/Modal.css"
import './App.css';
import NotFound from './components/NotFound';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Favorites from './components/Favorites';
import Contact from './components/Contact';
import Modal from 'react-modal';
import classNames from 'classnames'
import YouTube from 'react-youtube'
import axios from './components/axios'
const API_KEY = process.env.REACT_APP_API_KEY;
const base_url = "https://image.tmdb.org/t/p/w200/";

Modal.setAppElement('#root');
//skapar vårt globala kontext
export const FavContext = React.createContext();

export default function App() {
  const initFavs = JSON.parse(localStorage.getItem('favs')) || []
  const [favorites, setFavorites] = useState(initFavs)
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [movieModal, setMovieModal] = useState(null)
  const [trailerUrl, setTrailerUrl] = useState('')
  const [trailerClass, setTrailerClass] = useState(true)
  const [opt, setOpt] = useState({})
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );


  //** TRAILER **
  let youtubeClassName = classNames({ 'youtubeWindow': trailerClass })

  //trailer - youtube togglern
  const toggleYT = () => {
    if (!trailerClass === false) {
      setTrailerClass(false)
    } else {
      setTrailerClass(true)
      setTrailerUrl('')

    }
  }

  //trailer - tv-serie eller film
  const handleTrailer = async (movie) => {
    //tv-serie
    if (movie.first_air_date) {
      const tv = await axios.get(`https://api.themoviedb.org/3/tv/${movie.id}?api_key=${API_KEY}&append_to_response=videos`)
      //går in i responsen och plockar ut trailern via key vi får tillbaka
      const tvTrailer = tv.data.videos.results[0].key
      //sätter url till det vi fick tillbaka
      setTrailerUrl(tvTrailer)
      //kallar på toggel
      toggleYT()
      //film
    } else {
      const mov = await axios.get(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=${API_KEY}&append_to_response=videos`)
      const movTrailer = mov.data.videos.results[0].key
      setTrailerUrl(movTrailer)
      toggleYT()
    }
  }

  //styr om vad det ska stå på play trailer knappen
  let playtext;
  if (trailerUrl === '') {
    playtext = 'Play trailer'
  } else {
    playtext = 'Close trailer'
  }


  // ** TRAILEROPTIONS BEROENDE AV SKÄRMBREDD **
  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }

  //player option för desktop version
  const desktopOpts = {
    height: '280',
    width: '690',
    playerVars: {
      autoplay: 1,
      origin: 'http://localhost:3000',
    },
  }
  //player option för mobil version
  const optss = {
    height: '280',
    width: '310',
    playerVars: {
      autoplay: 1,
      origin: 'http://localhost:3000',
    },
  };

  //uppdateras när skärmbredden ändras
  let opts;
  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    if (windowDimensions.width < 680) {
      opts = optss
      setOpt(opts)
    } else {
      opts = desktopOpts
      setOpt(opts)
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);

  }, [windowDimensions.width <= 680]);


  //** LOCAL STORAGE/FAVORITER **
  useEffect(() => {
    localStorage.setItem("favs", JSON.stringify(favorites));
  }, [favorites])


  //våra globala saker som vi samlar i ett objekt för att slippa skriva alla som value i providern
  const favContextValues = {
    favorites: favorites,
    setFavorites: setFavorites,
    handleModelClick(movie) {
      setMovieModal(movie)
      setModalIsOpen(true)
    },

    //se om filmen vi trycker på finns i favorites eller ej
    isFav(movieId) {
      //sök på filmens id
      const index = favorites.findIndex(f => movieId === f.id)
      return (index === -1) ? false : true
    },

    //lägg till favorit
    addFav(movie) {
      //kopia och lägger in nya filmen
      setFavorites([...favorites, movie])
    },

    //radera favorit
    removeFav(movie) {
      //vi tar bort allt som inte har id
      const newFavs = favorites.filter(f => movie.id !== f.id)
      //vi öppnar och uppdaterar med nya listan
      setFavorites([...newFavs])
    },
  }


  //** MODALEN **
  //när vi kryssar modalen "nollställs" det som tidigare varit där
  function closeModal() {
    setModalIsOpen(false);
    setTrailerUrl('')
    setTrailerClass(true)
  }

  //in i MovieModal funktionen skickar vi vår movieData och vår baseurl
  const MovieModal = ({ mData, base_url }) => {

    return (
      <>
        <div className="modal-container">
          <i onClick={closeModal} className="fa fa-times"></i>
          <div className="modal-image-container">
            <img className="modal-image" src={base_url + mData.poster_path} alt="" />
          </div>
          <div className="modal-info-container">
            <h1 className="modal-info-title">{mData.title || mData.name || mData.original_name}</h1>
            <h2 className="modal-info-info">{mData.release_date} {mData.first_air_date}<i className="fa fa-star fa-xs"></i>{mData.vote_average}</h2>
            <p>{mData.overview}</p>
            <div className="modal-buttons-container">
              <button onClick={() => handleTrailer(mData)}><i className="fa fa-play" aria-hidden="true"></i>{playtext}</button>
            </div>
          </div>
          <div className='youtubePlayer'><YouTube className={youtubeClassName} videoId={trailerUrl} opts={opt} /></div>
        </div>
      </>
    )
  }

  // ** SIDAN **
  //providern wrappar de komponenter som ska kunna använda vår globala kontext
  return (
    <FavContext.Provider value={favContextValues}>
      <div>
        {/* Modalen är ett "paket" till react */}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          className='Modal'
          overlayClassName="Overlay"
        >
          <MovieModal mData={movieModal} base_url={base_url} />
        </Modal>
      </div>
      {/*Routes fungerar ung som länkar till olika sidorna, path = endpointsen, element = sidkomponenten */}
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/favorites' element={<Favorites />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
    </FavContext.Provider>
  );
}
