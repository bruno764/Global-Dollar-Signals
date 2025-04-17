import React from 'react';

const mockTop = [
  { name: 'Trader Alpha', roi: '132%', wallet: '9x9d...21aF' },
  { name: 'WhaleHunter', roi: '98%', wallet: '4sd2...HF3r' },
  { name: 'SnipeGod', roi: '81%', wallet: '7jKq...2fMe' },
];

export default function TraderRanking() {
  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
      <table className="w-full text-left text-sm text-gray-300">
        <thead>
          <tr className="text-blue-400 border-b border-gray-700">
            <th className="py-2">Name</th>
            <th>ROI</th>
            <th>Wallet</th>
          </tr>
        </thead>
        <tbody>
          {mockTop.map((trader, index) => (
            <tr key={index} className="hover:text-white">
              <td className="py-2">{trader.name}</td>
              <td>{trader.roi}</td>
              <td><code>{trader.wallet}</code></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}