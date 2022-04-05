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
            <Row title="Trending" fetchURL={requests.fetchTrending} />
            <Row title="Action" fetchURL={requests.fetchActionMovies} />
            <Row title="Romance" fetchURL={requests.fetchRomanceMovies} />
            <Row title="Horror" fetchURL={requests.fetchHorrorMovies} />
            <Row title="Comedy" fetchURL={requests.fetchComedyMovies} />
            <Row title="Documentary" fetchURL={requests.fetchDocumentaries} />
            <Footer />
        </div>
    );
}

export default Home;