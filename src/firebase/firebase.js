
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from 'firebase/firestore';




const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: "filmyrise.firebaseapp.com",
    projectId: "filmyrise",
    storageBucket: "filmyrise.appspot.com",
    messagingSenderId: "768940314387",
    appId: "1:768940314387:web:09f473769a9cd0087c54e6"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const moviesRef = collection(db, "movies");
export const reviewsRef = collection(db, "reviews");
export const usersRef = collection(db, "users");


export default app;