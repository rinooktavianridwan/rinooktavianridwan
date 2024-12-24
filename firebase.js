// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAca5-SJtnu9weYPDgAFWjyLqhY5E1ERbE",
  authDomain: "portofolio-rino.firebaseapp.com",
  projectId: "portofolio-rino",
  storageBucket: "portofolio-rino.firebasestorage.app",
  messagingSenderId: "568785049025",
  appId: "1:568785049025:web:82812693de329d096b8b40",
  measurementId: "G-C9LR9ML42E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);