import React from 'react'
import { useNavigate } from 'react-router-dom'
import "../styles/NotFound.css"
import HarryPotter from "../img/harry-potter.png"

const NotFound = () => {
    let navigate = useNavigate()

    return (
        <section className='error-section'>
            <div className='error-text-container'>
                <h1>Sorry, page not found!</h1>
                <p>You about to enter the dark forest. Hurry up and leave before you get caught. We left this Nimbus 2000 for you to fly back.</p>
                <button onClick={() => { navigate("/") }}>Fly back to home</button>
            </div>
            <div className='error-image-container'>
                <img src={HarryPotter} alt="Not found harry potter broom"/>
            </div>
        </section>  
    )
}

export default NotFound;