import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="988334683797-svavkgnvqnolf13ln3lccqi9avokagf6.apps.googleusercontent.com">
    <App />  
    </GoogleOAuthProvider>;
    
  </React.StrictMode>
);

// NO NEED TO EDIT THIS FILE