import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, CheckCircle2, Crown, Trophy, Medal, Award, Star, Gem, Gift, Coins, Banknote, Wallet } from 'lucide-react';
import { api } from '../services/api';
import howItWorksBg from '../../Images/how-it-works-background.png';

const themes = [
  {
    // 1st
    cardBg: 'linear-gradient(135deg, rgba(38, 22, 6, 0.82) 0%, rgba(18, 10, 2, 0.92) 100%)',
    borderClass: 'border-[#d4af37]/55 hover:border-[#f5cb5c]/90',
    glowShadow: 'shadow-[0_8px_28px_rgba(0,0,0,0.55),0_0_15px_rgba(212,175,55,0.2)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.65),0_0_24px_rgba(245,203,92,0.38)]',
    flareColor: '#f5a623',
    flareCenterColor: '#ffe58f',
    dividerColor: '#e5b32f',
    titleColor: '#ffe58f',
    icon: Crown
  },
  {
    // 2nd
    cardBg: 'linear-gradient(135deg, rgba(20, 20, 22, 0.82) 0%, rgba(10, 10, 12, 0.92) 100%)',
    borderClass: 'border-[#94a3b8]/55 hover:border-[#cbd5e1]/90',
    glowShadow: 'shadow-[0_8px_28px_rgba(0,0,0,0.55),0_0_15px_rgba(148,163,184,0.2)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.65),0_0_24px_rgba(203,213,225,0.38)]',
    flareColor: '#94a3b8',
    flareCenterColor: '#f8fafc',
    dividerColor: '#cbd5e1',
    titleColor: '#f1f5f9',
    icon: Trophy
  },
  {
    // 3rd
    cardBg: 'linear-gradient(135deg, rgba(38, 16, 5, 0.82) 0%, rgba(18, 7, 2, 0.92) 100%)',
    borderClass: 'border-[#d97706]/55 hover:border-[#f59e0b]/90',
    glowShadow: 'shadow-[0_8px_28px_rgba(0,0,0,0.55),0_0_15px_rgba(217,119,6,0.2)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.65),0_0_24px_rgba(245,158,11,0.38)]',
    flareColor: '#d97706',
    flareCenterColor: '#fde68a',
    dividerColor: '#f59e0b',
    titleColor: '#fcd34d',
    icon: Medal
  },
  {
    // 4th
    cardBg: 'linear-gradient(135deg, rgba(16, 4, 38, 0.82) 0%, rgba(7, 2, 18, 0.92) 100%)',
    borderClass: 'border-[#8b5cf6]/55 hover:border-[#a78bfa]/90',
    glowShadow: 'shadow-[0_8px_28px_rgba(0,0,0,0.55),0_0_15px_rgba(139,92,246,0.2)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.65),0_0_24px_rgba(167,139,250,0.38)]',
    flareColor: '#8b5cf6',
    flareCenterColor: '#ddd6fe',
    dividerColor: '#a78bfa',
    titleColor: '#c4b5fd',
    icon: Award
  },
  {
    // 5th
    cardBg: 'linear-gradient(135deg, rgba(4, 22, 54, 0.82) 0%, rgba(2, 10, 32, 0.92) 100%)',
    borderClass: 'border-[#3b82f6]/55 hover:border-[#60a5fa]/90',
    glowShadow: 'shadow-[0_8px_28px_rgba(0,0,0,0.55),0_0_15px_rgba(59,130,246,0.2)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.65),0_0_24px_rgba(96,165,250,0.38)]',
    flareColor: '#3b82f6',
    flareCenterColor: '#bfdbfe',
    dividerColor: '#60a5fa',
    titleColor: '#93c5fd',
    icon: Star
  },
  {
    // 6th
    cardBg: 'linear-gradient(135deg, rgba(6, 38, 22, 0.82) 0%, rgba(2, 18, 10, 0.92) 100%)',
    borderClass: 'border-[#10b981]/55 hover:border-[#34d399]/90',
    glowShadow: 'shadow-[0_8px_28px_rgba(0,0,0,0.55),0_0_15px_rgba(16,185,129,0.2)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.65),0_0_24px_rgba(52,211,153,0.38)]',
    flareColor: '#10b981',
    flareCenterColor: '#a7f3d0',
    dividerColor: '#34d399',
    titleColor: '#6ee7b7',
    icon: Gem
  },
  {
    // 7th
    cardBg: 'linear-gradient(135deg, rgba(38, 6, 22, 0.82) 0%, rgba(18, 2, 10, 0.92) 100%)',
    borderClass: 'border-[#f43f5e]/55 hover:border-[#fb7185]/90',
    glowShadow: 'shadow-[0_8px_28px_rgba(0,0,0,0.55),0_0_15px_rgba(244,63,94,0.2)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.65),0_0_24px_rgba(251,113,133,0.38)]',
    flareColor: '#f43f5e',
    flareCenterColor: '#fecdd3',
    dividerColor: '#fb7185',
    titleColor: '#fda4af',
    icon: Gift
  },
  {
    // 8th
    cardBg: 'linear-gradient(135deg, rgba(56, 22, 6, 0.82) 0%, rgba(28, 10, 2, 0.92) 100%)',
    borderClass: 'border-[#f59e0b]/55 hover:border-[#fbbf24]/90',
    glowShadow: 'shadow-[0_8px_28px_rgba(0,0,0,0.55),0_0_15px_rgba(245,158,11,0.2)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.65),0_0_24px_rgba(251,191,36,0.38)]',
    flareColor: '#f59e0b',
    flareCenterColor: '#fde68a',
    dividerColor: '#fbbf24',
    titleColor: '#fcd34d',
    icon: Coins
  },
  {
    // 9th
    cardBg: 'linear-gradient(135deg, rgba(6, 22, 56, 0.82) 0%, rgba(2, 10, 28, 0.92) 100%)',
    borderClass: 'border-[#06b6d4]/55 hover:border-[#22d3ee]/90',
    glowShadow: 'shadow-[0_8px_28px_rgba(0,0,0,0.55),0_0_15px_rgba(6,182,212,0.2)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.65),0_0_24px_rgba(34,211,238,0.38)]',
    flareColor: '#06b6d4',
    flareCenterColor: '#cffafe',
    dividerColor: '#22d3ee',
    titleColor: '#67e8f9',
    icon: Banknote
  },
  {
    // 10th
    cardBg: 'linear-gradient(135deg, rgba(32, 38, 6, 0.82) 0%, rgba(16, 18, 2, 0.92) 100%)',
    borderClass: 'border-[#84cc16]/55 hover:border-[#a3e635]/90',
    glowShadow: 'shadow-[0_8px_28px_rgba(0,0,0,0.55),0_0_15px_rgba(132,204,22,0.2)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.65),0_0_24px_rgba(163,230,53,0.38)]',
    flareColor: '#84cc16',
    flareCenterColor: '#ecfccb',
    dividerColor: '#a3e635',
    titleColor: '#bef264',
    icon: Wallet
  }
];

