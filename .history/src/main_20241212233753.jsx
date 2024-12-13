import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google'; // Import GoogleOAuthProvider
import App from "./components/App/App";
import './index.css';

CLIENT_ID: "273881584331-8ri21gc1og6tfu3l1r3v7na4fkc17452.apps.googleusercontent.com",

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/MyCareAssist-frontend/">
      <GoogleOAuthProvider clientId={clientId}> {/* Wrap your app with GoogleOAuthProvider */}
        <App />
      </GoogleOAuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);

