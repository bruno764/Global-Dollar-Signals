import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Leaderboard from './pages/Leaderboard';
import Premium from './pages/Premium';
import TopWallets from './pages/TopWallets';
import Login from './pages/Login'; // 🔥 ADICIONADO

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black text-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} /> {/* 🔥 ADICIONADO */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/premium" element={<Premium />} />
          <Route path="/top-wallets" element={<TopWallets />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
