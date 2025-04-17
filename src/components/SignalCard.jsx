import React from 'react';

export default function SignalCard() {
  return (
    <div className="bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-700 hover:border-blue-500 transition">
      <h3 className="text-lg font-bold text-white mb-2">Token: $XYZ</h3>
      <p className="text-sm text-gray-300">Buy detected from wallet: <span className="text-blue-400">5Fds...Xk91</span></p>
      <p className="text-sm text-green-400 mt-2">Volume: 3.2 SOL</p>
      <p className="text-sm text-yellow-400">Status: Active</p>
    </div>
  );
}