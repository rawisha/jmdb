import React, { useState, useEffect } from 'react';
import "./styles/Modal.css"
import './App.css';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from './components/Home';
import Favorites from './components/Favorites';
import SeriesPage from './components/SeriesPage';
import MoviePage from './components/MoviePage';
import Signup from './components/Signup';
import db ,{ auth} from './components/firebase';
import { useDispatch, useSelector } from 'react-redux';
import {login, logout, selectUser} from './features/userSlice'
import {arrayUnion, doc, updateDoc,onSnapshot} from 'firebase/firestore'

//skapar vårt globala kontext
export const FavContext = React.createContext();

export default function App() {
  
  const [favorites, setFavorites] = useState([])
  
  const user = useSelector(selectUser);
  const dispatch = useDispatch()
  
  // use Auth checker
  const dbUser = doc(db, 'users', `${user?.email}`)

  const addToDb = async (movie) => {
    await updateDoc(dbUser,{
      savedFavorites: arrayUnion(movie)
    })
  } 

  const removeFromDb = async (movieId) => {
    const newData = favorites.filter((item) => item._id !== movieId)
    await updateDoc(dbUser, {
      savedFavorites: newData
    })
  }

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
    //localStorage.setItem("favs", JSON.stringify(favorites));
  }, [])

  useEffect(() => {
    onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
      setFavorites(doc.data()?.savedFavorites)
    })
    
  }, [user?.email])

  

  //våra globala saker som vi samlar i ett objekt för att slippa skriva alla som value i providern
  const favContextValues = {
    favorites: favorites,
    setFavorites: setFavorites,
    
    //se om filmen vi trycker på finns i favorites eller ej
    isFav(movieId) {
      
      //sök på filmens id
      const index = favorites?.findIndex(f => movieId === f._id)
      
      return (index === -1) ? false : true
    },

    //lägg till favorit
    addFav(movie) {
      addToDb(movie)
      
    
    },

    //radera favorit
    removeFav(movie) {
    
      removeFromDb(movie._id)
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
