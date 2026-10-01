import React, { useState, useEffect } from 'react';
import {
  Sparkles, CheckCircle2, Trophy, Crown, Gift, Star,
  Medal, Award, Gem, Coins, Banknote, Wallet
} from 'lucide-react';
import howItWorksBg from '../../Images/how-it-works-background.png';

const themes = [
  {
    id: 11,
    rank: 'SPECIAL',
    title: 'Festival Special',
    amount: 'Smart Entertainment Suite',
    description: 'Win a premium Smartwatch & Wireless Earbuds combo, plus ₹10,000! Celebrate Diwali with exciting tech rewards and a chance to win big.',
    color: '#f5c64c',
    glow: 'rgba(245, 198, 76, 0.5)',
    bg: 'rgba(80, 10, 20, 0.35)',
    border: 'rgba(245, 198, 76, 0.35)',
    icon: Gift
  },
  {
    id: 12,
    rank: 'BONUS',
    title: 'Early Bird Bonus',
    amount: 'Smart Home & premium gift',
    description: 'Take home an Alexa Smart Speaker along with ₹10,000! Be an early bird and secure your chance to win these amazing rewards this Diwali.',
    color: '#f5c64c',
    glow: 'rgba(245, 198, 76, 0.5)',
    bg: 'rgba(10, 60, 30, 0.35)',
    border: 'rgba(245, 198, 76, 0.35)',
    icon: Star
  },
  {
    id: 1,
    rank: '01',
    title: 'Grand Bumper',
    amount: '₹10,000',
    description: 'Claim the ultimate grand bumper prize of ₹10,000 in gifts! Make this Diwali truly unforgettable with our most exclusive cracker and festival offer.',
    color: '#f5c64c',
    glow: 'rgba(245, 198, 76, 0.5)',
    bg: 'rgba(245, 198, 76, 0.03)',
    border: 'rgba(245, 198, 76, 0.25)',
    icon: Trophy
  },
  {
    id: 2,
    rank: '02',
    title: 'Mega Bumper',
    amount: '₹9,500',
    description: 'Win a spectacular ₹9,500 worth of premium crackers. Light up your celebrations with our special secondary reward.',
    color: '#3b82f6',
    glow: 'rgba(59, 130, 246, 0.5)',
    bg: 'rgba(59, 130, 246, 0.03)',
    border: 'rgba(59, 130, 246, 0.25)',
    icon: Crown
  },
  {
    id: 3,
    rank: '03',
    title: 'Super Bumper',
    amount: '₹9,000',
    description: 'Get a dazzling ₹9,000 cracker package. Bring home the joy and brightness of Diwali with this fantastic prize.',
    color: '#f97316',
    glow: 'rgba(249, 115, 22, 0.5)',
    bg: 'rgba(249, 115, 22, 0.03)',
    border: 'rgba(249, 115, 22, 0.25)',
    icon: Gift
  },
  {
    id: 4,
    rank: '04',
    title: 'Festive Reward',
    amount: '₹8,500',
    description: 'Enjoy a wonderful ₹8,500 assortment of Diwali crackers. Make your festival of lights extra special with this gift.',
    color: '#a855f7',
    glow: 'rgba(168, 85, 247, 0.5)',
    bg: 'rgba(168, 85, 247, 0.03)',
    border: 'rgba(168, 85, 247, 0.25)',
    icon: Medal
  },
  {
    id: 5,
    rank: '05',
    title: 'Lucky Winner',
    amount: '₹8,000',
    description: 'Take home ₹8,000 in exclusive firecrackers. A perfect addition to your grand Diwali celebration.',
    color: '#10b981',
    glow: 'rgba(16, 185, 129, 0.5)',
    bg: 'rgba(16, 185, 129, 0.03)',
    border: 'rgba(16, 185, 129, 0.25)',
    icon: Star
  },
  {
    id: 6,
    rank: '06',
    title: 'Sparkle Prize',
    amount: '₹7,500',
    description: 'Win ₹7,500 worth of beautiful sparklers and crackers to illuminate your festival nights.',
    color: '#ec4899',
    glow: 'rgba(236, 72, 153, 0.5)',
    bg: 'rgba(236, 72, 153, 0.03)',
    border: 'rgba(236, 72, 153, 0.25)',
    icon: Sparkles
  },
  {
    id: 7,
    rank: '07',
    title: 'Joyful Gift',
    amount: '₹7,000',
    description: 'Claim your ₹7,000 cracker gift pack. Spread the happiness and light this Diwali season with premium fireworks.',
    color: '#06b6d4',
    glow: 'rgba(6, 182, 212, 0.5)',
    bg: 'rgba(6, 182, 212, 0.03)',
    border: 'rgba(6, 182, 212, 0.25)',
    icon: Gem
  },
  {
    id: 8,
    rank: '08',
    title: 'Bright Reward',
    amount: '₹6,500',
    description: 'A fantastic ₹6,500 cracker hamper awaits. Celebrate the triumph of light with joy and spectacular displays.',
    color: '#ef4444',
    glow: 'rgba(239, 68, 68, 0.5)',
    bg: 'rgba(239, 68, 68, 0.03)',
    border: 'rgba(239, 68, 68, 0.25)',
    icon: Award
  },
  {
    id: 9,
    rank: '09',
    title: 'Diwali Special',
    amount: '₹6,000',
    description: 'Win a special ₹6,000 assortment of festive crackers. Make every moment sparkle with our handpicked selections.',
    color: '#6366f1',
    glow: 'rgba(99, 102, 241, 0.5)',
    bg: 'rgba(99, 102, 241, 0.03)',
    border: 'rgba(99, 102, 241, 0.25)',
    icon: Coins
  },
  {
    id: 10,
    rank: '10',
    title: 'Festival Bonus',
    amount: '₹5,500',
    description: 'Get a wonderful ₹5,500 bonus in Diwali crackers to complete your festive celebrations with a bang.',
    color: '#eab308',
    glow: 'rgba(234, 179, 8, 0.5)',
    bg: 'rgba(234, 179, 8, 0.03)',
    border: 'rgba(234, 179, 8, 0.25)',
    icon: Banknote
  }
];

