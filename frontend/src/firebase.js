// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA89WXL78QO01-qq81wkRcZg8dhwVAX-LI",
  authDomain: "paf-assignment.firebaseapp.com",
  projectId: "paf-assignment",
  storageBucket: "paf-assignment.appspot.com",
  messagingSenderId: "162304699978",
  appId: "1:162304699978:web:7d7ebcbdf1f2501b8180b3",
  measurementId: "G-G4ZQT3DTLF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app, "gs://paf-assignment.appspot.com");
// const storage = firebase.app().storage('gs://fir-ab5dc.appspot.com');

export default storage;