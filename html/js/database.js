import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAPKMfBYrh_6RXyTAD7B6_KLlXHzDP2mmk",
    authDomain: "sensory-eleven.firebaseapp.com",
    projectId: "sensory-eleven",
    storageBucket: "sensory-eleven.appspot.com",
    messagingSenderId: "903447585900",
    appId: "1:903447585900:web:bc595869999f5b41dda449",
    measurementId: "G-5Q6WJ5P46Y"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const info = {
    getFirebaseConfig: () => firebaseConfig,
    getDb: () => db,
    getApp: () => app
};

export default info;