export default function Prizes() {
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
      <style>
        {`
          @keyframes fadeUpEntrance {
            from { opacity: 0; transform: translateY(60px) scale(0.95); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }
          @keyframes floatIcon {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            25% { transform: translateY(-3px) rotate(3deg); }
            75% { transform: translateY(-3px) rotate(-3deg); }
          }
          @keyframes glowPulse {
            0%, 100% { opacity: 0.8; }
            50% { opacity: 1; transform: scale(1.1); }
          }
          @keyframes sweepHover {
            0% { transform: translateX(-100%) skewX(-15deg); }
            100% { transform: translateX(200%) skewX(-15deg); }
          }
          .animate-fadeUp {
            animation: fadeUpEntrance 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
          }
          .icon-float {
            animation: floatIcon 4s ease-in-out infinite;
          }
        `}
      </style>

      <div className="absolute inset-0 bg-[#060918]/80 backdrop-blur-[4px]"></div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16 animate-fadeUp" style={{ animationDelay: '100ms' }}>
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
                Experience the ultimate festive thrill! Over <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffe58f] via-[#f5c64c] to-[#d4af37] font-extrabold text-[18px] sm:text-[22px] md:text-[24px] drop-shadow-[0_0_12px_rgba(245,198,76,0.6)]">₹1,00,000+</span> in cracker hampers and exclusive rewards are waiting to be claimed this Diwali.
              </p>
            </div>
          </div>
        </div>

        {/* Prize Cards Flex Grid - 4 per row */}
        <div className="flex flex-wrap justify-center gap-6">
          {themes.map((prize, idx) => {
            const Icon = prize.icon;
            // Delay increases for each card to create a wave effect
            const entranceDelay = 200 + (idx * 100);

            return (
              <div
                key={prize.id}
                className="animate-fadeUp group relative rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-start text-center transition-all duration-500 ease-out hover:-translate-y-4 hover:scale-[1.02] backdrop-blur-md overflow-hidden w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]"
                style={{
                  backgroundColor: prize.bg,
                  borderColor: prize.border,
                  borderWidth: '1px',
                  boxShadow: `0 8px 32px 0 rgba(0,0,0,0.4), inset 0 0 20px 0 ${prize.bg}`,
                  animationDelay: `${entranceDelay}ms`
                }}
              >
                {/* Sweep Hover Effect */}
                <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div
                    className="absolute inset-0 w-[150%] h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-[-15deg] group-hover:animate-[sweepHover_1.5s_ease-in-out_infinite]"
                  />
                </div>

                {/* Top Right Rank Badge */}
                <div
                  className="absolute top-3 right-3 text-[10px] font-mono font-bold tracking-widest px-2 py-0.5 rounded border transition-colors duration-300"
                  style={{
                    color: prize.color,
                    borderColor: prize.border,
                    backgroundColor: prize.bg,
                    boxShadow: `0 0 10px ${prize.glow}`
                  }}
                >
                  RANK {prize.rank}
                </div>

                {/* Glowing Bottom Bar */}
                <div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[40%] h-[4px] rounded-t-full transition-all duration-500 group-hover:w-[75%]"
                  style={{
                    backgroundColor: prize.color,
                    boxShadow: `0 -2px 20px 3px ${prize.color}`
                  }}
                />

                {/* Ambient glow behind icon */}
                <div
                  className="absolute top-12 w-24 h-24 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-2xl pointer-events-none"
                  style={{ backgroundColor: prize.color }}
                />

                {/* Icon Circle */}
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-5 mt-2 relative z-10 transition-transform duration-500 group-hover:scale-110 icon-float"
                  style={{
                    border: `1px solid ${prize.border}`,
                    boxShadow: `inset 0 0 20px ${prize.bg}, 0 0 20px ${prize.glow}`
                  }}
                >
                  <Icon
                    className="w-7 h-7 transition-all duration-300 group-hover:drop-shadow-[0_0_15px_currentColor]"
                    style={{
                      color: prize.color,
                      filter: `drop-shadow(0 0 8px ${prize.color})`
                    }}
                  />
                </div>

                <h3
                  className="font-serif italic font-bold text-2xl mb-3 tracking-wide transition-colors duration-300"
                  style={{ color: prize.color }}
                >
                  {titleSplit(prize.title)}
                </h3>

                {/* Diamond Divider */}
                <div className="flex items-center justify-center gap-3 w-full mb-4 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="h-[1px] w-8 lg:w-10" style={{ background: `linear-gradient(to right, transparent, ${prize.color})` }} />
                  <div className="w-1.5 h-1.5 rotate-45 transition-transform duration-300 group-hover:rotate-90 group-hover:scale-125" style={{ backgroundColor: prize.color, boxShadow: `0 0 8px ${prize.color}` }} />
                  <div className="h-[1px] w-8 lg:w-10" style={{ background: `linear-gradient(to left, transparent, ${prize.color})` }} />
                </div>

                <h4 className="text-[18px] sm:text-[20px] font-extrabold text-white/95 mb-3 tracking-wide drop-shadow-md">
                  {prize.amount}
                </h4>

                <p className="font-sans text-[12px] sm:text-[13px] text-white/60 leading-relaxed group-hover:text-white/80 transition-colors duration-300">
                  {prize.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Rules Information */}
        <div className="mt-20 relative group/rules w-full animate-fadeUp" style={{ animationDelay: '1200ms' }}>
          <div className="absolute -inset-[1.5px] rounded-3xl bg-gradient-to-r from-[#d4af37]/40 via-[#ffe58f]/20 to-[#d4af37]/40 opacity-70 blur-[2px] pointer-events-none transition-opacity duration-500 group-hover/rules:opacity-100" />
          <div className="relative rounded-3xl overflow-hidden border border-[#f5c64c]/20 shadow-[0_12px_48px_rgba(0,0,0,0.6)] backdrop-blur-xl bg-[#0d091e]/80">
            <div className="relative z-10 p-8 sm:p-10">
              <div className="flex flex-col items-center text-center mb-8">
                <h3 className="font-serif italic text-2xl sm:text-3xl font-extrabold tracking-wide drop-shadow-[0_2px_16px_rgba(0,0,0,0.9)]">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fff7cc] via-[#f5c64c] to-[#c8922e]">
                    Prize Distribution
                  </span>
                  <span className="text-white/50 mx-2 font-light not-italic">&amp;</span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c8922e] via-[#f5c64c] to-[#fff7cc]">
                    Claiming Rules
                  </span>
                </h3>
                <div className="mt-4 h-[1px] w-40 bg-gradient-to-r from-transparent via-[#f5c64c]/50 to-transparent" />
              </div>

              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  'Winners must provide government-recognized ID (Aadhaar/PAN) for delivery verification of physical cracker gifts.',
                  'All prize amounts are strictly non-refundable. Once a winning ticket is confirmed and verified, the awarded prize value is final and cannot be cancelled.',
                  'All cracker deliveries are fully insured and handled safely by our certified logistics partners taking necessary safety precautions.',
                  'Winner notifications and secure delivery tracking links are sent instantly via SMS upon draw completion.'
                ].map((rule, i) => (
                  <li key={i} className="group flex items-start gap-3.5 p-4 rounded-2xl border border-[#f5c64c]/10 hover:border-[#f5c64c]/40 transition-all duration-300 bg-[#f5c64c]/[0.02] hover:bg-[#f5c64c]/[0.05] hover:-translate-y-1 hover:shadow-lg">
                    <div className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5 bg-[#f5c64c]/10 shadow-[0_0_12px_rgba(245,198,76,0.2)] group-hover:scale-110 transition-transform duration-300">
                      <CheckCircle2 className="w-4 h-4 text-[#f5c64c]" />
                    </div>
                    <span className="font-sans text-[13px] sm:text-[14px] text-white/80 leading-relaxed tracking-wide group-hover:text-white/95 transition-colors duration-300">{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper to handle long titles gracefully if needed
function titleSplit(title) {
  return title;
}
