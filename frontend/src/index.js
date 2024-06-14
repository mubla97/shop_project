import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Nav from './Navigation/Nav';
import { UserProvider } from './Context/UserContext';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <UserProvider>
      <BrowserRouter>
          <Nav />
          <App />
      </BrowserRouter>
    </UserProvider>
  </React.StrictMode>,
);

reportWebVitals();
