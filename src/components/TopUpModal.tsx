import React, { useState } from 'react';
import { playClaimSound } from '../utils/audio';

interface TopUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentCoins: number;
  onAddCoins: (amount: number) => void;
}

export const TopUpModal: React.FC<TopUpModalProps> = ({
  isOpen,
  onClose,
  currentCoins,
  onAddCoins
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [promoSuccess, setPromoSuccess] = useState(false);

  if (!isOpen) return null;

  const packages = [
    { coins: 1500, bonus: '+150 Bonus', price: '$4.99', popular: false },
    { coins: 5000, bonus: '+750 Bonus', price: '$14.99', popular: true },
    { coins: 15000, bonus: '+3,000 Bonus', price: '$39.99', popular: false },
  ];

  const handlePurchase = (coins: number) => {
    playClaimSound();
    onAddCoins(coins);
    onClose();
  };

  const handleRedeem = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'CYBERZONE' || promoCode.trim().toUpperCase() === 'PLAYZONE') {
      playClaimSound();
      onAddCoins(2500);
      setPromoSuccess(true);
      setTimeout(() => {
        setPromoSuccess(false);
        setPromoCode('');
        onClose();
      }, 1200);
    } else {
      alert('Invalid code. Try "CYBERZONE" for +2,500 PlayCoins!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md bg-[#1a1b21] border border-white/15 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between bg-[#0d0e13]">
          <div className="flex items-center gap-2">
            <span className="text-xl">🪙</span>
            <div>
              <h2 className="font-headline-sm text-sm font-bold text-white uppercase tracking-wider">
                Vault PlayCoins Top-Up
              </h2>
              <span className="text-[11px] text-[#849495]">Current Balance: {currentCoins.toLocaleString()} PC</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-white/10 text-[#b9cacb] hover:text-white flex items-center justify-center text-xs"
          >
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>

        {/* Packages */}
        <div className="p-4 flex flex-col gap-3">
          <div className="grid grid-cols-3 gap-2">
            {packages.map((pkg, i) => (
              <button
                key={i}
                onClick={() => handlePurchase(pkg.coins)}
                className={`relative flex flex-col items-center justify-center p-3 rounded-xl border transition-all active:scale-95 ${
                  pkg.popular
                    ? 'bg-[#1e1f25] border-[#00f0ff] shadow-[0_0_12px_rgba(0,240,255,0.25)]'
                    : 'bg-[#121318] border-white/10 hover:border-white/20'
                }`}
              >
                {pkg.popular && (
                  <span className="absolute -top-2 bg-[#00f0ff] text-[#00363a] font-label-sm text-[9px] uppercase px-1.5 py-0.2 rounded font-bold">
                    HOT
                  </span>
                )}
                <span className="font-headline-sm text-base font-bold text-white mt-1">
                  {pkg.coins.toLocaleString()}
                </span>
                <span className="text-[9px] text-[#ddb7ff] font-bold mt-0.5">{pkg.bonus}</span>
                <span className="mt-2 px-2.5 py-1 rounded-full bg-[#292a2f] text-[11px] font-bold text-[#7df4ff]">
                  {pkg.price}
                </span>
              </button>
            ))}
          </div>

          {/* Promo code redemption */}
          <form onSubmit={handleRedeem} className="mt-2 p-3 bg-[#121318] rounded-xl border border-white/5 flex flex-col gap-2">
            <span className="text-[11px] text-[#849495] uppercase font-label-sm">
              Cyber Promo Code (Use &quot;CYBERZONE&quot;)
            </span>
            <div className="flex gap-2">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Enter promo code..."
                className="flex-1 px-3 py-1.5 rounded-lg bg-[#1e1f25] text-xs text-white uppercase tracking-wider outline-none border border-white/10 focus:border-[#00f0ff]"
              />
              <button
                type="submit"
                className="px-3 py-1.5 rounded-lg bg-[#6f00be] hover:bg-[#8c0053] text-white text-xs font-label-sm uppercase font-bold transition-all"
              >
                Redeem
              </button>
            </div>
            {promoSuccess && (
              <span className="text-xs text-emerald-400 font-bold">
                ✓ +2,500 PlayCoins Claimed to Vault!
              </span>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
