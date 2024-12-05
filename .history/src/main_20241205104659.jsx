import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from "./components/App/App"
import './index.css';

ReactDOMcreateRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
