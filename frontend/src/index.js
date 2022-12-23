import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
document.body.style.backgroundImage =
  'linear-gradient(180deg,#7ba573 25%, #4a7342 25%,#4a7342 50%,#7ba573 50%,#7ba573 75%,#4a7342 75%,#4a7342 100%)';
document.body.style.backgroundSize = '40px 40px';
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

