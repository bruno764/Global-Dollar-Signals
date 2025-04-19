import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useWalletContext } from '../contexts/WalletContext';
import { db } from '../firebase/firebaseConfig';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';

export default function Dashboard() {
  const { walletAddress } = useWalletContext();
  const [user, setUser] = useState(null);
  const [signals, setSignals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [roi, setRoi] = useState(0);
  const [referrals, setReferrals] = useState(0);
  const [isPremium, setIsPremium] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  const navigate = useNavigate();

  // Monitorar estado de autenticação
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setCheckingAuth(false);
    });
    return () => unsubscribe();
  }, []);

  // Proteção de rota
  useEffect(() => {
    if (!checkingAuth && (!user || !walletAddress)) {
      navigate('/login');
    }
  }, [user, walletAddress, checkingAuth]);

  // Buscar sinais
  const fetchSignals = async () => {
    if (!walletAddress) return;

    try {
      const q = query(collection(db, "signals"), where("walletOrigin", "==", walletAddress));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => doc.data());

      setSignals(data);
      simulateROI(data);
    } catch (error) {
      console.error("Erro ao buscar sinais:", error);
    } finally {
      setLoading(false);
    }
  };

  // Buscar referidos
  const fetchReferrals = async () => {
    if (!walletAddress) return;

    try {
      const q = query(collection(db, "wallets"), where("referral", "==", walletAddress));
      const snapshot = await getDocs(q);
      setReferrals(snapshot.docs.length);
    } catch (error) {
      console.error("Erro ao buscar referidos:", error);
    }
  };

  // Verificar plano premium
  const checkPremiumStatus = async () => {
    if (!user) return;
    try {
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setIsPremium(docSnap.data().isPremium || false);
      }
    } catch (error) {
      console.error("Erro ao verificar premium:", error);
    }
  };

  // Simular ROI
  const simulateROI = (data) => {
    let total = 0;
    data.forEach(signal => {
      const variation = Math.random() * 0.3 - 0.1;
      total += signal.volume * variation;
    });
    const bonus = referrals * 0.1;
    setRoi((total + bonus).toFixed(2));
  };

  useEffect(() => {
    if (walletAddress) {
      fetchSignals();
      fetchReferrals();
    }
    if (user) {
      checkPremiumStatus();
    }
  }, [walletAddress, user]);

  // Prevenção de render prematuro
  if (checkingAuth) {
    return <div className="text-white p-8">Checking authentication...</div>;
  }

  return (
    <div className="p-8 text-white">
      <h1 className="text-3xl font-bold text-blue-400 mb-4">📊 Dashboard</h1>
      {walletAddress ? (
        <>
          {!isPremium && (
            <div className="bg-yellow-800 text-yellow-200 p-4 rounded mb-6">
              🚫 You are on a free plan. Upgrade to access premium features.
            </div>
          )}
          <p className="mb-4 text-lg">
            🔐 Connected wallet: <span className="text-green-400">{walletAddress}</span>
          </p>
          <p className="mb-2 text-lg">
            💰 Simulated ROI: <span className={roi >= 0 ? "text-green-400" : "text-red-400"}>{roi} SOL</span>
          </p>
          <p className="mb-6 text-md text-yellow-300">
            🔗 Referrals: {referrals} (+{(referrals * 0.1).toFixed(2)} SOL bonus)
          </p>

          <h2 className="text-2xl font-semibold text-yellow-400 mt-6 mb-2">📥 Signals received</h2>
          {loading ? (
            <p>Loading signals...</p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {signals.map((signal, index) => (
                <div key={index} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <p><strong>Token:</strong> <span className="text-blue-300">{signal.token}</span></p>
                  <p><strong>Volume:</strong> {signal.volume} SOL</p>
                  <p><strong>Status:</strong> {signal.status}</p>
                  <p className="text-sm text-gray-400">Wallet: {signal.walletOrigin}</p>
                </div>
              ))}
              {signals.length === 0 && <p className="text-gray-400">No signals found for this wallet.</p>}
            </div>
          )}
        </>
      ) : (
        <p className="text-gray-300">Connect your wallet to access your dashboard.</p>
      )}
    </div>
  );
}
