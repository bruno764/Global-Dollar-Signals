import React from 'react';

const sampleWallets = [
  {
    wallet: '5rv4...X9aW',
    address: '5rv4TSmPj4GydMg7WsUe43uQnEXYX9aWXt3HXyX9aWQ2',
    token: '$SPARTA',
    roi: '+2.3',
    source: 'pump.fun'
  },
  {
    wallet: '7btD...xvK3',
    address: '7btDxs9mHcvM43cDpEqyf4cKRo9vK3fpLBxvYqDLkFcM',
    token: '$BULL',
    roi: '+1.8',
    source: 'dexscreener'
  },
  {
    wallet: 'Fks8...D1Zz',
    address: 'Fks8MkXvQr7cs55CVTRafYYxz5kQbgXxL6o4jQcqD1Zz',
    token: '$DUMP',
    roi: '+1.2',
    source: 'pump.fun'
  },
  {
    wallet: 'Ab1z...GhT6',
    address: 'Ab1z8Dsdfg4frXZtxaKJruT9p6ChGhT6eBrPQnvmVZYM',
    token: '$WIF',
    roi: '+0.9',
    source: 'dexscreener'
  },
  {
    wallet: 'Zx94...YlWm',
    address: 'Zx94dLpsYEEkRoG1fn3HZ3q8mms8YlWm6oQpfZh8uU77',
    token: '$PEPE',
    roi: '+0.6',
    source: 'pump.fun'
  },
  {
    wallet: 'KoC8...Qp9f',
    address: 'KoC8uUz2j91xdWQMEfPVprLmwETQp9f4c9kFXkCkz9y2',
    token: '$MONG',
    roi: '+0.3',
    source: 'dexscreener'
  }
];

export default function TopWallets() {
  const copyToClipboard = (address) => {
    navigator.clipboard.writeText(address);
    alert("Wallet copied: " + address);
  };

  return (
    <div className="p-8 text-white max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-cyan-400 mb-6">📊 Top Real Wallets</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sampleWallets.map((wallet, index) => (
          <div key={index} className="bg-gray-800 border border-gray-700 p-4 rounded-xl shadow hover:shadow-lg transition">
            <div className="flex justify-between items-center mb-2">
              <span className="text-lg font-semibold text-blue-300">#{index + 1} {wallet.wallet}</span>
              <span className="text-xs text-gray-400">{wallet.source}</span>
            </div>
            <p className="text-sm text-gray-400 mb-1">Token: <span className="text-green-400">{wallet.token}</span></p>
            <p className="text-sm text-gray-400 mb-1">ROI: <span className="text-yellow-300">{wallet.roi} SOL</span></p>
            <div className="flex justify-between mt-4">
              <a
                href={"https://solscan.io/account/" + wallet.address}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 text-sm hover:underline"
              >
                🔎 View
              </a>
              <button
                onClick={() => copyToClipboard(wallet.address)}
                className="text-sm text-white hover:text-green-400"
              >
                📋 Copy
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
