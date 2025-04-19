import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { WalletConnectionProvider } from './contexts/WalletContext';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <WalletConnectionProvider>
        <App />
      </WalletConnectionProvider>
    </BrowserRouter>
  </React.StrictMode>
);