export default function Prizes() {
  const [prizes, setPrizes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPrizes() {
      try {
        setPrizes([
          { id: 1, amount: '₹1,00,000', description: 'Mega Jackpot Prize' },
          { id: 2, amount: '₹50,000', description: 'First Runner Up' },
          { id: 3, amount: '₹25,000', description: 'Second Runner Up' },
          { id: 4, amount: '₹10,000', description: 'Special Reward' },
          { id: 5, amount: '₹5,000', description: 'Diwali Star' },
          { id: 6, amount: '₹2,500', description: 'Lucky Winner' },
          { id: 7, amount: '₹1,000', description: 'SparkFest Pack' },
          { id: 8, amount: '₹500', description: 'Golden Ticket' },
          { id: 9, amount: '₹250', description: 'Silver Jubilee' },
          { id: 10, amount: '₹100', description: 'Bronze Reward' }
        ]);
      } catch (err) {
        console.error('Failed to load prizes:', err);
      } finally {
        setLoading(false);
      }
    }
    loadPrizes();
  }, []);

  return (
    <div
      className="relative min-h-screen w-full pt-28 pb-20 overflow-hidden"
      style={{
        backgroundImage: `url(${howItWorksBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="absolute inset-0 bg-[#060918]/80 backdrop-blur-[4px]"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1e143b] border border-[#e5b32f]/40 text-[#ffe58f] text-xs font-semibold tracking-wider uppercase shadow-[0_0_15px_rgba(229,179,47,0.3)]">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Festive Reward Pool</span>
          </div>
          <h1 className="font-serif italic font-extrabold text-4xl sm:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-b from-[#ffe58f] via-[#f5c64c] to-[#d4af37] tracking-wider drop-shadow-[0_4px_12px_rgba(0,0,0,0.95)]" style={{ WebkitTextStroke: '1px rgba(229,179,47,0.2)' }}>
            Grand Prizes & Rewards
          </h1>
          <div className="relative mt-6 max-w-3xl mx-auto p-[1.5px] rounded-2xl bg-gradient-to-r from-transparent via-[#f5c64c]/40 to-transparent">
            <div className="bg-[#10071c]/90 backdrop-blur-xl px-6 py-4 rounded-2xl shadow-[0_0_30px_rgba(245,198,76,0.15)]">
              <p className="font-sans text-[15.5px] sm:text-[17px] md:text-[19px] text-[#fcf8f0]/95 font-medium tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] leading-relaxed">
                Experience the ultimate festive thrill! Over <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffe58f] via-[#f5c64c] to-[#d4af37] font-extrabold text-[18px] sm:text-[22px] md:text-[24px] drop-shadow-[0_0_12px_rgba(245,198,76,0.6)]">₹1,00,000+</span> in certified luxury gifts and exclusive rewards are waiting to be claimed this Diwali.
              </p>
            </div>
          </div>
        </div>

        {/* Prize Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {prizes.map((prize, idx) => {
            const isFirst = idx === 0;
            const theme = themes[idx % 10];
            const Icon = theme.icon;

            return (
              <div
                key={prize.id}
                className={`group relative w-full rounded-2xl p-6 flex flex-col items-center justify-start text-center transition-all duration-300 ease-out hover:-translate-y-2 cursor-pointer overflow-hidden border backdrop-blur-md h-full ${theme.borderClass} ${theme.glowShadow}`}
                style={{
                  background: theme.cardBg,
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)'
                }}
              >
                <div className="absolute top-0 inset-x-4 h-[1.5px] bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/[0.08] to-transparent pointer-events-none" />

                <div
                  className="absolute -bottom-[2px] left-1/2 -translate-x-1/2 w-28 sm:w-36 h-3.5 rounded-full blur-[8px] pointer-events-none opacity-90 group-hover:opacity-100 group-hover:scale-x-120 group-hover:w-44 transition-all duration-300"
                  style={{ backgroundColor: theme.flareColor }}
                />
                <div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 sm:w-20 h-[2px] rounded-full pointer-events-none opacity-95 group-hover:w-28 transition-all duration-300"
                  style={{
                    backgroundColor: theme.flareCenterColor,
                    boxShadow: `0 0 14px 3px ${theme.flareColor}`
                  }}
                />

                {isFirst && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-gradient-to-r from-[#ffe58f] to-[#e5b32f] text-[#0b0d1e] shadow-[0_0_15px_rgba(229,179,47,0.8)] z-10 whitespace-nowrap">
                    ★ Grand Jackpot ★
                  </span>
                )}

                {/* Rank Badge */}
                <div className="absolute top-3 right-3 font-mono text-[10px] font-extrabold px-2 py-0.5 rounded opacity-80 backdrop-blur-sm"
                  style={{ color: theme.titleColor, border: `1px solid ${theme.dividerColor}40`, backgroundColor: `${theme.flareColor}20` }}>
                  RANK #{idx + 1}
                </div>

                <div className="relative z-10 w-20 h-20 mt-4 mb-5 flex items-center justify-center rounded-full group-hover:scale-110 transition-transform duration-300 ease-out"
                  style={{ border: `1.5px solid ${theme.dividerColor}60`, backgroundColor: `${theme.flareColor}15`, boxShadow: `0 0 25px ${theme.flareColor}40` }}>
                  <Icon className="w-10 h-10" style={{ color: theme.titleColor, filter: `drop-shadow(0 0 12px ${theme.flareColor})` }} />
                </div>

                <h3 className="font-serif italic font-bold text-[26px] sm:text-[30px] leading-tight tracking-wider drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] z-10 text-center px-2"
                  style={{ color: theme.flareCenterColor }}>
                  {prize.amount}
                </h3>

                <div className="flex items-center justify-center gap-1.5 w-full my-4 z-10 select-none">
                  <div className="h-[1.5px] w-8" style={{ background: `linear-gradient(to right, transparent, ${theme.dividerColor})` }} />
                  <div className="w-1.5 h-1.5 rotate-45 border-[1px]" style={{ borderColor: theme.dividerColor, backgroundColor: theme.dividerColor, boxShadow: `0 0 8px ${theme.dividerColor}` }} />
                  <div className="h-[1.5px] w-8" style={{ background: `linear-gradient(to left, transparent, ${theme.dividerColor})` }} />
                </div>

                <p className="font-sans text-[13px] text-white/90 leading-relaxed max-w-[280px] z-10 px-2 pb-2">
                  {prize.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bonus Information */}
        <div className="mt-16 relative group/rules">
          {/* Outer glow ring */}
          <div className="absolute -inset-[1.5px] rounded-3xl bg-gradient-to-r from-[#d4af37]/60 via-[#ffe58f]/40 to-[#d4af37]/60 opacity-70 blur-[2px] pointer-events-none" />

          {/* Glass card */}
          <div className="relative rounded-3xl overflow-hidden border border-[#f5c64c]/30 shadow-[0_12px_48px_rgba(0,0,0,0.6),0_0_30px_rgba(212,175,55,0.15)] backdrop-blur-xl"
            style={{ background: 'linear-gradient(135deg, rgba(14,12,36,0.92) 0%, rgba(10,9,28,0.96) 50%, rgba(18,14,40,0.92) 100%)' }}>

            {/* Top sheen line */}
            <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#f5c64c]/60 to-transparent pointer-events-none" />
            {/* Hover shimmer sweep */}
            <div className="absolute inset-0 -translate-x-full group-hover/rules:translate-x-full transition-transform duration-[1200ms] ease-in-out bg-gradient-to-r from-transparent via-white/[0.06] to-transparent pointer-events-none" />
            {/* Radial ambient glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[70%] h-[120px] bg-[radial-gradient(ellipse_at_center,rgba(245,198,76,0.12)_0%,transparent_70%)] pointer-events-none" />

            <div className="relative z-10 p-8 sm:p-10">
              {/* Heading block */}
              <div className="flex flex-col items-center text-center mb-8">
                {/* Diamond ornament row */}
                <div className="flex items-center gap-3 mb-4 select-none">
                  <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#d4af37]/70" />
                  <div className="w-2 h-2 rotate-45 bg-[#f5c64c] shadow-[0_0_10px_rgba(245,198,76,0.9)]" />
                  <div className="w-1.5 h-1.5 rotate-45 border border-[#f5c64c]/60" />
                  <div className="w-2 h-2 rotate-45 bg-[#f5c64c] shadow-[0_0_10px_rgba(245,198,76,0.9)]" />
                  <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#d4af37]/70" />
                </div>

                <h3 className="font-serif italic text-2xl sm:text-3xl font-extrabold tracking-wide drop-shadow-[0_2px_16px_rgba(0,0,0,0.9)]">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fff7cc] via-[#f5c64c] to-[#c8922e]">
                    Prize Distribution
                  </span>
                  <span className="text-white/50 mx-2 font-light not-italic">&amp;</span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c8922e] via-[#f5c64c] to-[#fff7cc]">
                    Claiming Rules
                  </span>
                </h3>

                <div className="mt-3 h-[1px] w-40 bg-gradient-to-r from-transparent via-[#f5c64c]/50 to-transparent" />
              </div>

              {/* Rules grid */}
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  'Winners must provide government-recognized ID (Aadhaar/PAN) for delivery verification of physical premium gifts.',
                  'All prize amounts are strictly non-refundable. Once a winning ticket is confirmed and verified, the awarded prize value is final and cannot be cancelled, exchanged, or transferred under any circumstances.',
                  'All premium gift deliveries are fully insured and handled safely by our certified logistics partners.',
                  'Winner notifications and secure delivery tracking links are sent instantly via SMS upon draw completion.'
                ].map((rule, i) => (
                  <li key={i}
                    className="flex items-start gap-3.5 p-4 rounded-2xl border border-[#f5c64c]/12 hover:border-[#f5c64c]/30 transition-colors duration-300"
                    style={{ background: 'rgba(245,198,76,0.04)' }}>
                    <div className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5"
                      style={{ background: 'rgba(245,198,76,0.12)', boxShadow: '0 0 12px rgba(245,198,76,0.3)' }}>
                      <CheckCircle2 className="w-4 h-4 text-[#f5c64c] drop-shadow-[0_0_8px_rgba(245,198,76,0.8)]" />
                    </div>
                    <span className="font-sans text-[13px] sm:text-[14px] text-white/85 leading-relaxed tracking-wide">{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bottom sheen line */}
            <div className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#f5c64c]/30 to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

