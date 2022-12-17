import React, { useState } from 'react'
import Header from './Header';
import Banner from './Banner';
import Footer from "./Footer";
import ResultCard from './ResultCard';
import Row from './Row';
import requests from './requests';


const Home = () => {
    const [results, setResults] = useState([]);
    console.log(process.env.REACT_APP_API_KEY)
    console.log(process.env.REACT_APP_apiKey)
    console.log(process.env.REACT_APP_authDomain)
    console.log(process.env.REACT_APP_projectId)
    console.log(process.env.REACT_APP_messagingSenderId)
    console.log(process.env.REACT_APP_appId)
    console.log(process.env.REACT_APP_storageBucket)
    console.log(process.env.REACT_APP_PROXY)
    return (
        <div className='app'>
            <Header results={results} setResults={setResults} />
            <Banner />
            <ResultCard results={results} />
            <Row title="Series" fetchURL={requests.fetchSeries} />
            <Row title="Movies" fetchURL={requests.fetchMovies} />
            <Footer />
        </div>
    );
}

export default Home;