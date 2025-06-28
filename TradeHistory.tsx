import React, { useState } from 'react';
import { Clock, CheckCircle, XCircle, ExternalLink, Copy, Loader2 } from 'lucide-react';
import { Trade } from '../types';
import { useWallet } from '../hooks/useWallet';

interface TradeHistoryProps {
  trades: Trade[];
  onCompleteTrade: (tradeId: string) => void;
  onCancelTrade: (tradeId: string) => void;
}

export const TradeHistory: React.FC<TradeHistoryProps> = ({ 
  trades, 
  onCompleteTrade, 
  onCancelTrade 
}) => {
  const [completingTrades, setCompletingTrades] = useState<Set<string>>(new Set());
  const [cancellingTrades, setCancellingTrades] = useState<Set<string>>(new Set());
  const { account } = useWallet();

  const getStatusIcon = (status: Trade['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-500" />;
    }
  };

  const getStatusColor = (status: Trade['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  };

  const handleCompleteTrade = async (tradeId: string) => {
    if (!account) return;
    
    setCompletingTrades(prev => new Set(prev).add(tradeId));
    
    // Simulate blockchain transaction delay
    setTimeout(() => {
      onCompleteTrade(tradeId);
      setCompletingTrades(prev => {
        const newSet = new Set(prev);
        newSet.delete(tradeId);
        return newSet;
      });
    }, 2000);
  };

  const handleCancelTrade = async (tradeId: string) => {
    if (!account) return;
    
    setCancellingTrades(prev => new Set(prev).add(tradeId));
    
    // Simulate blockchain transaction delay
    setTimeout(() => {
      onCancelTrade(tradeId);
      setCancellingTrades(prev => {
        const newSet = new Set(prev);
        newSet.delete(tradeId);
        return newSet;
      });
    }, 1500);
  };

  const canInteractWithTrade = (trade: Trade) => {
    return account && (
      trade.creator.toLowerCase() === account.toLowerCase() ||
      (trade.counterparty && trade.counterparty.toLowerCase() === account.toLowerCase())
    );
  };

  if (trades.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Trade History</h3>
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock className="w-12 h-12 text-gray-400" />
          </div>
          <p className="text-gray-600">No trades yet. Create your first escrow trade above!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Trade History</h3>
      
      <div className="space-y-4">
        {trades.map((trade) => (
          <div
            key={trade.id}
            className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-200 hover:border-gray-300"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                {getStatusIcon(trade.status)}
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-gray-900">
                      {trade.fromAmount} {trade.fromToken}
                    </span>
                    <span className="text-gray-400">→</span>
                    <span className="font-semibold text-gray-900">
                      {trade.toAmount} {trade.toToken}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Created {trade.createdAt.toLocaleDateString()} at{' '}
                    {trade.createdAt.toLocaleTimeString()}
                  </p>
                </div>
              </div>
              
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                  trade.status
                )}`}
              >
                {trade.status.charAt(0).toUpperCase() + trade.status.slice(1)}
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Escrow Address:</span>
                <div className="flex items-center space-x-2">
                  <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                    {trade.escrowAddress.slice(0, 6)}...{trade.escrowAddress.slice(-4)}
                  </code>
                  <button
                    onClick={() => copyToClipboard(trade.escrowAddress)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                    title="Copy address"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button 
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                    title="View on explorer"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Creator:</span>
                <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                  {trade.creator.slice(0, 6)}...{trade.creator.slice(-4)}
                </code>
              </div>

              {trade.counterparty && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Counterparty:</span>
                  <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                    {trade.counterparty.slice(0, 6)}...{trade.counterparty.slice(-4)}
                  </code>
                </div>
              )}
            </div>

            {trade.status === 'pending' && canInteractWithTrade(trade) && (
              <div className="mt-4 flex space-x-2">
                <button
                  onClick={() => handleCompleteTrade(trade.id)}
                  disabled={completingTrades.has(trade.id) || cancellingTrades.has(trade.id)}
                  className="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors text-sm font-medium flex items-center justify-center space-x-2"
                >
                  {completingTrades.has(trade.id) ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Completing...</span>
                    </>
                  ) : (
                    <span>Complete Trade</span>
                  )}
                </button>
                <button
                  onClick={() => handleCancelTrade(trade.id)}
                  disabled={completingTrades.has(trade.id) || cancellingTrades.has(trade.id)}
                  className="flex-1 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors text-sm font-medium flex items-center justify-center space-x-2"
                >
                  {cancellingTrades.has(trade.id) ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Cancelling...</span>
                    </>
                  ) : (
                    <span>Cancel Trade</span>
                  )}
                </button>
              </div>
            )}

            {trade.status === 'pending' && !canInteractWithTrade(trade) && account && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-700">
                  Only the trade creator or counterparty can complete or cancel this trade.
                </p>
              </div>
            )}

            {trade.status === 'pending' && !account && (
              <div className="mt-4 p-3 bg-orange-50 rounded-lg">
                <p className="text-sm text-orange-700">
                  Connect your wallet to interact with trades.
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};