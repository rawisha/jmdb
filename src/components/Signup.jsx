import React, { useRef, useState } from "react";
import db, { auth } from "./firebase";
import "../styles/SignUp.css";
import { setDoc, doc } from "firebase/firestore";
const Signup = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [error, setError] = useState("");
  const register = (e) => {
    e.preventDefault();

    auth
      .createUserWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((authUser) => {
        setDoc(doc(db, "users", authUser.user.email), {
          savedFavorites: [],
        });
      })
      .catch((error) => {
        alert(error);
      });
  };

  const signIn = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((authUser) => {})
      .catch((error) => {
        setError(error.message.substring(10));
      });
  };

  return (
    <div className="signUpScreen">
      <div className="Gradient__container"></div>
      <div className="signUpScreen__container">
        <form>
          <h1>Sign in</h1>

          <h3>{error}</h3>

          <input ref={emailRef} type="email" placeholder="Email"></input>
          <input
            ref={passwordRef}
            type="password"
            placeholder="Password"
          ></input>
          <button type="submit" onClick={signIn}>
            Sign In
          </button>
          <h2> OR </h2>
          <button type="submit" onClick={register}>
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};
export default Signup;
