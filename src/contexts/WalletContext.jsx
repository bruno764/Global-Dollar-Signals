import React, {
  useMemo,
  useCallback,
  useEffect,
  useState,
  createContext,
  useContext,
} from "react";
import {
  ConnectionProvider,
  WalletProvider,
  useWallet,
} from "@solana/wallet-adapter-react";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import {
  WalletModalProvider,
} from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import "@solana/wallet-adapter-react-ui/styles.css";

const WalletContext = createContext();

export const useWalletContext = () => useContext(WalletContext);

export const WalletConnectionProvider = ({ children }) => {
  const endpoint = clusterApiUrl("mainnet-beta");
  const wallets = useMemo(
    () => [new PhantomWalletAdapter(), new SolflareWalletAdapter()],
    []
  );

  const [walletAddress, setWalletAddress] = useState(null);
  const [walletInstance, setWalletInstance] = useState(null);

  const onConnect = useCallback((publicKey) => {
    const base58 = publicKey?.toBase58();
    setWalletAddress(base58);
    localStorage.setItem("walletAddress", base58);
  }, []);

  const onDisconnect = () => {
    setWalletAddress(null);
    localStorage.removeItem("walletAddress");
  };

  const connectWallet = async () => {
    try {
      if (walletInstance && walletInstance.connect) {
        await walletInstance.connect();
      }
    } catch (err) {
      console.error("Erro ao conectar carteira:", err);
    }
  };

  useEffect(() => {
    const stored = localStorage.getItem("walletAddress");
    if (stored) setWalletAddress(stored);
  }, []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider
        wallets={wallets}
        autoConnect
        onConnect={(wallet) => {
          onConnect(wallet.publicKey);
        }}
        onDisconnect={onDisconnect}
      >
        <WalletModalProvider>
          <WalletContext.Provider
            value={{ walletAddress, connectWallet }}
          >
            {children}
          </WalletContext.Provider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
