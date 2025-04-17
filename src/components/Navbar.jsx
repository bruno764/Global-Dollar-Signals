import React from 'react';

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-gray-900 shadow-lg">
      <h1 className="text-xl font-bold text-white">💸 GlobalSignals</h1>
      <a href="#" className="text-sm text-blue-400 hover:underline">Login / Register</a>
    </nav>
  );
}