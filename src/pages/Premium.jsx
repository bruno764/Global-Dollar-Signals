import React, { useState } from 'react';
import { useWalletContext } from '../contexts/WalletContext';
import { db } from '../firebase/firebaseConfig';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export default function Premium() {
  const { walletAddress } = useWalletContext();
  const [status, setStatus] = useState(null);

  const handleUpgrade = async () => {
    if (!walletAddress) return setStatus("⚠️ Connect wallet first");

    try {
      const ref = doc(db, "wallets", walletAddress);
      const snapshot = await getDoc(ref);

      const prevData = snapshot.exists() ? snapshot.data() : {};

      await setDoc(ref, {
        ...prevData,
        isPremium: true,
      }, { merge: true });

      setStatus("🎉 Upgrade successful! Welcome to Premium.");
    } catch (error) {
      console.error("Erro ao ativar premium:", error);
      setStatus("❌ Failed to upgrade. Try again.");
    }
  };

  return (
    <div className="p-10 text-white max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold text-purple-400 mb-6">🚀 Go Premium</h1>
      <p className="text-lg mb-4 text-gray-300">
        Unlock faster signals, priority access and exclusive trader insights.
      </p>

      <ul className="mb-6 text-green-300 list-disc list-inside">
        <li>⚡ Real-time signal delivery (0s delay)</li>
        <li>🌐 Highlighted in the leaderboard</li>
        <li>🎁 Future airdrops and rewards</li>
      </ul>

      <button
        onClick={handleUpgrade}
        className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl shadow-lg text-lg transition"
      >
        Upgrade Now
      </button>

      {status && <p className="mt-4 text-yellow-400">{status}</p>}
    </div>
  );
}
