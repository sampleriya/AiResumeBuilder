import { initializeApp, getApps } from "firebase/app";
import { getAuth,  GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore"; // Import Firestore

const firebaseConfig = {
  apiKey: "AIzaSyBvpKYgLcdgt77w7LhkoS8Q4Gv1ujwmZ2k",
  authDomain: "corporate-gate-94252.firebaseapp.com",
  projectId: "corporate-gate-94252",
  storageBucket: "corporate-gate-94252.appspot.com",
  messagingSenderId: "190017985152",
  appId: "1:190017985152:web:04355ae9ca3b8362f26465",
  measurementId: "G-WCKRM50XKZ",
};

// Check if any Firebase apps have been initialized, if not, initialize one
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app); // Initialize Firestore
const googleProvider = new GoogleAuthProvider();

export { auth, storage, db, googleProvider };
