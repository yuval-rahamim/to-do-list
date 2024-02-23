import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBo6ChjpPwdT49iTPTMwsyyhKlS9LivWJU",
  authDomain: "todolist-e92f1.firebaseapp.com",
  projectId: "todolist-e92f1",
  storageBucket: "todolist-e92f1.appspot.com",
  messagingSenderId: "1077990070156",
  appId: "1:1077990070156:web:7883916c110044661f28a9",
  measurementId: "G-12BWBM4BHL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
