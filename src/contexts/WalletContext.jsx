import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import {
  WalletModalProvider,
} from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import { clusterApiUrl } from "@solana/web3.js";
import "@solana/wallet-adapter-react-ui/styles.css";

const WalletContext = createContext();
export const useWalletContext = () => useContext(WalletContext);

export const WalletConnectionProvider = ({ children }) => {
  const endpoint = clusterApiUrl("mainnet-beta");
  const wallets = useMemo(() => [new PhantomWalletAdapter(), new SolflareWalletAdapter()], []);

  const [walletAddress, setWalletAddress] = useState(null);

  const { publicKey } = useWallet();

  useEffect(() => {
    if (publicKey) {
      const address = publicKey.toBase58();
      setWalletAddress(address);
      localStorage.setItem("walletAddress", address);
    } else {
      setWalletAddress(null);
      localStorage.removeItem("walletAddress");
    }
  }, [publicKey]);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <WalletContext.Provider value={{ walletAddress }}>
            {children}
          </WalletContext.Provider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
