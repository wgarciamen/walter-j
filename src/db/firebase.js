// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAsDo-x2QGK4TQrkq9elGh3xFqjDZVWmSM",
  authDomain: "ecomers-walter.firebaseapp.com",
  projectId: "ecomers-walter",
  storageBucket: "ecomers-walter.appspot.com",
  messagingSenderId: "442864841872",
  appId: "1:442864841872:web:d2acbea877b657d9d1d415",
  measurementId: "G-TTWQXZ01H0"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
