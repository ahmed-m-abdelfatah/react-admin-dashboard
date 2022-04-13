import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthContextProvider } from './context/authContext.js';
import { DarkModeContextProvider } from './context/darkModeContext.js';

ReactDOM.render(
  <AuthContextProvider>
    <DarkModeContextProvider>
      <BrowserRouter basename='/react-admin-dashboard'>
        <App />
      </BrowserRouter>
    </DarkModeContextProvider>
  </AuthContextProvider>,
  document.getElementById('root'),
);
