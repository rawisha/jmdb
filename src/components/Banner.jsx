import React, { useEffect, useState, useContext } from 'react'
import "../styles/Banner.css"
import axios from './axios'
import requests from './requests'
import { FavContext } from '../App'
//classnamespaket, inbyggd typ "if" för klasser
import classNames from 'classnames'
import YouTube from 'react-youtube'
const API_KEY = process.env.REACT_APP_API_KEY;

const defaultMovie = {
    "adult": false, "backdrop_path": "/e3ofKYdZ3jgNYuCriE5AAsHp4L6.jpg",
    "genre_ids": [27, 80, 9648, 53], "id": 298250, "original_language": "en", "original_title": "Jigsaw", "overview": "Dead bodies begin to turn up all over the city, each meeting their demise in a variety of grisly ways. All investigations begin to point the finger at deceased killer John Kramer.", "popularity": 35.392, "poster_path": "/gvBVIlcMaeWKhGjgGjlShiL4w4r.jpg",
    "release_date": "2017-10-26", "title": "Jigsaw", "video": false, "vote_average": 6.2, "vote_count": 2929
}

const Banner = () => {
    const [movie, setMovie] = useState([]);
    //vi använder vårt globala kontext
    const favContext = useContext(FavContext)
    const [favStatus, setFavStatus] = useState(favContext.isFav(typeof (movie) !== 'undefined' && movie.id || defaultMovie.id))
    const [trailerUrl, setTrailerUrl] = useState('')
    const [trailerClass, setTrailerClass] = useState(true)
    const [opt, setOpt] = useState({})
    const [windowDimensions, setWindowDimensions] = useState(
        getWindowDimensions()
    );

    // ** FAVORITES **
    let t = favContext.isFav(typeof (movie) !== 'undefined' && (movie.id) || (favStatus && defaultMovie.id))
    let youtubeClassName = classNames({ 'youtubeWindow': trailerClass })

    //favoritekontroll
    function handleFavClick(movies) {
        if (t === false) {
            favContext.addFav(movies)
            setFavStatus(true)
        } else {
            favContext.removeFav(movies)
            setFavStatus(false)
        }
    }

    //hjärtat fyllt eller ej. {fa ska alltid finnas. tomt hjärta eller fyllt hjärta beroende på om favStatus är true/false}
    let heartStatusClasses = classNames({ 'fa': true, 'fa-heart-o': !t, 'fa-heart': t, })


    // ** BANNERN **
    //hämtar bilderna för bannern
    const fetchData = async () => {
        const request = await axios.get(requests.fetchNetflixOriginals)
        setMovie(request.data.results[Math.floor(Math.random() * request.data.results.length - 1)])
        return request
    }

    //fetchar i interval
    useEffect(() => {
        fetchData()
        setInterval(() => {
            fetchData()
        }, 30000);
    }, []);


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
    const handleTrailer = async (movieID) => {
        if (movie?.first_air_date) {
            const tv = await axios.get(`https://api.themoviedb.org/3/tv/${movieID}?api_key=${API_KEY}&append_to_response=videos`)
            const tvTrailer = tv.data.videos.results[0].key;
            setTrailerUrl(tvTrailer)
            toggleYT()
        } else if (defaultMovie?.release_date || movie?.release_date) {
            const mov = await axios.get(`https://api.themoviedb.org/3/movie/${movieID}?api_key=${API_KEY}&append_to_response=videos`)
            const movTrailer = mov.data.videos.results[0].key
            setTrailerUrl(movTrailer)
            toggleYT()
        }
    }

    //lägger in de tre prickarna när beskrivningen blir för lång
    const truncate = (str, n) => {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
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

    function debounce(fn, ms) {
        let timer
        return _ => {
            clearTimeout(timer)
            timer = setTimeout(_ => {
                timer = null
                fn.apply(this, arguments)
            }, ms)
        };
    }

    //player option för desktop version
    const desktopOpts = {
        height: '280',
        width: '720',
        playerVars: {
            autoplay: 1,
            origin: 'http://localhost:3000',
        },
    }

    //player option för mobil version
    const optss = {
        height: '280',
        width: '340',
        playerVars: {
            autoplay: 1,
            origin: 'http://localhost:3000',
        },
    };

    //uppdateras när skärmbredden ändras
    let opts;
    useEffect(() => {
        const debouncedHandleResize = debounce(function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }, 1000)

        if (windowDimensions.width < 680) {
            opts = optss
            setOpt(opts)
        } else {
            opts = desktopOpts
            setOpt(opts)
        }

        window.addEventListener("resize", debouncedHandleResize);
        return () => window.removeEventListener("resize", debouncedHandleResize);

    }, [windowDimensions.width <= 680]);

    //så den fetchar i interval
    // useEffect(() => {
    //     fetchData()
    //     setInterval(() => {
    //         fetchData()
    //     }, 30000);
    // }, []);

    // //lägger in de tre prickarna när beskrivningen blir för lång
    // const truncate = (str, n) => {
    //     return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    // }

    // //styr om vad det ska stå p play trailer knappen
    // let playtext;
    // if (trailerUrl === '') {
    //     playtext = 'Play trailer'
    // } else {
    //     playtext = 'Close trailer'
    // }

    // //hjärtat fyllt eller ej. {fa ska alltid finnas. tomt hjärta eller fyllt hjärta beroende på om favStatus är true/false}
    // let heartStatusClasses = classNames({ 'fa': true, 'fa-heart-o': !t, 'fa-heart': t, })
   
    return (
        <header className="banner"
            style={{
                backgroundSize: "cover",
                backgroundImage: `url('https://image.tmdb.org/t/p/original/${movie?.backdrop_path || defaultMovie.backdrop_path}')`,
                backgroundPosition: "center center",
            }}
        >
            <div className="banner-contents">
                <h2 className='banner-title'>{movie?.title || movie?.name || movie?.original_name || defaultMovie.name}</h2>
                <p className="banner-overview">
                    {truncate(movie?.overview, 150) || truncate(defaultMovie.overview, 150)}
                </p>
                <div className='banner-information-button'>
                    <button onClick={() => handleTrailer(movie?.id || defaultMovie?.id)} className='banner-button'><i className="fa fa-play" aria-hidden="true"></i>{playtext}</button>
                    <button onClick={() => handleFavClick(movie || defaultMovie)} className='banner-button'><i className={heartStatusClasses} aria-hidden="true"></i>Favorite</button>
                </div>
                <div className="player__container">
                    <YouTube className={youtubeClassName} videoId={trailerUrl} opts={opt} />
                </div>
            </div>
        </header>
    )
}

export default Banner;