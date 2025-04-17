import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-gray-900 shadow-lg">
      <Link to="/" className="text-xl font-bold text-white">💸 GlobalSignals</Link>

      <div className="flex items-center gap-6 text-sm">
        <Link to="/dashboard" className="text-white hover:text-green-400 transition">Dashboard</Link>
        <Link to="/leaderboard" className="text-white hover:text-yellow-400 transition">Leaderboard</Link>
        <Link to="/premium" className="text-white hover:text-purple-400 transition">Premium</Link> {/* novo */}
      </div>
    </nav>
  );
}
