import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Leaderboard from './pages/Leaderboard';
import Premium from './pages/Premium';
import TopWallets from './pages/TopWallets';
import Login from './pages/Login'; // <- adicione isso se ainda não estiver lá

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/premium" element={<Premium />} />
        <Route path="/top-wallets" element={<TopWallets />} />
        <Route path="/login" element={<Login />} /> {/* Adicione essa rota se necessário */}
      </Routes>
    </div>
  );
}
