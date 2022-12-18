import React, { useState } from 'react'
import Header from './Header';
import Banner from './Banner';
import Footer from "./Footer";
import ResultCard from './ResultCard';
import Row from './Row';
import requests from './requests';


const Home = () => {
    const [results, setResults] = useState([]);
    
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