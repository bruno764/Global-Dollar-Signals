// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../firebase/firebaseConfig';
import { useWalletContext } from '../contexts/WalletContext';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { walletAddress } = useWalletContext();
  const navigate = useNavigate();

  const waitForWallet = async () => {
    let tries = 0;
    while (!walletAddress && tries < 10) {
      await new Promise((res) => setTimeout(res, 200));
      tries++;
    }
  };

  const handleLoginOrRegister = async () => {
    try {
      // 1. Autenticar ou registrar
      let userCredential;
      try {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      } catch (loginError) {
        if (loginError.code === 'auth/user-not-found') {
          userCredential = await createUserWithEmailAndPassword(auth, email, password);
        } else {
          throw loginError;
        }
      }

      // 2. Esperar pela walletAddress sincronizar
      await waitForWallet();

      if (!walletAddress) {
        alert('Please connect your wallet before continuing.');
        return;
      }

      const uid = userCredential.user.uid;

      // 3. Salvar no Firestore
      await setDoc(doc(db, 'users', uid), {
        email,
        wallet: walletAddress,
        createdAt: serverTimestamp(),
        isPremium: false
      }, { merge: true });

      navigate('/dashboard');
    } catch (error) {
      alert('Erro ao autenticar: ' + error.message);
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-8">
      <div className="w-full max-w-md bg-gray-900 rounded-xl p-6 shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">🔐 Login to Global Dollar Signals</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-3 rounded bg-gray-800 text-white outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-3 rounded bg-gray-800 text-white outline-none"
        />

        <div className="flex justify-center mb-4">
          <WalletMultiButton className="bg-purple-700 hover:bg-purple-800 rounded-lg px-4 py-2 text-white" />
        </div>

        <button
          onClick={handleLoginOrRegister}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded"
        >
          🔑 Sign In / Register
        </button>

        {walletAddress && (
          <p className="text-sm text-green-400 mt-3 text-center">
            ✅ Wallet connected: {walletAddress}
          </p>
        )}
      </div>
    </div>
  );
}
