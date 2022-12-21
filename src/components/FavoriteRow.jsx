import React, { useRef } from 'react'
import "../styles/Row.css"

import Card from './Card';

const FavoriteRow = ({ title, data }) => {

    //styr scroll höger/vänster
    const ref = useRef(null);
    const scroll = (scrollOffset) => {
        ref.current.scrollLeft += scrollOffset;
    };


    return (
        <section className='row '>
            <h2>{title}</h2>
            <button className='btn__left' onClick={() => scroll(-270)}><i className="fa fa-angle-left"></i></button>
            <div className='card-container ' ref={ref}>
                {data.favorites?.length === 0 && <h3 className='favorite-h3'>Oooops it´s empty here! Feel free to add some content</h3>}
                {data.favorites?.length > 0 && data.favorites?.map(movie => <Card key={movie.id} movieData={movie} />)}
            </div>
            <button className='btn__right ' onClick={() => scroll(270)}><i className="fa fa-angle-right"></i></button>
        </section>
    )
}

export default FavoriteRow;
