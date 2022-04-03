import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { DarkModeContextProvider } from './context/darkModeContext.js';

ReactDOM.render(
  <DarkModeContextProvider>
    <BrowserRouter basename='/react-admin-dashboard'>
      <App />
    </BrowserRouter>
  </DarkModeContextProvider>,
  document.getElementById('root'),
);
