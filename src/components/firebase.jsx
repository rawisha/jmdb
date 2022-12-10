import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';



const firebaseConfig = {
    apiKey: "AIzaSyAA9JtAO1Cejb6uBVyxPbQ7zFJiKQ7LyYU",
    authDomain: "minimovie-c672b.firebaseapp.com",
    projectId: "minimovie-c672b",
    storageBucket: "minimovie-c672b.appspot.com",
    messagingSenderId: "72700633791",
    appId: "1:72700633791:web:a9eca27e98ed00486c1c0a"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig)
  const db = firebaseApp.firestore()
  const auth = firebase.auth()

  export {auth};
  export default db;