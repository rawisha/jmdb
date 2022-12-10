import React,{useRef} from 'react'
import { auth } from './firebase'
import '../styles/SignUp.css'
const Signup = ( ) => {
    const emailRef = useRef(null)
    const passwordRef = useRef(null)


    const register = (e) => {
        e.preventDefault()

        auth.createUserWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value
        ).then((authUser) => {
            console.log(authUser)

        }).catch(error => {
            alert(error)
        })
    }

    const signIn = (e) => {
        e.preventDefault()
        auth.signInWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value
        ).then((authUser) => {
            console.log(authUser)

        }).catch(error => {
            alert(error)
        })
    }
    
  return (
    <div className='signUpScreen'>
        <div className='Gradient__container'></div>
        <div className='signUpScreen__container'>


        <form>
            <h1>Sign in</h1>
            <input ref={emailRef} type='email' placeholder='Email'></input>
            <input ref={passwordRef} type='password' placeholder='Password'></input>
            <button type="submit" onClick={signIn}>Sign In</button>
            <h2> OR </h2>
            <button type="submit" onClick={Signup}>Sign Up</button>
        </form>
        </div>
    </div>
  )
}
export default (Signup)