import React, { useState, useContext,useEffect,useRef} from 'react'
import Header from './Header'
import { FavContext } from '../App'
import ResultCard from './ResultCard';
import "../styles/Contact.css"
import { useNavigate } from "react-router-dom";
import video from '../video/video1.mp4'
import cc from '../video/video1.vtt'
function Contact() {

    const [results, setResults] = useState([]);
    const [nameValue, setNameValue] = useState("");
    const [emailValue, setEmailValue] = useState("");
    const [messageValue, setMessageValue] = useState("");
    const [phoneValue, setPhoneValue] = useState("");
    const name = useRef
    
    useEffect(() => {
        if(nameValue || emailValue || messageValue || phoneValue !== ''){
            console.log(nameValue)
            window.addEventListener("beforeunload", function (e) {
                e.preventDefault()
                var confirmationMessage = "\o/";
              
                (e || window.event).returnValue = confirmationMessage; 
                return confirmationMessage;                            
              });
        }
    },[nameValue,emailValue,messageValue,phoneValue])
   

  return (
    <>
   <Header results={results} setResults={setResults} />
   <div className='result-Container'>
        <ResultCard results={results} />
    
    </div>
    <div className='Container'>
    
        <div className='vid-Container'>
        <p className='pTag'>To view more videos like this, <a href="https://www.youtube.com/watch?v=VKuZrI25opU"><span className='link'>click here</span></a></p>
        <video width="750" height="550" controls>
        <source src={video} type="video/mp4"></source>
        <track src={cc} kind="subtitles" srcLang="sv" label="Svenska"></track>
            Your browser does not support the video tag.
        </video>
        </div>      
    <div className='form--container'>

        <form>
        <h1>Got questions? Use the form below to contact us</h1>
            <label>Name *</label>
            <div className='field'>
                <input  required type="text" name='name' value={nameValue} onChange={(e) => setNameValue(e.target.value)} placeholder='Enter your name..'></input>
                <p>Error message</p>
            </div>
            <label>Email *</label>
            <div className='field'>
                <input required type="email" name='email' value={emailValue} onChange={(e) => setEmailValue(e.target.value)} placeholder='Enter your email..'></input>
                <p>Error message</p>
            </div>
            <label>Phone (optional)</label>
            <div className='field'>
                
                <input type="number" name='phone' onChange={(e) => setPhoneValue(e.target.value)} placeholder='Enter your phone number..'></input>
            </div>
            <label>Message *</label>
            <div className='field'>
                <textarea required name="message" id="message" cols="30" rows="10" value={messageValue} onChange={(e) => setMessageValue(e.target.value)} placeholder='Write your message here...'></textarea>
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