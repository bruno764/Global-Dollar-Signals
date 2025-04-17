import React, { useEffect, useState } from 'react';
import { db } from '../firebase/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

export default function Leaderboard() {
  const [wallets, setWallets] = useState([]);
  const [referrers, setReferrers] = useState([]);

  useEffect(() => {
    const fetchWallets = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'wallets'));
        const raw = snapshot.docs.map(doc => doc.data());

        // Simular ROI
        const withRoi = raw.map(w => ({
          ...w,
          roi: simulateROI(w.totalSignalsReceived || 0)
        }));

        // Contar referidos
        const referralMap = {};
        raw.forEach(w => {
          const ref = w.referral;
          if (ref) {
            referralMap[ref] = (referralMap[ref] || 0) + 1;
          }
        });

        // Adiciona contador
        const withReferrals = withRoi.map(w => ({
          ...w,
          referrals: referralMap[w.wallet] || 0
        }));

        // Ordena ROI
        const byRoi = [...withReferrals].sort((a, b) => b.roi - a.roi);
        const byRef = [...withReferrals].sort((a, b) => b.referrals - a.referrals);

        setWallets(byRoi);
        setReferrers(byRef);
      } catch (error) {
        console.error("Erro ao buscar wallets:", error);
      }
    };

    fetchWallets();
  }, []);

  const simulateROI = (signals) => {
    const base = 0.5 + Math.random() * 1.5;
    return (base * signals).toFixed(2);
  };

  const shortenWallet = (addr) =>
    addr ? addr.slice(0, 4) + '...' + addr.slice(-4) : '';

  return (
    <div className="p-8 text-white">
      <h1 className="text-3xl font-bold text-yellow-400 mb-6">🏆 Top Traders (ROI)</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-12">
        {wallets.map((w, index) => (
          <div
            key={index}
            className="bg-gray-800 border border-gray-700 p-4 rounded-xl shadow-md hover:shadow-lg transition"
          >
            <div className="flex items-center gap-4 mb-2">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white">
                #{index + 1}
              </div>
              <div>
                <p className="text-lg font-semibold text-blue-300">{shortenWallet(w.wallet)}</p>
                {w.isPremium && (
                  <p className="text-xs text-purple-400 font-bold mt-1">⭐ Premium</p>
                )}
                <p className="text-sm text-gray-400">Signals: {w.totalSignalsReceived || 0}</p>
              </div>
            </div>
            <p className="text-green-400 text-lg font-bold">ROI: {w.roi} SOL</p>
          </div>
        ))}
        {wallets.length === 0 && <p className="text-gray-500">No wallets found yet.</p>}
      </div>

      <h1 className="text-3xl font-bold text-pink-400 mb-6">🔗 Top Referrers</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {referrers.map((w, index) => (
          <div
            key={index}
            className="bg-gray-800 border border-gray-700 p-4 rounded-xl shadow-md hover:shadow-lg transition"
          >
            <div className="flex items-center gap-4 mb-2">
              <div className="w-10 h-10 rounded-full bg-pink-600 flex items-center justify-center font-bold text-white">
                #{index + 1}
              </div>
              <div>
                <p className="text-lg font-semibold text-pink-300">{shortenWallet(w.wallet)}</p>
                {w.isPremium && (
                  <p className="text-xs text-purple-400 font-bold mt-1">⭐ Premium</p>
                )}
                <p className="text-sm text-gray-400">Referrals: {w.referrals}</p>
              </div>
            </div>
            <p className="text-yellow-400 text-sm">+{(w.referrals * 0.1).toFixed(2)} SOL bonus</p>
          </div>
        ))}
        {referrers.length === 0 && <p className="text-gray-500">No referrers yet.</p>}
      </div>
    </div>
  );
}
