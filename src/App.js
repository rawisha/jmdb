import React, { useState, useEffect } from 'react';
import "./styles/Modal.css"
import './App.css';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from './components/Home';
import Favorites from './components/Favorites';
import SeriesPage from './components/SeriesPage';
import MoviePage from './components/MoviePage';
import Signup from './components/Signup';
import { auth } from './components/firebase';
import { useDispatch, useSelector } from 'react-redux';
import {login, logout, selectUser} from './features/userSlice'


//skapar vårt globala kontext
export const FavContext = React.createContext();

export default function App() {
  const initFavs = JSON.parse(localStorage.getItem('favs')) || []
  const [favorites, setFavorites] = useState(initFavs)
  const user = useSelector(selectUser);
  const dispatch = useDispatch()

  // use Auth checker

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if(userAuth) {
        
        dispatch(login({
          uid: userAuth.uid,
          email: userAuth.email,
        }))
      }else {
        // Logged out
        dispatch(logout)
      }
    })

    return unsubscribe
  },[])



  //** LOCAL STORAGE/FAVORITER **
  useEffect(() => {
    localStorage.setItem("favs", JSON.stringify(favorites));
  }, [favorites])


  //våra globala saker som vi samlar i ett objekt för att slippa skriva alla som value i providern
  const favContextValues = {
    favorites: favorites,
    setFavorites: setFavorites,
    
    //se om filmen vi trycker på finns i favorites eller ej
    isFav(movieId) {
      
      //sök på filmens id
      const index = favorites.findIndex(f => movieId === f._id)
      
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
      const newFavs = favorites.filter(f => movie._id !== f._id)
      //vi öppnar och uppdaterar med nya listan
      setFavorites([...newFavs])
    },
  }



  // ** SIDAN **
  //providern wrappar de komponenter som ska kunna använda vår globala kontext
  return (
    
    
      
      <Router>
        {!user ? (
          <Signup />
        ):
        <FavContext.Provider value={favContextValues} >
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/favorites' element={<Favorites />} />
          <Route path='/serie/:id' element={<SeriesPage />} />
          <Route path='/movie/:id' element={<MoviePage />} />
          
        </Routes>
        </FavContext.Provider>
        }
        
        
      </Router>
      
      
      
      
  );
}
