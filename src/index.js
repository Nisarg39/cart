import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: "AIzaSyB9fwC_4oDoJTiBIjDRITo7EpdC0S0LRSw",
  authDomain: "cart-a0c86.firebaseapp.com",
  projectId: "cart-a0c86",
  storageBucket: "cart-a0c86.appspot.com",
  messagingSenderId: "683752978916",
  appId: "1:683752978916:web:f71965a26e77b7caa1eff1"
};

const app=initializeApp(firebaseConfig);
const db = getFirestore(app);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
