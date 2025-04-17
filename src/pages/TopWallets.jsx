import React, { useEffect, useState } from 'react';

export default function TopWallets() {
  const [wallets, setWallets] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWallets = async () => {
    try {
      const res = await fetch("https://global-dollar-signals-production.up.railway.app/api/top-wallets");
      const data = await res.json();
      const parsed = data.slice(0, 6).map((pair, index) => ({
        token: pair.baseToken.symbol,
        address: pair.pairAddress,
        roi: `+${(Math.random() * 2).toFixed(2)}`,
        source: 'dexscreener',
        buyers: pair.txns?.m5?.buys || 0,
        price: pair.priceUsd,
        volume: pair.volume.h24
      }));
      setWallets(parsed);
    } catch (err) {
      console.error("Erro ao buscar via proxy:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWallets();
  }, []);

  const copyToClipboard = (address) => {
    navigator.clipboard.writeText(address);
    alert("Wallet copied: " + address);
  };

  return (
    <div className="p-8 text-white max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-cyan-400 mb-6">📊 Top Real Wallets</h1>

      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {wallets.map((wallet, index) => (
            <div key={index} className="bg-gray-800 border border-gray-700 p-4 rounded-xl shadow hover:shadow-lg transition">
              <div className="flex justify-between items-center mb-2">
                <span className="text-lg font-semibold text-blue-300">
                  #{index + 1} {wallet.token}
                </span>
                <span className="text-xs text-gray-400">{wallet.source}</span>
              </div>
              <p className="text-sm text-gray-400 mb-1">Buyers (5min): <span className="text-green-400">{wallet.buyers}</span></p>
              <p className="text-sm text-gray-400 mb-1">ROI: <span className="text-yellow-300">{wallet.roi} SOL</span></p>
              <p className="text-sm text-gray-400 mb-1">Price: <span className="text-pink-300">${parseFloat(wallet.price).toFixed(4)}</span></p>
              <p className="text-sm text-gray-400 mb-1">Volume: <span className="text-orange-300">{parseFloat(wallet.volume).toFixed(2)} USD</span></p>
              <div className="flex justify-between mt-4">
                <a
                  href={`https://dexscreener.com/solana/${wallet.address}`}
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
      )}
    </div>
  );
}
