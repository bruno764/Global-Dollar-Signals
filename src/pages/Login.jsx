import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../firebase/firebaseConfig';
import { useWalletContext } from '../contexts/WalletContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { walletAddress, connectWallet } = useWalletContext();
  const navigate = useNavigate();

  const handleLoginOrRegister = async () => {
    try {
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

      const uid = userCredential.user.uid;

      // Aguarda até 1 segundo para garantir que o walletAddress foi sincronizado
      let attempts = 0;
      while (!walletAddress && attempts < 5) {
        await new Promise((res) => setTimeout(res, 200));
        attempts++;
      }

      if (!walletAddress) {
        alert('Please connect your wallet before continuing.');
        return;
      }

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
