import React, { useState, useContext } from 'react'
import Header from './Header'
import { FavContext } from '../App'
import ResultCard from './ResultCard';
import "../styles/Contact.css"
import { useNavigate } from "react-router-dom";
import video from '../video/video1.mp4'
import cc from '../video/video1.vtt'
function Contact() {

    const [results, setResults] = useState([]);

  return (
    <>
   <Header results={results} setResults={setResults} />
   <div className='result-Container'>
        <ResultCard results={results} />
    
    </div>
    <div className='Container'>
        <div className='vid-Container'>
        <video width="750" height="550" controls>
        <source src={video} type="video/mp4"></source>
        <track src={cc} kind="subtitles" srclang="sv" label="Svenska"></track>
            Your browser does not support the video tag.
        </video>
        </div>      
    <div className='form--container'>

        <form>
        <h1>Got questions? Use the form below to contact us</h1>
            <label>Name *</label>
            <div className='field'>
                <input required type="text" name='name' placeholder='Enter your name..'></input>
                <p>Error message</p>
            </div>
            <label>Email *</label>
            <div className='field'>
                <input required type="email" name='email' placeholder='Enter your email..'></input>
                <p>Error message</p>
            </div>
            <label>Phone (optional)</label>
            <div className='field'>
                
                <input type="number" name='phone' placeholder='Enter your phone number..'></input>
            </div>
            <label>Message *</label>
            <div className='field'>
                <textarea required name="message" id="message" cols="30" rows="10" placeholder='Write your message here...'></textarea>
                <p>Error message</p>
            </div>
            <div className='buttons'>
            <input type="submit" value="SEND" className='sendBtn'></input>
            <a href='https://imdb.com'><button className='visitBtn' type='button'>Visit IMDB</button></a>
            
            
            </div>
            
        </form>

    </div>
    </div>
    </>
  )
}

export default Contact