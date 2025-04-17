import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { WalletConnectionProvider } from './contexts/WalletContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WalletConnectionProvider>
      <App />
    </WalletConnectionProvider>
  </React.StrictMode>,
);
