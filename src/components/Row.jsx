import React, { useState, useEffect, useRef } from 'react'
import "../styles/Row.css"
import axios from "../components/axios";
import Card from './Card';

const Row = ({ title, fetchURL }) => {
    const [movies, setMovies] = useState([]);

    
    //styr scroll höger/vänster
    const ref = useRef(null);
    const scroll = (scrollOffset) => {
        ref.current.scrollLeft += scrollOffset;
    };

    //fetchar och fyller vårt state med datan som ska fylla våra rows
    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchURL);
            
            setMovies(request.data);
            return request;
        }
        fetchData();
    }, [fetchURL]);

    return (
        <section className='row '>
            <h2>{title}</h2>
            <button className='btn__left' onClick={() => scroll(-270)}><i className="fa fa-angle-left"></i></button>
            <div className='card-container ' ref={ref}>
                {movies.map(movie => <Card key={movie.id} movieData={movie} />)}
            </div>
            <button className='btn__right ' onClick={() => scroll(270)}><i className="fa fa-angle-right"></i></button>
        </section>
    )
}

export default Row;
