
import { initializeApp } from "firebase/app";
import "firebase/auth";
import { getAuth,signInWithEmailAndPassword , sendPasswordResetEmail } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export { auth , app , signInWithEmailAndPassword , sendPasswordResetEmail}

        