import React from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export default function WalletButton() {
  return (
    <div className="flex justify-center my-6">
      <WalletMultiButton className="!bg-blue-600 hover:!bg-blue-700 transition-all !text-white !rounded-xl !px-6 !py-3 !shadow-xl" />
    </div>
  );
}
