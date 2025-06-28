import React, { useState } from 'react';
import { ArrowDownUp, Lock, Clock, AlertCircle } from 'lucide-react';
import { TokenSelect } from './TokenSelect';
import { Token, Trade } from '../types';
import { useWallet } from '../hooks/useWallet';

interface EscrowFormProps {
  tokens: Token[];
  onCreateEscrow: (trade: Omit<Trade, 'id' | 'createdAt'>) => void;
}

export const EscrowForm: React.FC<EscrowFormProps> = ({ tokens, onCreateEscrow }) => {
  const [fromToken, setFromToken] = useState('BTC');
  const [toToken, setToToken] = useState('ETH');
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [counterparty, setCounterparty] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const { account } = useWallet();

  const handleSwap = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fromAmount || !toAmount || !account) return;

    setIsCreating(true);
    
    // Simulate escrow creation delay
    setTimeout(() => {
      const escrowAddress = `0x${Math.random().toString(16).substr(2, 40)}`;
      
      onCreateEscrow({
        fromToken,
        toToken,
        fromAmount: parseFloat(fromAmount),
        toAmount: parseFloat(toAmount),
        status: 'pending',
        counterparty: counterparty || undefined,
        escrowAddress,
        creator: account
      });

      // Reset form
      setFromAmount('');
      setToAmount('');
      setCounterparty('');
      setIsCreating(false);
    }, 2000);
  };

  if (!account) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
        <div className="flex items-center space-x-3 mb-6">
          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
            <Lock className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Create Escrow Trade</h2>
            <p className="text-gray-600">Secure peer-to-peer token exchange</p>
          </div>
        </div>

        <div className="text-center py-12">
          <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-12 h-12 text-orange-500" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Wallet Connection Required</h3>
          <p className="text-gray-600 mb-6">Please connect your MetaMask wallet to create escrow trades</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
          <Lock className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Create Escrow Trade</h2>
          <p className="text-gray-600">Secure peer-to-peer token exchange</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <TokenSelect
            selectedToken={fromToken}
            onTokenChange={setFromToken}
            tokens={tokens}
            label="You Send"
          />
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Amount</label>
            <input
              type="number"
              value={fromAmount}
              onChange={(e) => setFromAmount(e.target.value)}
              placeholder="0.00"
              step="0.000001"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleSwap}
            className="flex items-center justify-center w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
          >
            <ArrowDownUp className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="space-y-4">
          <TokenSelect
            selectedToken={toToken}
            onTokenChange={setToToken}
            tokens={tokens}
            label="You Receive"
          />
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Amount</label>
            <input
              type="number"
              value={toAmount}
              onChange={(e) => setToAmount(e.target.value)}
              placeholder="0.00"
              step="0.000001"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Counterparty Address (Optional)
          </label>
          <input
            type="text"
            value={counterparty}
            onChange={(e) => setCounterparty(e.target.value)}
            placeholder="0x... or leave empty for public trade"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <button
          type="submit"
          disabled={!fromAmount || !toAmount || isCreating}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] disabled:hover:scale-100"
        >
          {isCreating ? (
            <div className="flex items-center justify-center space-x-2">
              <Clock className="w-5 h-5 animate-spin" />
              <span>Creating Escrow...</span>
            </div>
          ) : (
            'Create Escrow Trade'
          )}
        </button>
      </form>
    </div>
  );
};