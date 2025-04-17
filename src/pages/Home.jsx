import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import SignalCard from '../components/SignalCard';
import TraderRanking from '../components/TraderRanking';
import WalletButton from '../components/WalletButton';
import { useWalletContext } from '../contexts/WalletContext';
import { db } from '../firebase/firebaseConfig';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

export default function Home() {
  const { walletAddress } = useWalletContext();

  const registerWallet = async (address) => {
    if (!address) return;
    try {
      await setDoc(doc(db, "wallets", address), {
        wallet: address,
        createdAt: serverTimestamp(),
        totalSignalsReceived: 0,
        totalCopied: 0
      }, { merge: true });

      console.log("✅ Wallet registrada com sucesso!");
    } catch (error) {
      console.error("Erro ao registrar carteira:", error);
    }
  };

  useEffect(() => {
    if (walletAddress) {
      registerWallet(walletAddress);
    }
  }, [walletAddress]);

  return (
    <div>
      <Navbar />

      <section className="text-center py-12 px-4 md:px-10">
        <h1 className="text-5xl md:text-6xl font-bold text-blue-500 mb-4 animate-pulse">
          Global Dollar Signals
        </h1>
        <p className="text-gray-300 text-lg mb-6">
          Earn smarter. Follow the real winners.
        </p>
        <WalletButton />
      </section>

      <section className="py-8 px-4 md:px-10">
        <h2 className="text-2xl font-semibold mb-4 text-blue-400">📊 Live Signals</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <SignalCard />
          <SignalCard />
          <SignalCard />
        </div>
      </section>

      <section className="py-8 px-4 md:px-10">
        <h2 className="text-2xl font-semibold mb-4 text-green-400">🏆 Top Traders</h2>
        <TraderRanking />
      </section>
    </div>
  );
}
