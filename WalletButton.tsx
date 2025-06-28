import React from 'react';
import { Wallet, ExternalLink, LogOut } from 'lucide-react';
import { useWallet } from '../hooks/useWallet';

export const WalletButton: React.FC = () => {
  const { 
    account, 
    isConnecting, 
    error, 
    connectWallet, 
    disconnectWallet, 
    formatAddress, 
    isMetaMaskInstalled 
  } = useWallet();

  if (!isMetaMaskInstalled) {
    return (
      <a
        href="https://metamask.io/download/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-2 rounded-lg hover:from-orange-600 hover:to-red-700 transition-all duration-200 transform hover:scale-105"
      >
        <ExternalLink className="w-4 h-4" />
        <span>Install MetaMask</span>
      </a>
    );
  }

  if (account) {
    return (
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-lg">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="font-medium">{formatAddress(account)}</span>
        </div>
        <button
          onClick={disconnectWallet}
          className="flex items-center justify-center w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          title="Disconnect Wallet"
        >
          <LogOut className="w-4 h-4 text-gray-600" />
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-end">
      <button
        onClick={connectWallet}
        disabled={isConnecting}
        className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100"
      >
        <Wallet className="w-4 h-4" />
        <span>{isConnecting ? 'Connecting...' : 'Connect Wallet'}</span>
      </button>
      {error && (
        <p className="text-red-600 text-sm mt-2 max-w-xs text-right">{error}</p>
      )}
    </div>
  );
};