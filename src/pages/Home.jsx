import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Flame, Sparkles, ShieldCheck, Trophy, Gift, ArrowRight, CheckCircle,
  HelpCircle, ChevronRight, ChevronLeft, Award, Clock, Calendar, Users, Star, Crown, Check, Ticket, Zap, MapPin
} from 'lucide-react';
import { api } from '../services/api';
import CountdownTimer from '../components/common/CountdownTimer';
import WinnerAnnouncementModal from '../components/common/WinnerAnnouncementModal';
import FestiveParticles from '../components/common/FestiveParticles';

// Assets
import heroBg from '../assets/Herosection.png';
import luckyDrawImg from '../assets/LuckyDraw.png';
import giftImg from '../assets/gift.png';
import icon1 from '../assets/icon1.jpg';
import icon2 from '../assets/icon2.jpg';
import icon3 from '../assets/icon3.jpg';
import prizeTrophy from '../assets/prize-trophy.png';
import prizeGift from '../assets/prize-gift.png';
import prizeStar from '../assets/prize-star.png';

// About Section Assets from Images/
import aboutSectionBg from '../../Images/about-section-bg.png';
import aboutSectionArch from '../../Images/about-section-arch.png';
import howItWorksBg from '../../Images/how-it-works-background.png';
import specialOffersBg from '../../Images/special-offers-bg.png';
import grandPrizesBg from '../../Images/grand-prizes-bg.png';
import livePrizesBg from '../../Images/live-prizes-bg.png';
import luckyWinnersBg from '../../Images/lucky-winners-bg.png';
import liveTrophyGold from '../assets/live-trophy-gold.png';
import liveTrophySilver from '../assets/live-trophy-silver.png';
import liveTrophyBronze from '../assets/live-trophy-bronze.png';
import liveGiftPurple from '../assets/live-gift-purple.png';
import liveLotusGold from '../assets/live-lotus-gold.png';

// Curated light dot coordinates mapped to the Diwali night artwork composition
const festiveLightDots = [
  // 1. Horizon lights & beacon posts along the distant water line
  { left: '50.30%', top: '81.04%', size: 7, dur: 4.2, delay: 0.5 },
  { left: '57.22%', top: '86.37%', size: 6, dur: 3.8, delay: 1.8 },
  { left: '25.66%', top: '81.40%', size: 6, dur: 4.5, delay: 2.3 },
  { left: '16.96%', top: '80.69%', size: 7, dur: 3.5, delay: 0.8 },
  { left: '21.15%', top: '85.31%', size: 6, dur: 4.8, delay: 1.2 },
  { left: '75.25%', top: '82.82%', size: 6, dur: 4.0, delay: 2.7 },
  { left: '80.89%', top: '83.89%', size: 7, dur: 3.6, delay: 1.5 },
  { left: '85.24%', top: '82.82%', size: 5, dur: 4.4, delay: 0.9 },
  { left: '92.81%', top: '82.82%', size: 5, dur: 3.9, delay: 2.1 },
  { left: '14.22%', top: '85.31%', size: 5, dur: 4.7, delay: 1.6 },
  { left: '24.37%', top: '86.37%', size: 5, dur: 3.7, delay: 3.0 },

  // 2. Floating golden ember spark dots in the night sky (Left Side)
  { left: '16.64%', top: '15.28%', size: 5, dur: 4.6, delay: 0.4 },
  { left: '25.17%', top: '17.77%', size: 5, dur: 3.9, delay: 1.9 },
  { left: '21.79%', top: '22.75%', size: 6, dur: 4.3, delay: 0.9 },
  { left: '21.79%', top: '29.15%', size: 5, dur: 5.1, delay: 2.8 },
  { left: '15.83%', top: '47.63%', size: 4, dur: 4.7, delay: 1.3 },
  { left: '18.09%', top: '52.61%', size: 5, dur: 3.7, delay: 2.1 },
  { left: '20.02%', top: '61.49%', size: 4, dur: 4.4, delay: 0.6 },
  { left: '23.56%', top: '64.34%', size: 5, dur: 5.0, delay: 2.5 },
  { left: '14.39%', top: '67.18%', size: 4, dur: 3.6, delay: 1.7 },
  { left: '13.26%', top: '22.04%', size: 5, dur: 4.8, delay: 3.0 },
  { left: '11.00%', top: '18.84%', size: 5, dur: 4.1, delay: 1.1 },
  { left: '12.94%', top: '25.95%', size: 4, dur: 5.2, delay: 0.3 },

  // 3. Central atmospheric festive spark motes (Misty Upper Sky & Lower Horizon - Clear of Text)
  { left: '42.00%', top: '8.50%', size: 4, dur: 4.8, delay: 1.4 },
  { left: '50.00%', top: '6.50%', size: 4, dur: 4.5, delay: 0.9 },
  { left: '58.00%', top: '9.20%', size: 4, dur: 5.2, delay: 2.2 },
  { left: '46.00%', top: '62.00%', size: 4, dur: 4.9, delay: 1.8 },
  { left: '54.00%', top: '63.50%', size: 4, dur: 5.3, delay: 1.1 },

  // 4. Floating golden spark dots in the night sky (Right Side)
  { left: '68.17%', top: '78.91%', size: 5, dur: 4.0, delay: 1.6 },
  { left: '74.13%', top: '27.37%', size: 5, dur: 4.5, delay: 2.4 },
  { left: '78.15%', top: '29.15%', size: 6, dur: 3.8, delay: 0.8 },
  { left: '78.15%', top: '33.77%', size: 5, dur: 4.9, delay: 1.5 },
  { left: '80.09%', top: '37.68%', size: 5, dur: 4.2, delay: 2.9 },
  { left: '81.86%', top: '40.17%', size: 6, dur: 3.7, delay: 0.3 },
  { left: '82.98%', top: '48.34%', size: 4, dur: 5.3, delay: 2.2 },
  { left: '78.31%', top: '56.87%', size: 5, dur: 4.1, delay: 1.0 },
  { left: '82.98%', top: '19.91%', size: 4, dur: 4.7, delay: 2.7 },
  { left: '84.27%', top: '24.53%', size: 5, dur: 3.9, delay: 0.6 },
  { left: '86.04%', top: '27.37%', size: 4, dur: 5.0, delay: 1.9 },
  { left: '84.27%', top: '28.08%', size: 5, dur: 4.3, delay: 3.1 },
  { left: '87.98%', top: '34.12%', size: 4, dur: 4.6, delay: 1.2 },
  { left: '92.97%', top: '42.65%', size: 5, dur: 3.9, delay: 2.3 },
  { left: '92.65%', top: '52.96%', size: 4, dur: 4.8, delay: 0.4 },
  { left: '85.88%', top: '60.07%', size: 4, dur: 5.1, delay: 1.7 },
  { left: '91.36%', top: '65.40%', size: 4, dur: 4.3, delay: 2.5 },
  { left: '88.30%', top: '66.82%', size: 4, dur: 4.7, delay: 0.9 },

  // 5. Lantern & Diya warm flame pulsation accents
  { left: '3.60%', top: '18.50%', size: 10, dur: 3.4, delay: 0.2, isFlame: true },
  { left: '7.46%', top: '12.00%', size: 9, dur: 3.6, delay: 1.0, isFlame: true },
  { left: '97.32%', top: '29.50%', size: 8, dur: 3.3, delay: 1.5, isFlame: true },
  { left: '4.50%', top: '88.50%', size: 11, dur: 2.8, delay: 0.6, isFlame: true },
  { left: '12.20%', top: '88.00%', size: 8, dur: 3.1, delay: 1.4, isFlame: true },
  { left: '95.80%', top: '88.50%', size: 11, dur: 2.9, delay: 0.8, isFlame: true },
  { left: '87.80%', top: '88.00%', size: 8, dur: 3.2, delay: 2.0, isFlame: true },
];

// Ornate Corner Flourish for Step Cards matching reference
const CardCornerFlourish = ({ position }) => {
  const classes = {
    'top-left': 'top-2.5 left-2.5',
    'top-right': 'top-2.5 right-2.5 scale-x-[-1]',
    'bottom-left': 'bottom-2.5 left-2.5 scale-y-[-1]',
    'bottom-right': 'bottom-2.5 right-2.5 scale-[-1]',
  }[position];

  return (
    <svg
      className={`absolute ${classes} w-4 h-4 pointer-events-none text-[#f3c64c]/40 group-hover:text-[#ffe58f]/80 group-hover:scale-105 transition-all duration-300 drop-shadow-[0_0_4px_rgba(243,198,76,0.3)]`}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
    >
      <path d="M1 12V3C1 1.89543 1.89543 1 3 1H12" strokeLinecap="round" />
      <circle cx="3.5" cy="3.5" r="1.2" fill="currentColor" stroke="none" />
      <path d="M4 7C4 5.34315 5.34315 4 7 4" strokeLinecap="round" opacity="0.5" strokeWidth="0.8" />
    </svg>
  );
};

// Delicate Mandala Corner Pattern for Grand Prize Cards
const PrizeMandalaCorner = ({ className = '' }) => (
  <svg
    className={`pointer-events-none select-none ${className}`}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="0" cy="0" r="92" stroke="currentColor" strokeWidth="0.75" strokeDasharray="3 3" opacity="0.35" />
    <circle cx="0" cy="0" r="82" stroke="currentColor" strokeWidth="0.9" opacity="0.45" />
    <circle cx="0" cy="0" r="70" stroke="currentColor" strokeWidth="0.75" opacity="0.55" />
    <circle cx="0" cy="0" r="58" stroke="currentColor" strokeWidth="0.9" strokeDasharray="2 2" opacity="0.45" />
    <circle cx="0" cy="0" r="46" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
    <circle cx="0" cy="0" r="32" stroke="currentColor" strokeWidth="0.9" opacity="0.7" />
    <circle cx="0" cy="0" r="18" stroke="currentColor" strokeWidth="0.75" opacity="0.8" />
    <line x1="0" y1="0" x2="82" y2="0" stroke="currentColor" strokeWidth="0.75" opacity="0.5" />
    <line x1="0" y1="0" x2="0" y2="82" stroke="currentColor" strokeWidth="0.75" opacity="0.5" />
    <line x1="0" y1="0" x2="58" y2="58" stroke="currentColor" strokeWidth="0.75" opacity="0.5" />
    <line x1="0" y1="0" x2="76" y2="31" stroke="currentColor" strokeWidth="0.6" opacity="0.4" />
    <line x1="0" y1="0" x2="31" y2="76" stroke="currentColor" strokeWidth="0.6" opacity="0.4" />
    <path d="M 46 0 Q 52 8 42 18 Q 45 28 32 32 Q 28 45 18 42 Q 8 52 0 46" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
    <path d="M 70 0 Q 78 12 64 27 Q 68 42 49 49 Q 42 68 27 64 Q 12 78 0 70" stroke="currentColor" strokeWidth="0.75" opacity="0.5" />
  </svg>
);

// Faceted Golden Diamond for "How It Works" Header Accents
const HeadingFacetDiamond = () => (
  <div className="relative flex items-center justify-center shrink-0">
    <span className="absolute inset-0 rounded-full bg-[#fed45b]/50 blur-[3px]" />
    <svg className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 shrink-0 drop-shadow-[0_0_8px_rgba(255,215,90,0.95)]" viewBox="0 0 14 14" fill="none">
      <defs>
        <linearGradient id="facetGold" x1="1" y1="1" x2="13" y2="13" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFF9E0" />
          <stop offset="50%" stopColor="#F5C642" />
          <stop offset="100%" stopColor="#B37E0A" />
        </linearGradient>
      </defs>
      <polygon points="7,1 13,7 7,13 1,7" fill="url(#facetGold)" stroke="#FFF8DC" strokeWidth="0.75" />
      <polygon points="7,3.5 10.5,7 7,10.5 3.5,7" fill="#FFFDF0" opacity="0.75" />
      <circle cx="7" cy="7" r="1" fill="#FFFFFF" />
    </svg>
  </div>
);

// Delicate Diwali Lotus / Diya Ornament for "How It Works" Header matching reference
const DelicateHeadingLotus = ({ mirrored = false }) => {
  const gradId = mirrored ? 'headingLotusGoldRight' : 'headingLotusGoldLeft';
  const glintId = mirrored ? 'headingLotusGlintRight' : 'headingLotusGlintLeft';
  const flameGradId = mirrored ? 'headingLotusFlameRight' : 'headingLotusFlameLeft';
  const rimGradId = mirrored ? 'headingLotusRimRight' : 'headingLotusRimLeft';

  return (
    <div className={`relative flex items-center justify-center shrink-0 ${mirrored ? 'scale-x-[-1]' : ''}`}>
      {/* Luminous Warm Flame Sparkle atop Diya */}
      <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 flex items-center justify-center pointer-events-none select-none z-10">
        {/* Soft pulsing golden-amber candlelight glow halo */}
        <span className="absolute w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gradient-to-t from-amber-400/50 via-[#ffe58f]/80 to-white/90 blur-[3px] animate-pulse" />
        {/* Core brilliant white spark dot */}
        <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_#FFE58F]" />
        {/* 4-pointed radiant festive star */}
        <svg
          className="absolute w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FFFDF2] drop-shadow-[0_0_6px_rgba(255,230,120,1)]"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 0L13.8 8.2L22 12L13.8 15.8L12 24L10.2 15.8L2 12L10.2 8.2Z" />
        </svg>
      </div>

      <svg
        className="w-8 h-6 sm:w-9.5 sm:h-7.5 md:w-11 md:h-8.5 shrink-0 select-none drop-shadow-[0_2px_8px_rgba(245,198,76,0.65)]"
        viewBox="0 0 42 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Rich 24K Royal Gold Gradient */}
          <linearGradient id={gradId} x1="0" y1="0" x2="42" y2="30" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFBE6" />
            <stop offset="20%" stopColor="#FED867" />
            <stop offset="50%" stopColor="#F5B82E" />
            <stop offset="80%" stopColor="#D49B28" />
            <stop offset="100%" stopColor="#A8720A" />
          </linearGradient>

          {/* Central Diya Flame Gradient */}
          <linearGradient id={flameGradId} x1="21" y1="1" x2="21" y2="19" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="25%" stopColor="#FFF3B0" />
            <stop offset="60%" stopColor="#F5A623" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>

          {/* Shimmer Highlight */}
          <linearGradient id={glintId} x1="21" y1="2" x2="21" y2="12" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="45%" stopColor="#FFFBE0" />
            <stop offset="100%" stopColor="#F5CB5C" />
          </linearGradient>

          {/* Jeweled Rim Highlight Gradient */}
          <linearGradient id={rimGradId} x1="21" y1="2" x2="21" y2="28" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="35%" stopColor="#FFF1B8" />
            <stop offset="70%" stopColor="#F5CB5C" />
            <stop offset="100%" stopColor="#D4A030" />
          </linearGradient>
        </defs>

        {/* Central Upright Lotus Flame Petal */}
        <path
          d="M21 2.5C21 2.5 16.8 8.5 16.8 13.5C16.8 16.5 18.6 18.8 21 18.8C23.4 18.8 25.2 16.5 25.2 13.5C25.2 8.5 21 2.5 21 2.5Z"
          fill={`url(#${flameGradId})`}
          stroke={`url(#${rimGradId})`}
          strokeWidth="0.75"
        />
        {/* Central Petal Golden Shimmer Highlight */}
        <path
          d="M21 3C21 3 18.5 7.5 18.5 10.5C19.2 8 20.3 5 21 3Z"
          fill={`url(#${glintId})`}
          opacity="0.95"
        />

        {/* Left Flared Petal */}
        <path
          d="M18.8 16.2C15.5 15.6 10.5 13.2 7.8 8C6.6 5.8 7.5 4.2 7.5 4.2C7.5 4.2 9 8.5 13.2 11.8C15.6 13.5 17.6 14.8 18.8 16.2Z"
          fill={`url(#${gradId})`}
          stroke={`url(#${rimGradId})`}
          strokeWidth="0.75"
          strokeLinejoin="round"
          opacity="0.98"
        />

        {/* Right Flared Petal */}
        <path
          d="M23.2 16.2C26.5 15.6 31.5 13.2 34.2 8C35.4 5.8 34.5 4.2 34.5 4.2C34.5 4.2 33 8.5 28.8 11.8C26.4 13.5 24.4 14.8 23.2 16.2Z"
          fill={`url(#${gradId})`}
          stroke={`url(#${rimGradId})`}
          strokeWidth="0.75"
          strokeLinejoin="round"
          opacity="0.98"
        />

        {/* Delicate Curling Tendrils at Base */}
        <path
          d="M21 18.2C16.5 19 12.5 20.8 9.8 24C8.5 25.5 10 27 11.5 25.8C13.2 24.2 15.5 22.2 19 21.2C19.8 20.9 20.5 20.7 21 20.7"
          stroke={`url(#${gradId})`}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M21 18.2C25.5 19 29.5 20.8 32.2 24C33.5 25.5 32 27 30.5 25.8C28.8 24.2 26.5 22.2 23 21.2C22.2 20.9 21.5 20.7 21 20.7"
          stroke={`url(#${gradId})`}
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Subtle Base Flourish Loops */}
        <path
          d="M11 25.5C12.5 26.8 14.8 26.5 15.5 25.2"
          stroke={`url(#${gradId})`}
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.9"
        />
        <path
          d="M31 25.5C29.5 26.8 27.2 26.5 26.5 25.2"
          stroke={`url(#${gradId})`}
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.9"
        />

        {/* Small Golden Seed Pearl at Junction */}
        <circle cx="21" cy="18.8" r="1.6" fill="#FFFFFF" stroke={`url(#${gradId})`} strokeWidth="0.8" />
      </svg>
    </div>
  );
};

// 4 Step Cards Data matching reference
const howItWorksSteps = [
  {
    num: "01",
    title: "Register",
    desc: "Fill in your basic details and join the lucky draw with instant verification.",
    icon: (
      <svg className="w-7 h-7 sm:w-8 sm:h-8 text-[#ffe58f] group-hover:scale-105 transition-transform duration-300 drop-shadow-[0_2px_8px_rgba(243,198,76,0.5)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" strokeOpacity="0.75" />
        <line x1="16" y1="17" x2="8" y2="17" strokeOpacity="0.75" />
        <circle cx="16" cy="18" r="3.2" fill="#2d0d42" stroke="#f3c64c" strokeWidth="1.4" />
        <path d="M14.5 20.2a1.8 1.8 0 0 1 3 0" stroke="#ffe58f" strokeWidth="1.4" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Confirm Entry",
    desc: "Verify your participation via OTP and receive immediate digital confirmation.",
    icon: (
      <svg className="w-7 h-7 sm:w-8 sm:h-8 text-[#ffe58f] group-hover:scale-105 transition-transform duration-300 drop-shadow-[0_2px_8px_rgba(243,198,76,0.5)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1.2" fill="#ffe58f" />
        <circle cx="20" cy="21" r="1.2" fill="#ffe58f" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        <circle cx="15.5" cy="9.5" r="4.2" fill="#2d0d42" stroke="#f3c64c" strokeWidth="1.4" />
        <polyline points="13.7 9.5 15 10.8 17.5 8.2" stroke="#4ade80" strokeWidth="1.6" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Receive Lucky Ticket",
    desc: "Get your unique cryptographically stamped ticket number.",
    icon: (
      <svg className="w-7 h-7 sm:w-8 sm:h-8 text-[#ffe58f] group-hover:scale-105 transition-transform duration-300 drop-shadow-[0_2px_8px_rgba(243,198,76,0.5)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z" />
        <polygon points="12 8.5 13 10.6 15.2 11 13.6 12.5 14 14.7 12 13.6 10 14.7 10.4 12.5 8.8 11 11 10.6 12 8.5" fill="#f3c64c" stroke="#ffe58f" strokeWidth="0.8" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Winners Announced",
    desc: "Watch the live draw and see if you're the lucky grand winner!",
    icon: (
      <svg className="w-7 h-7 sm:w-8 sm:h-8 text-[#ffe58f] group-hover:scale-105 transition-transform duration-300 drop-shadow-[0_2px_8px_rgba(243,198,76,0.5)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 12 20 22 4 22 4 12" />
        <rect x="2" y="7" width="20" height="5" rx="1" />
        <line x1="12" y1="22" x2="12" y2="7" />
        <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" fill="#f3c64c" fillOpacity="0.3" />
        <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" fill="#f3c64c" fillOpacity="0.3" />
      </svg>
    ),
  },
];

// 3 Premium Concise Special Offer Cards
const specialOfferCards = [
  {
    id: 'special-offer-1',
    tierKey: 'ten_entry',
    badge: 'ENTRY OFFER',
    badgeIcon: 'Ticket',
    badgeStyle: 'bg-gradient-to-r from-[#2f1052] via-[#3a1566] to-[#250c41] text-[#ffe58f] border border-[#f5cb5c]/65 shadow-[0_2px_10px_rgba(245,203,92,0.25)]',
    highlight: '10',
    subtitle: 'Single Ticket Entry',
    tagline: 'Start Small, Win Big',
    description: 'Join the lucky draw with just 10 for a chance to win exciting premium gifts.',
    statusIcon: 'Zap',
    statusText: 'Instant Digital Allocation',
    statusPillStyle: 'bg-gradient-to-r from-[#290d4b]/90 to-[#1c0634]/90 border-[#c084fc]/45 text-[#ffe58f] shadow-[0_2px_12px_rgba(192,132,252,0.22)]',
    beaconColor: '#4ade80',
    buttonText: 'JOIN NOW',
    link: '/participate?offer=ten_entry',
    cardBg: 'from-[#19092d] via-[#240d3f] to-[#140625]',
    borderStyle: 'border-[#d4af37]/35',
    goldGlow: 'rgba(168, 85, 247, 0.45)',
    activeGlow: 'shadow-[0_0_28px_rgba(168,85,247,0.4),0_10px_28px_rgba(20,8,38,0.5)]',
    topGlow: 'rgba(168, 85, 247, 0.28)',
    buttonClass: 'bg-gradient-to-r from-[#ffeaa7] via-[#f7cb52] to-[#d89617] text-[#1b0d30]'
  },
  {
    id: 'special-offer-2',
    tierKey: 'festival_special',
    badge: 'MOST POPULAR',
    badgeIcon: 'Crown',
    badgeStyle: 'bg-gradient-to-r from-[#ffe58f] via-[#f5cb5c] to-[#d4af37] text-[#360814] font-extrabold shadow-sm',
    highlight: '3X',
    subtitle: 'Festival Special',
    tagline: '3 Entries • Triple Chances',
    description: 'Get 3 entries for every participation and triple your chances to win big.',
    isPopular: true,
    statusIcon: 'Flame',
    statusText: 'Most Popular Choice Today',
    statusPillStyle: 'bg-gradient-to-r from-[#4d0b20]/90 to-[#350514]/90 border-[#f5cb5c]/55 text-[#fff1cc] shadow-[0_2px_14px_rgba(245,203,92,0.28)]',
    beaconColor: '#f59e0b',
    buttonText: 'PARTICIPATE NOW',
    link: '/participate?offer=festival_special',
    cardBg: 'from-[#420a1b] via-[#560e25] to-[#310613]',
    borderStyle: 'border-[#f5cb5c]/70',
    goldGlow: 'rgba(244, 63, 94, 0.5)',
    activeGlow: 'shadow-[0_0_32px_rgba(244,63,94,0.45),0_12px_32px_rgba(72,12,29,0.55)]',
    topGlow: 'rgba(244, 63, 94, 0.32)',
    buttonClass: 'bg-gradient-to-r from-[#ffeaa7] via-[#f7cb52] to-[#d89617] text-[#360814]'
  },
  {
    id: 'special-offer-3',
    tierKey: 'early_bird',
    badge: 'EARLY BIRD BONUS',
    badgeIcon: 'Award',
    badgeStyle: 'bg-[#063b2e]/90 text-[#a7f3d0] border border-[#34d399]/45',
    highlight: '5X',
    subtitle: 'Early Bird Bonus',
    tagline: '5 Entries • VIP Bumper Pool',
    description: 'Participate early and get 5 entries for the same price. Limited time offer!',
    statusIcon: 'Clock',
    statusText: 'Limited Time • 48 Slots Left',
    statusPillStyle: 'bg-gradient-to-r from-[#053024]/90 to-[#032219]/90 border-[#34d399]/45 text-[#a7f3d0] shadow-[0_2px_12px_rgba(52,211,153,0.22)]',
    beaconColor: '#34d399',
    buttonText: 'REGISTER NOW',
    link: '/participate?offer=early_bird',
    cardBg: 'from-[#04241b] via-[#08382b] to-[#031d16]',
    borderStyle: 'border-[#d4af37]/35',
    goldGlow: 'rgba(16, 185, 129, 0.45)',
    activeGlow: 'shadow-[0_0_28px_rgba(16,185,129,0.4),0_10px_28px_rgba(4,33,25,0.5)]',
    topGlow: 'rgba(16, 185, 129, 0.28)',
    buttonClass: 'bg-gradient-to-r from-[#ffeaa7] via-[#f7cb52] to-[#d89617] text-[#04241b]'
  }
];

// Interactive 3D Cursor-Responsive Concise Offer Card
const InteractiveOfferCard = ({ card, isSelected, onSelect }) => {
  const [tilt, setTilt] = useState({ rotX: 0, rotY: 0, x: 50, y: 50, isHovered: false });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;
    const xPct = Math.round((clientX / rect.width) * 100);
    const yPct = Math.round((clientY / rect.height) * 100);
    // Smooth 3D tilt max ±5.5 degrees
    const rotX = -(((clientY - rect.height / 2) / (rect.height / 2)) * 5.5);
    const rotY = (((clientX - rect.width / 2) / (rect.width / 2)) * 5.5);
    setTilt({ rotX, rotY, x: xPct, y: yPct, isHovered: true });
  };

  const handleMouseLeave = () => {
    setTilt({ rotX: 0, rotY: 0, x: 50, y: 50, isHovered: false });
  };

  return (
    <div
      onClick={onSelect}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group relative rounded-2xl p-6 sm:p-7 flex flex-col justify-between cursor-pointer select-none transition-all duration-300 ease-out bg-gradient-to-b ${card.cardBg} border ${isSelected
        ? `border-[#f5cb5c] ring-2 ring-[#f5cb5c]/85 ${card.activeGlow}`
        : `${card.borderStyle} hover:border-[#f5cb5c]/80`
        }`}
      style={{
        transform: tilt.isHovered
          ? `perspective(850px) rotateX(${tilt.rotX.toFixed(2)}deg) rotateY(${tilt.rotY.toFixed(2)}deg) translateY(-6px) scale3d(1.02, 1.02, 1.02)`
          : 'perspective(850px) rotateX(0deg) rotateY(0deg) translateY(0px) scale3d(1, 1, 1)',
        boxShadow: tilt.isHovered
          ? `0 20px 38px rgba(0, 0, 0, 0.45), 0 0 26px ${card.goldGlow}`
          : undefined,
        transition: tilt.isHovered ? 'transform 0.08s ease-out, box-shadow 0.2s ease-out' : 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      {/* Ambient Top Glow */}
      <div
        className="absolute top-0 inset-x-0 h-32 rounded-t-2xl pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${card.topGlow} 0%, transparent 75%)`
        }}
      />

      {/* Dynamic Cursor Spotlight that follows mouse */}
      {tilt.isHovered && (
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-150"
          style={{
            background: `radial-gradient(220px circle at ${tilt.x}% ${tilt.y}%, rgba(255, 235, 140, 0.22), transparent 75%)`
          }}
        />
      )}

      {/* Top Hairline Light Reflection */}
      <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#ffe58f]/50 to-transparent pointer-events-none" />

      {/* Upper Content Lockup - Perfectly Adjusted & Balanced */}
      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Badge at top with micro-icon and synchronized ball-bounce ground impact animation */}
        <div className="mb-3 h-7 flex items-center justify-center">
          <span
            className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[10.5px] sm:text-[11.5px] tracking-wider uppercase font-extrabold shadow-sm will-change-transform animate-ball-bounce ${card.badgeStyle}`}
          >
            {card.badgeIcon === 'Ticket' && <Ticket className="w-3.5 h-3.5 text-[#ffe58f]" />}
            {card.badgeIcon === 'Crown' && <Crown className="w-3.5 h-3.5 text-[#360814]" />}
            {card.badgeIcon === 'Sparkles' && <Sparkles className="w-3.5 h-3.5 text-[#ffe58f]" />}
            {card.badgeIcon === 'Award' && <Award className="w-3.5 h-3.5 text-[#a7f3d0]" />}
            <span>{card.badge}</span>
          </span>
        </div>

        {/* Large Value & Clean Spacious Titles Lockup */}
        <div className="flex flex-col items-center mt-0.5">
          <span className="font-serif text-5xl sm:text-[54px] font-black tracking-tight leading-none bg-gradient-to-b from-[#FFFFFF] via-[#FFF4CC] to-[#F5CB5C] bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(245,203,92,0.4)] transition-transform duration-300 group-hover:scale-105 mb-2.5">
            {card.highlight}
          </span>
          <h3 className="font-serif text-xl sm:text-[22px] font-bold text-white tracking-normal mb-2">
            {card.subtitle}
          </h3>
          <div className="mb-3.5">
            <span className="inline-flex items-center px-3 py-0.5 rounded-full bg-white/[0.08] border border-[#f5cb5c]/35 text-[10px] sm:text-[10.5px] font-bold tracking-[0.14em] uppercase text-[#ffe58f] shadow-sm">
              {card.tagline}
            </span>
          </div>
        </div>

        {/* Clean, Crisp Description with Generous Breathing Space */}
        <p className="text-xs sm:text-[12.5px] leading-relaxed text-white/75 max-w-[245px] mx-auto mb-4 font-normal">
          {card.description}
        </p>
      </div>

      {/* Bottom Block: Status Urgency Tag & CTA Button */}
      <div className="relative z-10 pt-2 w-full mt-auto">
        {/* Luxury Live Status Pill with Glowing Beacon */}
        <div
          className={`relative overflow-hidden flex items-center justify-center gap-2 py-2 px-3.5 rounded-full border backdrop-blur-md mb-3.5 transition-all duration-300 ${card.statusPillStyle}`}
        >
          {/* Subtle Top Glass Reflection */}
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none" />

          {/* Glowing Live Pulse Beacon */}
          <span className="relative flex h-2 w-2 shrink-0">
            <span
              className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
              style={{ backgroundColor: card.beaconColor }}
            />
            <span
              className="relative inline-flex rounded-full h-2 w-2"
              style={{
                backgroundColor: card.beaconColor,
                boxShadow: `0 0 8px ${card.beaconColor}`
              }}
            />
          </span>

          {/* Curated Micro-Icon */}
          {card.statusIcon === 'Zap' && <Zap className="w-3.5 h-3.5 text-[#ffe58f] shrink-0" />}
          {card.statusIcon === 'Flame' && <Flame className="w-3.5 h-3.5 text-[#f87171] shrink-0" />}
          {card.statusIcon === 'Clock' && <Clock className="w-3.5 h-3.5 text-[#34d399] shrink-0" />}

          {/* Premium Typography */}
          <span className="text-[11px] sm:text-xs font-semibold tracking-wide">
            {card.statusText}
          </span>
        </div>

        {/* Interactive CTA Button with Metallic Sheen */}
        <Link
          to={card.link}
          onClick={(e) => e.stopPropagation()}
          className={`relative overflow-hidden inline-flex items-center justify-center w-full py-3 sm:py-3.5 px-6 rounded-full font-extrabold text-xs sm:text-sm tracking-wider uppercase shadow-[0_4px_16px_rgba(0,0,0,0.35)] hover:shadow-[0_6px_22px_rgba(245,203,92,0.4)] transition-all duration-300 group/btn border border-white/20 ${card.buttonClass}`}
        >
          {/* Button Sweep Shimmer */}
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-out pointer-events-none" />
          <span className="relative flex items-center gap-2">
            <span>{card.buttonText}</span>
            <span className="inline-flex items-center animate-arrow-glide">
              <ArrowRight className="w-4 h-4" />
            </span>
          </span>
        </Link>
      </div>
    </div>
  );
};

// Interactive 3D Cursor-Responsive Grand Prize Card (Premium Replicated from Reference)
const InteractiveGrandPrizeCard = ({ prize }) => {
  const [tilt, setTilt] = useState({ rotX: 0, rotY: 0, isHovered: false });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;
    // Smooth 3D tilt max ±5.5 degrees
    const rotX = -(((clientY - rect.height / 2) / (rect.height / 2)) * 5.5);
    const rotY = (((clientX - rect.width / 2) / (rect.width / 2)) * 5.5);
    setTilt({ rotX, rotY, isHovered: true });
  };

  const handleMouseLeave = () => {
    setTilt({ rotX: 0, rotY: 0, isHovered: false });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`w-full max-w-[290px] sm:w-[300px] lg:w-[315px] min-h-[340px] sm:min-h-[350px] relative rounded-2xl p-4 sm:p-5 text-center flex flex-col justify-between items-center cursor-pointer select-none transition-all duration-300 ease-out ${prize.bgGradient} border ${prize.borderColor} hover:border-[#ffe58f] ${prize.glowShadow} group overflow-hidden`}
      style={{
        transform: tilt.isHovered
          ? `perspective(850px) rotateX(${tilt.rotX.toFixed(2)}deg) rotateY(${tilt.rotY.toFixed(2)}deg) translateY(-8px) scale3d(1.025, 1.025, 1.025)`
          : 'perspective(850px) rotateX(0deg) rotateY(0deg) translateY(0px) scale3d(1, 1, 1)',
        boxShadow: tilt.isHovered
          ? `0 24px 45px rgba(0, 0, 0, 0.55), 0 0 28px ${prize.goldGlow || 'rgba(245, 198, 76, 0.45)'}`
          : undefined,
        transition: tilt.isHovered ? 'transform 0.08s ease-out, box-shadow 0.2s ease-out' : 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      {/* Decorative Subtle Corner Mandalas */}
      <PrizeMandalaCorner className={`absolute -top-1 -left-1 w-16 h-16 sm:w-20 sm:h-20 ${prize.mandalaColor} transition-opacity duration-300 ${tilt.isHovered ? 'opacity-90' : 'opacity-60'}`} />
      <PrizeMandalaCorner className={`absolute -top-1 -right-1 w-16 h-16 sm:w-20 sm:h-20 -scale-x-100 ${prize.mandalaColor} transition-opacity duration-300 ${tilt.isHovered ? 'opacity-90' : 'opacity-60'}`} />
      <PrizeMandalaCorner className={`absolute -bottom-1 -left-1 w-14 h-14 -scale-y-100 ${prize.mandalaColor} transition-opacity duration-300 ${tilt.isHovered ? 'opacity-80' : 'opacity-40'}`} />
      <PrizeMandalaCorner className={`absolute -bottom-1 -right-1 w-14 h-14 -scale-100 ${prize.mandalaColor} transition-opacity duration-300 ${tilt.isHovered ? 'opacity-80' : 'opacity-40'}`} />

      {/* Premium 3D Prize Icon with Interactive Parallax Shift & Hover Animations */}
      <div
        className="relative z-10 w-full flex items-center justify-center pt-0.5 min-h-[82px] sm:min-h-[88px]"
        style={{
          transform: tilt.isHovered
            ? `translate3d(${(tilt.rotY * 0.8).toFixed(1)}px, ${(-tilt.rotX * 0.8).toFixed(1)}px, 20px)`
            : 'translate3d(0px, 0px, 0px)',
          transition: tilt.isHovered ? 'transform 0.08s ease-out' : 'transform 0.4s ease-out'
        }}
      >
        {/* Glowing Ambient Aura that intensifies and breathes on hover */}
        <div
          className={`absolute w-24 h-24 rounded-full bg-gradient-to-br ${prize.auraColor} blur-xl pointer-events-none transition-all duration-500 animate-ambient-aura ${tilt.isHovered ? 'opacity-95 scale-110' : 'opacity-35 scale-100'
            }`}
        />

        <img
          src={prize.image}
          alt={prize.title}
          className={`relative z-10 w-[80px] h-[80px] sm:w-[86px] sm:h-[86px] object-contain drop-shadow-[0_8px_20px_rgba(0,0,0,0.7)] ${prize.animClass} transition-all duration-300 pointer-events-none select-none ${tilt.isHovered ? 'scale-105' : ''
            }`}
        />
      </div>

      {/* Prize Hierarchy: title -> gold diamond divider -> supporting text -> description */}
      <div className="relative z-10 w-full px-2 my-auto">
        {/* Main Prize Title */}
        <h3 className="font-serif text-[21px] sm:text-[23px] font-bold text-[#fff6d6] tracking-tight leading-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)] mb-2.5 transition-transform duration-300 group-hover:scale-[1.02]">
          {prize.title}
        </h3>

        {/* Elegant Gold Diamond Hairline Divider with generous breathing room */}
        <div className="flex items-center justify-center gap-2 mb-2.5 select-none">
          <div className="h-[1px] w-7 bg-gradient-to-r from-transparent via-[#e5b32f]/60 to-[#e5b32f]" />
          <span className="text-[#f5c64c] text-[6.5px] drop-shadow-[0_0_4px_rgba(245,198,76,0.8)]">◆</span>
          <div className="h-[1px] w-7 bg-gradient-to-l from-transparent via-[#e5b32f]/60 to-[#e5b32f]" />
        </div>

        {/* Supporting Text with Metallic Gold Shimmer */}
        <div className="font-sans text-[12.5px] sm:text-[13px] font-bold bg-gradient-to-r from-[#ffe58f] via-[#f7cb59] to-[#d4af37] bg-clip-text text-transparent tracking-wide leading-tight mb-2">
          {prize.subtitle}
        </div>

        {/* Airy, High-Legibility Description with comfortable line-height */}
        <p className="font-sans text-[11px] sm:text-[11.5px] text-[#cbd5e1]/90 font-normal leading-[1.55] max-w-[250px] mx-auto">
          {prize.description}
        </p>
      </div>

      {/* Bottom Rounded Pill Button with Forward & Backward Gliding Arrow */}
      <div className="relative z-10 pt-1.5 w-full flex items-center justify-center">
        <Link
          to={prize.link || '/prizes'}
          onClick={(e) => e.stopPropagation()}
          className="group/btn relative overflow-hidden inline-flex items-center justify-center gap-2 h-[34px] sm:h-[35px] px-5 sm:px-6 rounded-full text-[11px] sm:text-[11.5px] font-serif font-bold tracking-[0.16em] uppercase text-[#fff4c4] bg-gradient-to-r from-[#1c0e05]/95 via-[#0e0702]/98 to-[#1c0e05]/95 border-[1.5px] border-[#e5b32f]/85 shadow-[0_2px_10px_rgba(0,0,0,0.5),0_0_12px_rgba(229,179,47,0.22)] hover:border-[#ffe58f] hover:shadow-[0_4px_20px_rgba(0,0,0,0.6),0_0_20px_rgba(245,203,92,0.48)] hover:-translate-y-0.5 active:scale-95 transition-all duration-300 cursor-pointer select-none"
        >
          {/* Subtle Top Glass Reflection Line */}
          <span className="absolute top-0 inset-x-3 h-[1px] bg-gradient-to-r from-transparent via-[#ffe58f]/40 to-transparent pointer-events-none" />

          {/* Shimmer Light Sweep on Hover */}
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-out pointer-events-none" />

          {/* Button Text with Radiant Gold Sheen */}
          <span className="relative z-10 font-bold bg-gradient-to-r from-[#ffffff] via-[#fff5cc] to-[#f5cb5c] bg-clip-text text-transparent drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
            VIEW PRIZE
          </span>

          {/* Forward and Backward Animated Arrow */}
          <span className="relative z-10 inline-flex items-center justify-center text-[#f7cb52] group-hover/btn:text-white transition-colors duration-200 animate-arrow-back-forth">
            <ArrowRight className="w-3.5 h-3.5 stroke-[2.4]" />
          </span>
        </Link>
      </div>
    </div>
  );
};

// Royal Decorative Tapered Hairline with Diamond Ornaments (matching reference image)
const RoyalHeaderOrnament = ({ flip = false }) => {
  return (
    <div className={`flex items-center gap-1 sm:gap-1.5 md:gap-2 select-none pointer-events-none shrink ${flip ? 'scale-x-[-1]' : ''}`}>
      {/* 1. Tapering glowing gold hairline */}
      <div className="h-[1.5px] w-6 sm:w-14 md:w-24 lg:w-32 bg-gradient-to-r from-transparent via-[#e5b32f]/60 to-[#ffe58f]" />

      {/* 2. Small solid gold accent diamond */}
      <div className="w-1.5 h-1.5 rotate-45 bg-[#f5c64c] shadow-[0_0_6px_rgba(245,198,76,0.9)] shrink-0" />

      {/* 3. Short connecting bar */}
      <div className="h-[1.5px] w-1.5 sm:w-2.5 bg-[#ffe58f] shrink-0" />

      {/* 4. Central Ornate Hollow Diamond with glowing center core */}
      <div className="relative w-3.5 h-3.5 sm:w-4 sm:h-4 flex items-center justify-center shrink-0">
        <div className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rotate-45 border-[1.5px] border-[#ffe58f] bg-[#0c1024] shadow-[0_0_8px_rgba(245,198,76,0.95)]" />
        <div className="absolute w-1 h-1 rotate-45 bg-[#ffe58f] shadow-[0_0_4px_#fff]" />
      </div>

      {/* 5. Gold line extending inward to text */}
      <div className="h-[1.5px] w-2 sm:w-4 md:w-5 bg-gradient-to-r from-[#ffe58f] to-[#f5c64c] shrink-0" />
    </div>
  );
};

// Premium Glassmorphism Live Prize Card (Horizontal Split matching Reference Image)
const LivePrizeGlassCard = ({ prize, index = 0 }) => {
  const iconAnimClass = `animate-live-icon-${(index % 4) + 1}`;
  const auraAnimClass = `animate-live-aura-${(index % 4) + 1}`;

  return (
    <div
      className={`group relative rounded-2xl p-3 sm:p-3.5 md:p-4 flex flex-row items-center justify-between text-left transition-all duration-300 ease-out hover:-translate-y-2 cursor-pointer overflow-hidden border backdrop-blur-md min-h-[128px] sm:min-h-[134px] md:min-h-[140px] ${prize.borderClass} ${prize.glowShadow}`}
      style={{
        background: prize.cardBg,
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)'
      }}
    >
      {/* Top Subtle Specular Glass Reflection Line */}
      <div className="absolute top-0 inset-x-4 h-[1.5px] bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />

      {/* Sweeping Glass Reflection Gleam on Hover */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/[0.08] to-transparent pointer-events-none" />

      {/* Bottom Luminous Glow Flare centered on bottom border edge */}
      <div
        className="absolute -bottom-[2px] left-1/2 -translate-x-1/2 w-28 sm:w-36 h-3.5 rounded-full blur-[8px] pointer-events-none opacity-90 group-hover:opacity-100 group-hover:scale-x-120 group-hover:w-44 transition-all duration-300"
        style={{ backgroundColor: prize.flareColor }}
      />
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 sm:w-20 h-[2px] rounded-full pointer-events-none opacity-95 group-hover:w-28 transition-all duration-300"
        style={{
          backgroundColor: prize.flareCenterColor,
          boxShadow: `0 0 14px 3px ${prize.flareColor}`
        }}
      />

      {/* Left Side: 3D Clean Studio Animated Visual (Trophy / Gift with gentle floating motion) */}
      <div className="w-[44%] sm:w-[46%] shrink-0 flex items-center justify-center p-1 relative select-none">
        {/* Floating animated 3D clean studio image */}
        <div className={`relative z-10 w-full flex items-center justify-center ${iconAnimClass} group-hover:scale-105 transition-transform duration-300 ease-out`}>
          <img
            src={prize.image}
            alt={prize.rank}
            className="w-full max-h-[106px] sm:max-h-[114px] md:max-h-[120px] object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.85)] pointer-events-none"
            loading="eager"
          />
        </div>
      </div>

      {/* Right Side: Ultra-Clear Typography & Divider */}
      <div className="flex-1 flex flex-col justify-center items-center text-center pr-1.5 pl-1 z-10 select-none">
        {/* Label / Rank */}
        {prize.isTextPrize ? (
          <span className="font-serif font-bold text-[14px] sm:text-[15px] lg:text-[16px] leading-tight text-[#ffe58f] drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] text-center tracking-wide">
            {prize.rank}
          </span>
        ) : (
          <span
            className="font-serif italic font-bold text-[17px] sm:text-[18px] lg:text-[19px] leading-tight tracking-wider drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]"
            style={{ color: prize.titleColor }}
          >
            {prize.rank}
          </span>
        )}

        {/* Decorative Hairline with Center Glowing Diamond */}
        <div className="flex items-center justify-center gap-1.5 w-full my-2 select-none">
          <div
            className="h-[1.5px] w-7 sm:w-9"
            style={{
              background: `linear-gradient(to right, transparent, ${prize.dividerColor})`
            }}
          />
          <div
            className="w-1.5 h-1.5 rotate-45 border-[1px]"
            style={{
              borderColor: prize.dividerColor,
              backgroundColor: prize.dividerColor,
              boxShadow: `0 0 8px ${prize.dividerColor}`
            }}
          />
          <div
            className="h-[1.5px] w-7 sm:w-9"
            style={{
              background: `linear-gradient(to left, transparent, ${prize.dividerColor})`
            }}
          />
        </div>

        {/* Prize Amount or Rewards Tagline */}
        {prize.isTextPrize ? (
          <span className="font-sans text-[11.5px] sm:text-[12px] lg:text-[12.5px] font-medium text-white/95 leading-snug drop-shadow-[0_1px_6px_rgba(0,0,0,0.95)] max-w-[140px] text-center">
            {prize.amount}
          </span>
        ) : (
          <span className="font-serif font-extrabold text-[24px] sm:text-[26px] md:text-[28px] lg:text-[30px] text-white tracking-tight leading-none drop-shadow-[0_2px_12px_rgba(0,0,0,0.98)] drop-shadow-[0_0_20px_rgba(255,255,255,0.35)]">
            {prize.amount}
          </span>
        )}
      </div>
    </div>
  );
};

// Royal Vector Icon: Easy Participation (Community / Festive Crest) - Sharp & High Resolution
const RoyalUsersIcon = () => (
  <svg
    className="w-[38px] h-[38px] transition-transform duration-300 ease-out group-hover:scale-108 select-none"
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.35))' }}
  >
    <defs>
      <linearGradient id="sharpGold1" x1="18" y1="4" x2="18" y2="30" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFFBE6" />
        <stop offset="30%" stopColor="#FCD34D" />
        <stop offset="70%" stopColor="#E59E10" />
        <stop offset="100%" stopColor="#A86208" />
      </linearGradient>
      <linearGradient id="sharpGoldCrown" x1="18" y1="2" x2="18" y2="10" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="60%" stopColor="#FFE082" />
        <stop offset="100%" stopColor="#F59E0B" />
      </linearGradient>
    </defs>
    {/* Festive Star Sparkle Crown */}
    <path
      d="M18 3L19.3 5.8L22.2 6.2L20 8.2L20.6 11L18 9.6L15.4 11L16 8.2L13.8 6.2L16.7 5.8L18 3Z"
      fill="url(#sharpGoldCrown)"
      stroke="#FFFBE6"
      strokeWidth="0.5"
      className="transition-transform duration-300 group-hover:scale-115 origin-center"
    />
    {/* Center User Head */}
    <circle cx="18" cy="15" r="4.2" fill="url(#sharpGold1)" stroke="#FFF9D2" strokeWidth="0.8" />
    {/* Center User Torso */}
    <path
      d="M10.8 28.5C10.8 23.8 14 21.2 18 21.2C22 21.2 25.2 23.8 25.2 28.5C25.2 28.8 24.8 29.2 24.2 29.2H11.8C11.2 29.2 10.8 28.8 10.8 28.5Z"
      fill="url(#sharpGold1)"
      stroke="#FFF9D2"
      strokeWidth="0.8"
    />
    {/* Left User Head & Shoulder */}
    <circle cx="9.5" cy="17" r="3.2" fill="url(#sharpGold1)" opacity="0.95" stroke="#FFEAA2" strokeWidth="0.5" />
    <path
      d="M4 27.5C4 24.2 6.5 22.2 9.5 22.2C10.8 22.2 12 22.7 12.8 23.6C12.3 25 12 26.6 12 28.2H4.5C4.2 28.2 4 27.9 4 27.5Z"
      fill="url(#sharpGold1)"
      opacity="0.9"
      stroke="#FFEAA2"
      strokeWidth="0.5"
    />
    {/* Right User Head & Shoulder */}
    <circle cx="26.5" cy="17" r="3.2" fill="url(#sharpGold1)" opacity="0.95" stroke="#FFEAA2" strokeWidth="0.5" />
    <path
      d="M32 27.5C32 24.2 29.5 22.2 26.5 22.2C25.2 22.2 24 22.7 23.2 23.6C23.7 25 24 26.6 24 28.2H31.5C31.8 28.2 32 27.9 32 27.5Z"
      fill="url(#sharpGold1)"
      opacity="0.9"
      stroke="#FFEAA2"
      strokeWidth="0.5"
    />
    {/* Festive Sparkle Diamonds */}
    <circle cx="6" cy="11" r="1.1" fill="#FFFBE6" className="transition-opacity duration-300 group-hover:opacity-100" />
    <circle cx="30" cy="11" r="1.1" fill="#FFFBE6" className="transition-opacity duration-300 group-hover:opacity-100" />
  </svg>
);

// Royal Vector Icon: Transparent Draw (Royal Shield of Integrity) - Sharp & High Resolution
const RoyalShieldIcon = () => (
  <svg
    className="w-[38px] h-[38px] transition-transform duration-300 ease-out group-hover:scale-108 select-none"
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.35))' }}
  >
    <defs>
      <linearGradient id="shieldLeftSharp" x1="7" y1="5" x2="18" y2="32" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFFDE8" />
        <stop offset="35%" stopColor="#FCD34D" />
        <stop offset="70%" stopColor="#E59E10" />
        <stop offset="100%" stopColor="#A86208" />
      </linearGradient>
      <linearGradient id="shieldRightSharp" x1="29" y1="5" x2="18" y2="32" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFEBA0" />
        <stop offset="35%" stopColor="#E59E10" />
        <stop offset="75%" stopColor="#A86208" />
        <stop offset="100%" stopColor="#6E3B02" />
      </linearGradient>
      <linearGradient id="sharpCheckGrad" x1="13" y1="14" x2="23" y2="23" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="50%" stopColor="#FFF9D2" />
        <stop offset="100%" stopColor="#FCD34D" />
      </linearGradient>
    </defs>
    {/* Outer Shield Frame */}
    <path
      d="M18 4L7 8.5V17.5C7 24.8 11.7 31.5 18 33C24.3 31.5 29 24.8 29 17.5V8.5L18 4Z"
      fill="none"
      stroke="#FFFBE6"
      strokeWidth="1.2"
      strokeLinejoin="round"
    />
    {/* Left Facet */}
    <path d="M18 5.5L8.5 9.5V17.5C8.5 23.8 12.6 29.8 18 31.2V5.5Z" fill="url(#shieldLeftSharp)" />
    {/* Right Facet */}
    <path d="M18 5.5L27.5 9.5V17.5C27.5 23.8 23.4 29.8 18 31.2V5.5Z" fill="url(#shieldRightSharp)" />
    {/* Inner Jewel Accent Hairline */}
    <path
      d="M18 8.5L11.5 11.8V17.5C11.5 22.2 14.3 26.8 18 28.2C21.7 26.8 24.5 22.2 24.5 17.5V11.8L18 8.5Z"
      stroke="rgba(255, 255, 255, 0.45)"
      strokeWidth="0.75"
      fill="none"
    />
    {/* Center Bold Checkmark */}
    <path
      d="M13.2 18.2L16.4 21.4L23.2 14.2"
      stroke="url(#sharpCheckGrad)"
      strokeWidth="2.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="transition-transform duration-300 group-hover:scale-110 origin-center"
    />
    {/* Top Star Sparkle */}
    <path d="M18 2L18.6 3.4L20 4L18.6 4.6L18 6L17.4 4.6L16 4L17.4 3.4L18 2Z" fill="#FFFDE8" />
  </svg>
);

// Royal Vector Icon: Exciting Rewards (Royal Treasure Gift with Interactive Lid Hop)
const RoyalGiftIcon = () => (
  <svg
    className="w-[38px] h-[38px] transition-transform duration-300 ease-out group-hover:scale-108 select-none"
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.35))' }}
  >
    <defs>
      <linearGradient id="sharpGiftBox" x1="18" y1="16" x2="18" y2="31" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFF9D2" />
        <stop offset="35%" stopColor="#FCD34D" />
        <stop offset="75%" stopColor="#E59E10" />
        <stop offset="100%" stopColor="#965505" />
      </linearGradient>
      <linearGradient id="sharpGiftLid" x1="18" y1="10" x2="18" y2="16" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="45%" stopColor="#FEE488" />
        <stop offset="100%" stopColor="#E59E10" />
      </linearGradient>
      <linearGradient id="sharpRibbon" x1="18" y1="11" x2="18" y2="31" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="50%" stopColor="#FFF9D2" />
        <stop offset="100%" stopColor="#F59E0B" />
      </linearGradient>
      <linearGradient id="sharpBow" x1="18" y1="4" x2="18" y2="12" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="40%" stopColor="#FEE488" />
        <stop offset="100%" stopColor="#D97706" />
      </linearGradient>
    </defs>
    {/* Gift Box Base */}
    <rect x="7" y="16" width="22" height="15" rx="2" fill="url(#sharpGiftBox)" stroke="#FFF9D2" strokeWidth="0.8" />
    {/* Vertical Ribbon */}
    <rect x="16" y="16" width="4" height="15" fill="url(#sharpRibbon)" stroke="rgba(255,255,255,0.8)" strokeWidth="0.5" />
    {/* Horizontal Ribbon on Box */}
    <rect x="7" y="21.5" width="22" height="3" fill="url(#sharpRibbon)" opacity="0.6" />

    {/* Interactive Top Lid & Bow - Micro-hops on hover */}
    <g className="transition-transform duration-300 ease-out group-hover:-translate-y-1 origin-bottom">
      {/* Gift Box Lid */}
      <rect x="5.5" y="11" width="25" height="5.5" rx="1.5" fill="url(#sharpGiftLid)" stroke="#FFFBE6" strokeWidth="0.8" />
      {/* Lid Ribbon Segment */}
      <rect x="16" y="11" width="4" height="5.5" fill="url(#sharpRibbon)" stroke="rgba(255,255,255,0.8)" strokeWidth="0.5" />
      {/* Bow Left Loop */}
      <path d="M18 11.5C15 8.2 10.5 6.8 11.2 5.2C11.8 3.8 14.5 4.5 17.5 9.5" fill="url(#sharpBow)" stroke="#FFF9D2" strokeWidth="0.6" />
      {/* Bow Right Loop */}
      <path d="M18 11.5C21 8.2 25.5 6.8 24.8 5.2C24.2 3.8 21.5 4.5 18.5 9.5" fill="url(#sharpBow)" stroke="#FFF9D2" strokeWidth="0.6" />
      {/* Bow Center Knot */}
      <circle cx="18" cy="11" r="2.2" fill="#FFFFFF" stroke="#E59E10" strokeWidth="0.8" />
    </g>

    {/* Festive Floating Sparkle Stars */}
    <path d="M5.5 8L6 9.2L7.2 9.5L6.2 10.3L6.5 11.5L5.5 10.8L4.5 11.5L4.8 10.3L3.8 9.5L5 9.2L5.5 8Z" fill="#FFFDE8" />
    <path d="M30.5 7L31 8L32.2 8.3L31.2 9L31.5 10.2L30.5 9.5L29.5 10.2L29.8 9L28.8 8.3L30 8L30.5 7Z" fill="#FFFDE8" />
  </svg>
);

// Ultra-Premium Interactive Feature Card with 3D Tilt, Radial Spotlight & Jewel Medallion
const AboutFeatureCard = ({ title, description, iconType }) => {
  const [tilt, setTilt] = useState({ rotX: 0, rotY: 0, isHovered: false, mouseX: 50, mouseY: 50 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // Controlled subtle tilt ±5.5deg
    const rotX = -((y / (rect.height / 2)) * 5.5);
    const rotY = (x / (rect.width / 2)) * 5.5;
    const mouseX = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const mouseY = Math.round(((e.clientY - rect.top) / rect.height) * 100);
    setTilt({ rotX, rotY, isHovered: true, mouseX, mouseY });
  };

  const handleMouseLeave = () => {
    setTilt({ rotX: 0, rotY: 0, isHovered: false, mouseX: 50, mouseY: 50 });
  };

  const renderIcon = () => {
    if (iconType === 'users') return <RoyalUsersIcon />;
    if (iconType === 'shield') return <RoyalShieldIcon />;
    if (iconType === 'gift') return <RoyalGiftIcon />;
    return null;
  };

  return (
    <div
      className="group relative pt-6 pb-6 px-4 sm:px-5 rounded-[22px] flex flex-col items-center justify-start text-center min-h-[216px] sm:min-h-[222px] w-full cursor-pointer transition-all duration-300 ease-out overflow-hidden select-none"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: '1000px',
        transform: tilt.isHovered
          ? `perspective(1000px) rotateX(${tilt.rotX.toFixed(2)}deg) rotateY(${tilt.rotY.toFixed(2)}deg) translateY(-6px) scale3d(1.02, 1.02, 1.02)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale3d(1, 1, 1)',
        transition: tilt.isHovered
          ? 'transform 0.1s ease-out, box-shadow 0.3s'
          : 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.3s',
        background: 'linear-gradient(180deg, #FFFFFF 0%, #FFFDF9 60%, #FFF8EF 100%)',
        border: 'none',
        boxShadow: tilt.isHovered
          ? '0 18px 40px -4px rgba(180, 130, 60, 0.18), 0 6px 16px rgba(138, 18, 79, 0.06)'
          : '0 8px 26px -2px rgba(180, 130, 60, 0.09), 0 2px 6px rgba(0, 0, 0, 0.02)'
      }}
    >
      {/* Interactive Dynamic Specular Light Glint following cursor */}
      {tilt.isHovered && (
        <div
          className="absolute inset-0 pointer-events-none rounded-[22px] transition-opacity duration-300 mix-blend-soft-light"
          style={{
            background: `radial-gradient(circle 180px at ${tilt.mouseX}% ${tilt.mouseY}%, rgba(255, 235, 175, 0.45) 0%, rgba(255, 215, 120, 0.12) 40%, transparent 70%)`
          }}
        />
      )}

      {/* Royal Medallion with crisp metallic gold rim & deep ruby enamel core - SHINE FREE */}
      <div className="relative mb-3 flex items-center justify-center shrink-0">
        {/* Outer Gold Chiseled Bezel */}
        <div
          className="w-[66px] h-[66px] sm:w-[68px] sm:h-[68px] rounded-full p-[2.5px] transition-all duration-300 ease-out group-hover:scale-108 group-hover:shadow-[0_6px_20px_rgba(138,18,79,0.35),0_0_12px_rgba(229,179,47,0.4)]"
          style={{
            background: 'linear-gradient(135deg, #FFF9D2 0%, #F5C64C 25%, #9E6510 50%, #FFDE7A 75%, #7A4202 100%)',
            boxShadow: '0 3px 12px rgba(138, 18, 79, 0.22), 0 1px 4px rgba(0, 0, 0, 0.12)'
          }}
        >
          {/* Inner Concentric Crisp Gold Border Ring */}
          <div className="w-full h-full rounded-full p-[1.5px] bg-[#9E6510] flex items-center justify-center">
            {/* Deep Royal Ruby Disc - CLEAN, CRISP, NO MILKY SHINE OVERLAY */}
            <div
              className="relative w-full h-full rounded-full flex items-center justify-center overflow-hidden transition-colors duration-300"
              style={{
                background: 'radial-gradient(circle at center, #8A124F 0%, #700E3F 60%, #4D092B 100%)',
                boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.45)'
              }}
            >
              {/* The Sharp Royal Gold Vector Icon */}
              <div className="relative z-10 flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-0.5">
                {renderIcon()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Title */}
      <h3 className="font-serif font-bold text-[18px] sm:text-[18.5px] text-[#7A173F] group-hover:text-[#5A0E2E] leading-tight whitespace-nowrap transition-colors duration-200">
        {title}
      </h3>

      {/* Decorative Gold Motif Divider with Central Diamond */}
      <div className="flex items-center justify-center gap-1.5 w-full my-2 select-none">
        <div className="h-[1px] w-8 sm:w-10 bg-gradient-to-r from-transparent via-[#C8922E]/70 to-[#C8922E]" />
        <span className="text-[#C8922E] text-[7.5px] group-hover:rotate-45 group-hover:scale-125 group-hover:text-[#F5C042] transition-all duration-300">
          ◆
        </span>
        <div className="h-[1px] w-8 sm:w-10 bg-gradient-to-l from-transparent via-[#C8922E]/70 to-[#C8922E]" />
      </div>

      {/* Description */}
      <p className="text-[13.5px] sm:text-[14px] leading-[1.48] text-[#474D62] max-w-[260px] text-center font-normal">
        {description}
      </p>
    </div>
  );
};

// Section Header Crown for "Our Lucky Winners"
const SectionHeaderCrown = ({ className = "w-10 h-7" }) => (
  <svg
    viewBox="0 0 48 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={{ filter: 'drop-shadow(0 0 10px rgba(245, 206, 92, 0.7))' }}
  >
    <defs>
      <linearGradient id="secCrownGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fff8cf" />
        <stop offset="35%" stopColor="#f7d368" />
        <stop offset="70%" stopColor="#d99f2e" />
        <stop offset="100%" stopColor="#966310" />
      </linearGradient>
      <linearGradient id="secCrownBase" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#b9821d" />
        <stop offset="50%" stopColor="#fae58d" />
        <stop offset="100%" stopColor="#b9821d" />
      </linearGradient>
    </defs>
    {/* 5 jewels on peaks */}
    <circle cx="24" cy="4" r="2.6" fill="#fffbe6" stroke="#d89e2b" strokeWidth="0.6" />
    <circle cx="13" cy="8.5" r="2.2" fill="#fffbe6" stroke="#d89e2b" strokeWidth="0.6" />
    <circle cx="35" cy="8.5" r="2.2" fill="#fffbe6" stroke="#d89e2b" strokeWidth="0.6" />
    <circle cx="4" cy="13.5" r="1.9" fill="#fffbe6" stroke="#d89e2b" strokeWidth="0.6" />
    <circle cx="44" cy="13.5" r="1.9" fill="#fffbe6" stroke="#d89e2b" strokeWidth="0.6" />
    {/* Crown body with 5 prongs */}
    <path
      d="M4 13.5 L9.5 24 Q24 25.5 38.5 24 L44 13.5 L35 8.5 L28 17 L24 4 L20 17 L13 8.5 Z"
      fill="url(#secCrownGold)"
      stroke="#e5b32f"
      strokeWidth="0.6"
      strokeLinejoin="round"
    />
    {/* Base headband */}
    <path
      d="M8.5 24 Q24 26.5 39.5 24 L40.5 27.5 Q24 30 7.5 27.5 Z"
      fill="url(#secCrownBase)"
      stroke="#b9821d"
      strokeWidth="0.5"
    />
    {/* Base gems */}
    <ellipse cx="24" cy="27" rx="1.8" ry="1.1" fill="#ffffff" />
    <ellipse cx="16" cy="26.3" rx="1.3" ry="0.9" fill="#fae58d" />
    <ellipse cx="32" cy="26.3" rx="1.3" ry="0.9" fill="#fae58d" />
  </svg>
);

// Luxury Metallic Color Themes for Winner Awards (Olympic / Royal Tiering)
const WINNER_THEMES = {
  gold: {
    light: '#fffde6',
    mid1: '#fcd34d',
    mid2: '#dfa628',
    dark: '#875608',
    shadow: '#4d2e00',
    border: 'rgba(234, 179, 8, 0.65)',
    borderHover: '#ffe082',
    glow: 'rgba(234, 179, 8, 0.42)',
    accent: '#ffeaa0',
    gem1: '#e11d48',
    gem2: '#2563eb',
    coinBg1: '#1c2442',
    coinBg2: '#0b0f20'
  },
  silver: {
    light: '#ffffff',
    mid1: '#e2e8f0',
    mid2: '#94a3b8',
    dark: '#475569',
    shadow: '#1e293b',
    border: 'rgba(203, 213, 225, 0.65)',
    borderHover: '#ffffff',
    glow: 'rgba(203, 213, 225, 0.38)',
    accent: '#f1f5f9',
    gem1: '#0284c7',
    gem2: '#059669',
    coinBg1: '#1e263d',
    coinBg2: '#0c101d'
  },
  bronze: {
    light: '#ffede0',
    mid1: '#fb923c',
    mid2: '#c2410c',
    dark: '#7c2d12',
    shadow: '#431700',
    border: 'rgba(251, 146, 60, 0.65)',
    borderHover: '#fdba74',
    glow: 'rgba(251, 146, 60, 0.38)',
    accent: '#fed7aa',
    gem1: '#dc2626',
    gem2: '#7c3aed',
    coinBg1: '#281a24',
    coinBg2: '#100a12'
  },
  amber: {
    light: '#fffbeb',
    mid1: '#fbbf24',
    mid2: '#d97706',
    dark: '#92400e',
    shadow: '#451a03',
    border: 'rgba(245, 158, 11, 0.65)',
    borderHover: '#fde68a',
    glow: 'rgba(245, 158, 11, 0.38)',
    accent: '#fde68a',
    gem1: '#ea580c',
    gem2: '#0284c7',
    coinBg1: '#261f28',
    coinBg2: '#0f0b14'
  },
  copper: {
    light: '#ffedd5',
    mid1: '#f97316',
    mid2: '#9a3412',
    dark: '#6c2108',
    shadow: '#431407',
    border: 'rgba(249, 115, 22, 0.65)',
    borderHover: '#fed7aa',
    glow: 'rgba(249, 115, 22, 0.38)',
    accent: '#fed7aa',
    gem1: '#b91c1c',
    gem2: '#d97706',
    coinBg1: '#231622',
    coinBg2: '#0e0811'
  }
};

// Mathematically Centered, Sovereign Vector Prize Medal Crest SVG
const PrizeMedalCrest = ({ rank, suffix, themeKey = 'gold', className = "w-full h-full" }) => {
  const t = WINNER_THEMES[themeKey] || WINNER_THEMES.gold;
  const gid = `medal_crest_${themeKey}_${rank}`;

  return (
    <svg viewBox="0 0 140 134" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={{ overflow: 'visible' }}>
      <defs>
        {/* 4-stop primary metallic gradient */}
        <linearGradient id={`${gid}_metal`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={t.light} />
          <stop offset="28%" stopColor={t.mid1} />
          <stop offset="68%" stopColor={t.mid2} />
          <stop offset="100%" stopColor={t.dark} />
        </linearGradient>

        {/* Specular Highlight metal for upper leaf surfaces and crown tips */}
        <linearGradient id={`${gid}_metalHi`} x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor={t.mid2} />
          <stop offset="50%" stopColor={t.mid1} />
          <stop offset="100%" stopColor={t.light} />
        </linearGradient>

        {/* Dimensional Shadow metal for leaf undersides */}
        <linearGradient id={`${gid}_metalShade`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={t.mid2} />
          <stop offset="100%" stopColor={t.shadow} />
        </linearGradient>

        {/* Radial specular rim gradient */}
        <linearGradient id={`${gid}_rim`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={t.dark} />
          <stop offset="25%" stopColor={t.light} />
          <stop offset="50%" stopColor={t.mid1} />
          <stop offset="75%" stopColor={t.light} />
          <stop offset="100%" stopColor={t.dark} />
        </linearGradient>

        {/* Radial sunburst coin face */}
        <radialGradient id={`${gid}_coin`} cx="50%" cy="40%" r="58%">
          <stop offset="0%" stopColor={t.coinBg1} />
          <stop offset="65%" stopColor={t.coinBg2} />
          <stop offset="100%" stopColor="#04060c" />
        </radialGradient>

        {/* Drop Shadow Filter */}
        <filter id={`${gid}_glow`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor={t.dark} floodOpacity="0.75" />
          <feDropShadow dx="0" dy="0" stdDeviation="4.5" floodColor={t.glow} floodOpacity="0.45" />
        </filter>
      </defs>

      {/* 1. LUXURIOUS BOTANICAL LAUREL WREATH (OUTER WINGS) */}
      <g filter={`url(#${gid}_glow)`}>
        {/* Main Sweeping Laurel Stems */}
        <path
          d="M 68 112 C 40 112 18 94 18 68 C 18 47 30 32 44 24"
          stroke={`url(#${gid}_metal)`}
          strokeWidth="2.2"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 72 112 C 100 112 122 94 122 68 C 122 47 110 32 96 24"
          stroke={`url(#${gid}_metal)`}
          strokeWidth="2.2"
          strokeLinecap="round"
          fill="none"
        />

        {/* LEFT BRANCH LEAF PAIRS (Realistic Botanical Acanthus Leaves) */}
        <path d="M 61 110 C 53 113 46 109 49 103 C 55 105 59 108 61 110 Z" fill={`url(#${gid}_metalHi)`} />
        <path d="M 58 107 C 50 108 45 101 50 96 C 54 99 57 104 58 107 Z" fill={`url(#${gid}_metalShade)`} />
        <path d="M 49 102 C 40 104 34 97 39 91 C 44 94 48 99 49 102 Z" fill={`url(#${gid}_metalHi)`} />
        <path d="M 45 96 C 36 96 32 88 38 84 C 42 88 44 93 45 96 Z" fill={`url(#${gid}_metalShade)`} />
        <path d="M 36 89 C 26 90 22 81 29 76 C 33 81 35 86 36 89 Z" fill={`url(#${gid}_metalHi)`} />
        <path d="M 33 82 C 24 81 22 72 29 69 C 32 74 33 79 33 82 Z" fill={`url(#${gid}_metalShade)`} />
        <path d="M 26 74 C 16 73 14 63 23 60 C 26 65 26 71 26 74 Z" fill={`url(#${gid}_metalHi)`} />
        <path d="M 25 66 C 16 63 17 53 25 52 C 27 58 27 63 25 66 Z" fill={`url(#${gid}_metalShade)`} />
        <path d="M 22 57 C 13 52 16 41 24 41 C 26 47 25 53 22 57 Z" fill={`url(#${gid}_metalHi)`} />
        <path d="M 24 49 C 16 43 21 33 28 35 C 29 41 27 46 24 49 Z" fill={`url(#${gid}_metalShade)`} />
        <path d="M 27 39 C 21 31 30 23 36 27 C 35 33 31 37 27 39 Z" fill={`url(#${gid}_metalHi)`} />
        <path d="M 32 32 C 28 23 38 18 43 23 C 41 28 37 31 32 32 Z" fill={`url(#${gid}_metalShade)`} />
        <path d="M 39 24 C 36 15 47 13 49 20 C 46 23 42 24 39 24 Z" fill={`url(#${gid}_metalHi)`} />

        {/* RIGHT BRANCH LEAF PAIRS (Symmetrical Sibling) */}
        <path d="M 79 110 C 87 113 94 109 91 103 C 85 105 81 108 79 110 Z" fill={`url(#${gid}_metalHi)`} />
        <path d="M 82 107 C 90 108 95 101 90 96 C 86 99 83 104 82 107 Z" fill={`url(#${gid}_metalShade)`} />
        <path d="M 91 102 C 100 104 106 97 101 91 C 96 94 92 99 91 102 Z" fill={`url(#${gid}_metalHi)`} />
        <path d="M 95 96 C 104 96 108 88 102 84 C 98 88 96 93 95 96 Z" fill={`url(#${gid}_metalShade)`} />
        <path d="M 104 89 C 114 90 118 81 111 76 C 107 81 105 86 104 89 Z" fill={`url(#${gid}_metalHi)`} />
        <path d="M 107 82 C 116 81 118 72 111 69 C 108 74 107 79 107 82 Z" fill={`url(#${gid}_metalShade)`} />
        <path d="M 114 74 C 124 73 126 63 117 60 C 114 65 114 71 114 74 Z" fill={`url(#${gid}_metalHi)`} />
        <path d="M 115 66 C 124 63 123 53 115 52 C 113 58 113 63 115 66 Z" fill={`url(#${gid}_metalShade)`} />
        <path d="M 118 57 C 127 52 124 41 116 41 C 114 47 115 53 118 57 Z" fill={`url(#${gid}_metalHi)`} />
        <path d="M 116 49 C 124 43 119 33 112 35 C 111 41 113 46 116 49 Z" fill={`url(#${gid}_metalShade)`} />
        <path d="M 113 39 C 119 31 110 23 104 27 C 105 33 109 37 113 39 Z" fill={`url(#${gid}_metalHi)`} />
        <path d="M 108 32 C 112 23 102 18 97 23 C 99 28 103 31 108 32 Z" fill={`url(#${gid}_metalShade)`} />
        <path d="M 101 24 C 104 15 93 13 91 20 C 94 23 98 24 101 24 Z" fill={`url(#${gid}_metalHi)`} />

        {/* Ceremonial Flowing Ribbon Knot at Bottom */}
        <path d="M 66 113 C 58 119 50 128 54 129 C 59 130 65 120 68 115 Z" fill={`url(#${gid}_metalHi)`} />
        <path d="M 74 113 C 82 119 90 128 86 129 C 81 130 75 120 72 115 Z" fill={`url(#${gid}_metalShade)`} />
        <circle cx="70" cy="113" r="3.6" fill={`url(#${gid}_rim)`} stroke={t.shadow} strokeWidth="0.6" />
        <circle cx="70" cy="113" r="1.8" fill={t.light} />
      </g>

      {/* 2. SOLID COIN BODY & BEVELED EDGES */}
      <circle cx="70" cy="68" r="38.5" fill="none" stroke={`url(#${gid}_rim)`} strokeWidth="3" filter={`url(#${gid}_glow)`} />
      <circle cx="70" cy="68" r="36" fill="none" stroke="#050711" strokeWidth="1.6" />
      <circle cx="70" cy="68" r="35" fill={`url(#${gid}_coin)`} stroke={`url(#${gid}_metal)`} strokeWidth="0.8" />
      <circle cx="70" cy="68" r="32.5" fill="none" stroke={`url(#${gid}_metal)`} strokeWidth="1.2" strokeDasharray="1.8 2.6" strokeLinecap="round" opacity="0.85" />
      <circle cx="70" cy="68" r="30.2" fill="none" stroke={t.mid2} strokeWidth="0.5" opacity="0.45" />

      {/* 3. ROYAL IMPERIAL CROWN (Seamlessly Adorned on Apex) */}
      <g filter={`url(#${gid}_glow)`}>
        {/* Base Filigree Band */}
        <path
          d="M 48 31 Q 70 34.5 92 31 L 93 34.5 Q 70 38 47 34.5 Z"
          fill={`url(#${gid}_rim)`}
          stroke={t.shadow}
          strokeWidth="0.5"
        />
        {/* Inset Cabochon Jewels on Band */}
        <ellipse cx="70" cy="34.5" rx="2.2" ry="1.4" fill={t.gem1} stroke={t.light} strokeWidth="0.4" />
        <ellipse cx="58" cy="33.8" rx="1.6" ry="1.1" fill={t.gem2} stroke={t.light} strokeWidth="0.3" />
        <ellipse cx="82" cy="33.8" rx="1.6" ry="1.1" fill={t.gem2} stroke={t.light} strokeWidth="0.3" />

        {/* Crown Arches & Spires */}
        <path
          d="M 48 31 L 50 17 L 59 23 L 70 7 L 81 23 L 90 17 L 92 31 Q 70 34.5 48 31 Z"
          fill={`url(#${gid}_metal)`}
          stroke={t.shadow}
          strokeWidth="0.7"
          strokeLinejoin="round"
        />

        {/* Crown Spire Pearls / Gems */}
        <circle cx="70" cy="7" r="3" fill={t.light} stroke={t.mid2} strokeWidth="0.6" />
        <polygon points="70,5 71,6.5 73,7 71,7.5 70,9 69,7.5 67,7 69,6.5" fill="#ffffff" />
        <circle cx="59" cy="23" r="2" fill={t.light} stroke={t.mid2} strokeWidth="0.5" />
        <circle cx="81" cy="23" r="2" fill={t.light} stroke={t.mid2} strokeWidth="0.5" />
        <circle cx="50" cy="17" r="1.8" fill={t.light} stroke={t.mid2} strokeWidth="0.5" />
        <circle cx="90" cy="17" r="1.8" fill={t.light} stroke={t.mid2} strokeWidth="0.5" />
      </g>

      {/* 4. INNER COIN CONTENTS (Center Star, Number, PRIZE Pill, Stars) */}
      <polygon
        points="70,38 71.8,42.4 76.5,42.7 72.8,45.6 74,50 70,47.4 66,50 67.2,45.6 63.5,42.7 68.2,42.4"
        fill={`url(#${gid}_metalHi)`}
        style={{ filter: `drop-shadow(0 0 2px ${t.glow})` }}
      />

      <text
        x="68"
        y="65"
        textAnchor="end"
        fontFamily="'Cinzel', 'Playfair Display', Georgia, serif"
        fontSize="25"
        fontWeight="900"
        fill={`url(#${gid}_metalHi)`}
        style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.95))' }}
      >
        {rank}
      </text>
      <text
        x="69"
        y="55"
        textAnchor="start"
        fontFamily="'Cinzel', 'Playfair Display', Georgia, serif"
        fontSize="10.5"
        fontWeight="800"
        fill={t.accent}
        style={{ filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.9))' }}
      >
        {suffix}
      </text>

      {/* PRIZE Banner Pill */}
      <g filter={`url(#${gid}_glow)`}>
        <rect
          x="46"
          y="75.5"
          width="48"
          height="13"
          rx="6.5"
          fill="rgba(5, 8, 18, 0.96)"
          stroke={`url(#${gid}_rim)`}
          strokeWidth="1.2"
        />
        <text
          x="70"
          y="84.8"
          textAnchor="middle"
          fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          fontWeight="800"
          fontSize="7.8"
          letterSpacing="2.2"
          fill={t.accent}
        >
          PRIZE
        </text>
      </g>

      {/* 3 Heraldic Stars Underneath Banner */}
      <polygon points="70,92.5 70.8,94.4 72.8,94.5 71.2,95.8 71.7,97.7 70,96.5 68.3,97.7 68.8,95.8 67.2,94.5 69.2,94.4" fill={`url(#${gid}_metalHi)`} />
      <polygon points="62.5,91.8 63.1,93.4 64.8,93.5 63.5,94.5 63.9,96.1 62.5,95.1 61.1,96.1 61.5,94.5 60.2,93.5 61.9,93.4" fill={`url(#${gid}_metalHi)`} opacity="0.85" />
      <polygon points="77.5,91.8 78.1,93.4 79.8,93.5 78.5,94.5 78.9,96.1 77.5,95.1 76.1,96.1 76.5,94.5 75.2,93.5 76.9,93.4" fill={`url(#${gid}_metalHi)`} opacity="0.85" />
    </svg>
  );
};

// 5 Lucky Winners Data with Olympic / Royal Tiered Metallic Styling
const luckyWinnersData = [
  {
    id: 1,
    rank: 1,
    rankSuffix: 'ST',
    themeKey: 'gold',
    name: 'Rohith Kumar',
    location: 'Hyderabad',
    prize: '₹10,000',
    ticketNumber: 'DD-2026-HYD-50K',
    prizeAmount: '₹10,000',
    prizeTitle: '1st Prize Champion (Hyderabad)',
    drawDate: '10 Nov 2026',
    winnerName: 'Rohith Kumar'
  },
  {
    id: 2,
    rank: 2,
    rankSuffix: 'ND',
    themeKey: 'silver',
    name: 'Sravani Reddy',
    location: 'Vijayawada',
    prize: '₹9,500',
    ticketNumber: 'DD-2026-VIJ-25K',
    prizeAmount: '₹9,500',
    prizeTitle: '2nd Prize Winner (Vijayawada)',
    drawDate: '10 Nov 2026',
    winnerName: 'Sravani Reddy'
  },
  {
    id: 3,
    rank: 3,
    rankSuffix: 'RD',
    themeKey: 'bronze',
    name: 'Manoj Naik',
    location: 'Bengaluru',
    prize: '₹9,000',
    ticketNumber: 'DD-2026-BLR-10K',
    prizeAmount: '₹9,000',
    prizeTitle: '3rd Prize Winner (Bengaluru)',
    drawDate: '10 Nov 2026',
    winnerName: 'Manoj Naik'
  },
  {
    id: 4,
    rank: 4,
    rankSuffix: 'TH',
    themeKey: 'amber',
    name: 'Keerthi Chowdary',
    location: 'Chennai',
    prize: '₹8,500',
    ticketNumber: 'DD-2026-CHN-10K',
    prizeAmount: '₹8,500',
    prizeTitle: '4th Prize Winner (Chennai)',
    drawDate: '10 Nov 2026',
    winnerName: 'Keerthi Chowdary'
  },
  {
    id: 5,
    rank: 5,
    rankSuffix: 'TH',
    themeKey: 'copper',
    name: 'Akhil Varma',
    location: 'Visakhapatnam',
    prize: '₹8,000',
    ticketNumber: 'DD-2026-VSKP-10K',
    prizeAmount: '₹8,000',
    prizeTitle: '5th Prize Winner (Visakhapatnam)',
    drawDate: '10 Nov 2026',
    winnerName: 'Akhil Varma'
  }
];

// Pristine Mathematically Centered & Interactive Winner Card
const SingleWinnerCard = ({ winner, isActive = false, onSelect }) => {
  const navigate = useNavigate();
  const [tilt, setTilt] = useState({ x: 0, y: 0, isHovered: false });
  const theme = WINNER_THEMES[winner.themeKey] || WINNER_THEMES.gold;

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 10, y: -y * 10, isHovered: true });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0, isHovered: false });
  };

  const handleVerifyClick = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (onSelect) {
      onSelect(winner);
    }
    navigate('/winners', {
      state: {
        selectedWinner: winner,
        ticketNumber: winner.ticketNumber,
        winnerId: winner.id
      }
    });
  };

  return (
    <div
      onClick={handleVerifyClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleVerifyClick(e);
        }
      }}
      aria-label={`Verify winner ${winner.name} on Winners page`}
      className={`relative flex flex-col items-center justify-between rounded-2xl transition-all duration-300 cursor-pointer select-none group ${isActive ? 'scale-105 z-10' : ''
        }`}
      style={{
        transform: tilt.isHovered
          ? `perspective(800px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) translateY(-6px) scale(1.025)`
          : isActive
            ? 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(-4px) scale(1.02)'
            : 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)',
        width: '100%',
        maxWidth: '222px',
        minHeight: '304px',
        background: 'linear-gradient(180deg, rgba(16, 22, 44, 0.92) 0%, rgba(8, 12, 26, 0.96) 100%)',
        border: (tilt.isHovered || isActive) ? `1.5px solid ${theme.borderHover}` : `1px solid ${theme.border}`,
        boxShadow: tilt.isHovered
          ? `0 16px 36px rgba(0, 0, 0, 0.65), 0 0 32px ${theme.glow}, inset 0 1px 0 rgba(255, 255, 255, 0.15)`
          : isActive
            ? `0 12px 28px rgba(0, 0, 0, 0.55), 0 0 24px ${theme.glow}, inset 0 1px 0 rgba(255, 255, 255, 0.12)`
            : `0 0 20px ${theme.glow}, inset 0 1px 0 rgba(255, 255, 255, 0.08)`,
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        padding: '12px 10px 10px 10px',
        boxSizing: 'border-box'
      }}
    >
      {/* Dynamic Holographic Light Glint sweep across card on hover */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform -rotate-45 group-hover:translate-x-full transition-transform duration-1000 ease-out" />
      </div>

      {/* Sovereign Botanical Prize Medal Crest (Crown + Laurel Wreath + Centered Medallion) */}
      <div className="w-[112px] h-[106px] sm:w-[118px] sm:h-[112px] flex items-center justify-center shrink-0 my-0.5 group-hover:scale-105 transition-transform duration-300">
        <PrizeMedalCrest
          rank={winner.rank}
          suffix={winner.rankSuffix}
          themeKey={winner.themeKey}
          className="w-full h-full"
        />
      </div>

      {/* Winner Name */}
      <h3 className="font-serif text-[15px] sm:text-[15.5px] font-semibold text-white tracking-wide mt-1 text-center truncate w-full group-hover:text-[#ffd875] transition-colors">
        {winner.name}
      </h3>

      {/* Location */}
      <div className="flex items-center justify-center gap-1 mt-0.5 text-center text-[11px] sm:text-xs text-[#cbd5e1] font-sans">
        <MapPin size={11} style={{ color: theme.accent }} className="shrink-0" />
        <span className="truncate">{winner.location}</span>
      </div>

      {/* Prize Card / Pill */}
      <div
        className="mt-2.5 w-full rounded-xl py-1.5 px-2 text-center transition-all duration-300 group-hover:border-opacity-100"
        style={{
          background: 'rgba(4, 6, 14, 0.94)',
          border: `1px solid ${theme.border}`,
          boxShadow: `inset 0 1px 3px rgba(0, 0, 0, 0.7), 0 0 10px ${theme.glow}`
        }}
      >
        <span
          className="block font-serif italic text-[11px] tracking-wider leading-none"
          style={{ color: theme.accent }}
        >
          Won
        </span>
        <span className="block font-serif font-bold text-base sm:text-[17px] text-white tracking-tight leading-tight mt-0.5">
          {winner.prize}
        </span>
      </div>

      {/* Premium Clean Interactive Verification Pill Button with Moving Round Arrow Badge */}
      <button
        type="button"
        onClick={handleVerifyClick}
        className="group/btn relative w-full mt-2.5 py-1.5 pl-4 pr-2.5 rounded-full flex items-center justify-between overflow-hidden cursor-pointer select-none transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
        style={{
          background: 'linear-gradient(90deg, rgba(18, 24, 48, 0.9) 0%, rgba(28, 38, 72, 0.95) 50%, rgba(18, 24, 48, 0.9) 100%)',
          border: `1px solid ${theme.border}`,
          boxShadow: `0 2px 8px rgba(0, 0, 0, 0.5), 0 0 10px ${theme.glow}, inset 0 1px 0 rgba(255, 255, 255, 0.15)`
        }}
        aria-label={`Verify winner ${winner.name}`}
      >
        {/* Holographic shimmer light glint sweep on hover */}
        <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

        {/* CLICK TO VERIFY text */}
        <span
          className="font-sans font-bold text-[9.5px] sm:text-[10px] tracking-[0.12em] uppercase transition-colors duration-200 group-hover/btn:text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]"
          style={{ color: theme.accent }}
        >
          CLICK TO VERIFY
        </span>

        {/* Right: Round Metallic Background WITH arrow inside moving together forward & backward */}
        <span
          className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300 group-hover/btn:scale-105 shadow-sm animate-arrow-back-forth"
          style={{
            background: `linear-gradient(135deg, ${theme.light} 0%, ${theme.mid1} 50%, ${theme.mid2} 100%)`,
            color: '#120b04',
            boxShadow: `0 0 8px ${theme.glow}`
          }}
        >
          <ArrowRight className="w-2.5 h-2.5 stroke-[2.8]" />
        </span>
      </button>
    </div>
  );
};

export default function Home() {
  const [homeData, setHomeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedWinner, setSelectedWinner] = useState(null);
  const [activeFaq, setActiveFaq] = useState(null);
  const [selectedOfferTier, setSelectedOfferTier] = useState('special-offer-2');
  // Finite Smooth Carousel for Lucky Winners (has distinct Start and End)
  const [winnerSlideIndex, setWinnerSlideIndex] = useState(0);
  const [winnerStepWidth, setWinnerStepWidth] = useState(0);
  const winnerTrackRef = useRef(null);
  const [winnerTouchStart, setWinnerTouchStart] = useState(0);

  // 9 Slides so that on desktop all 5 positions from 0 to 4 are fully populated without empty void
  const winnerSlides = useMemo(
    () => [
      ...luckyWinnersData.map((w, idx) => ({ ...w, instanceKey: `w-${w.id}-0` })),
      ...luckyWinnersData.slice(0, 4).map((w, idx) => ({ ...w, instanceKey: `w-${w.id}-1` }))
    ],
    []
  );

  const maxWinnerSlide = luckyWinnersData.length - 1; // 4 (Total 5 winners)
  const isWinnerAtStart = winnerSlideIndex <= 0;
  const isWinnerAtEnd = winnerSlideIndex >= maxWinnerSlide;

  useEffect(() => {
    const updateWinnerStep = () => {
      if (winnerTrackRef.current && winnerTrackRef.current.children.length > 1) {
        const c0 = winnerTrackRef.current.children[0];
        const c1 = winnerTrackRef.current.children[1];
        const step = c1.offsetLeft - c0.offsetLeft;
        if (step > 0) {
          setWinnerStepWidth(step);
        }
      }
    };

    updateWinnerStep();
    const t1 = setTimeout(updateWinnerStep, 60);
    const t2 = setTimeout(updateWinnerStep, 250);
    window.addEventListener('resize', updateWinnerStep);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener('resize', updateWinnerStep);
    };
  }, []);

  const handlePrevWinner = () => {
    if (winnerSlideIndex <= 0) return;
    setWinnerSlideIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNextWinner = () => {
    if (winnerSlideIndex >= maxWinnerSlide) return;
    setWinnerSlideIndex((prev) => Math.min(maxWinnerSlide, prev + 1));
  };

  const handleWinnerTouchStart = (e) => {
    setWinnerTouchStart(e.touches[0].clientX);
  };

  const handleWinnerTouchEnd = (e) => {
    const touchEnd = e.changedTouches[0].clientX;
    const diff = winnerTouchStart - touchEnd;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNextWinner();
      } else {
        handlePrevWinner();
      }
    }
  };

  const activeWinnerDot = winnerSlideIndex;

  const handleDotClick = (i) => {
    setWinnerSlideIndex(Math.max(0, Math.min(maxWinnerSlide, i)));
  };

  useEffect(() => {
    async function loadData() {
      try {
        const res = await api.getHomeData();
        if (res.success) {
          setHomeData(res.data);
        }
      } catch (err) {
        console.error('Failed to load home data from API:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const draw = homeData?.draw || {
    scheduledAt: '2026-11-10T13:30:00.000Z',
    displayDate: '10 Nov 2026',
    displayTime: '07:00 PM (IST)',
    totalPrizePool: '8 Lakhs+'
  };

  // 1. Default Special Offers (3 Colorful Cards matching reference)
  const defaultOffers = [
    {
      id: 'offer-1',
      badge: 'Starter Dhamaka',
      title: '10 Entry',
      subtitle: 'Single Entry Pass',
      description: 'Enter the grand lucky draw for just 10. Quick entry with certified random draw verification.',
      features: [
        '1 Verified Digital Ticket',
        'Standard Draw Eligibility',
        'Instant SMS & WhatsApp Confirmation'
      ],
      image: icon2,
      ctaText: 'Get 10 Ticket',
      ctaLink: '/participate',
      popular: false
    },
    {
      id: 'offer-2',
      badge: 'Most Popular • 3x Chances',
      title: 'Festival Special',
      subtitle: '3 Tickets + Diwali Diya Gift',
      description: 'Tripled winning probability with 3 unique tickets plus festive digital reward tokens.',
      features: [
        '3 Unique Ticket Numbers',
        '3x Win Probability Multiplier',
        'Exclusive Festive Bonus Pool'
      ],
      image: icon1,
      ctaText: 'Claim Festival Special',
      ctaLink: '/participate',
      popular: true
    },
    {
      id: 'offer-3',
      badge: 'VIP Tier • 5x Entries',
      title: 'Early Bird Bonus',
      subtitle: '5 Tickets + VIP Draw Access',
      description: 'Register early to unlock 5 entry numbers and access the VIP early-bird prize pool.',
      features: [
        '5 Cryptographic Ticket Entries',
        'Priority Draw Queue & VIP Status',
        'Certified Direct gift delivery'
      ],
      image: giftImg,
      ctaText: 'Unlock Early Bonus',
      ctaLink: '/participate',
      popular: false
    }
  ];

  // 2. Default Grand Prizes (3 Premium Reference Cards)
  const defaultGrandPrizes = [
    {
      id: 'gp-1',
      title: '1st Prize',
      subtitle: 'Grand Bumper ₹10,000',
      description: 'Claim the ultimate grand bumper prize of ₹10,000 in gifts! Make this Diwali truly unforgettable with our most exclusive festival offer.',
      image: prizeTrophy,
      animClass: 'animate-trophy-hover',
      auraColor: 'from-[#ffe58f]/40 via-[#c084fc]/30 to-[#f5c64c]/20',
      bgGradient: 'bg-gradient-to-b from-[#280c4e] via-[#140626] to-[#0a0314]',
      borderColor: 'border-[#f5c64c]/90',
      glowShadow: 'shadow-[0_0_25px_rgba(168,85,247,0.32),0_0_10px_rgba(245,198,76,0.25)] hover:shadow-[0_0_35px_rgba(192,132,252,0.5),0_0_15px_rgba(245,198,76,0.4)]',
      goldGlow: 'rgba(168, 85, 247, 0.55)',
      mandalaColor: 'text-[#c084fc]/35',
      link: '/prizes'
    },
    {
      id: 'gp-2',
      title: 'Festival Special',
      subtitle: 'Smart Entertainment Suite',
      description: 'Win a premium Smartwatch & Wireless Earbuds combo, plus ₹10,000! Celebrate Diwali with exciting tech rewards and a chance to win big.',
      image: prizeGift,
      animClass: 'animate-gift-hover',
      auraColor: 'from-[#ffe58f]/40 via-[#f87171]/30 to-[#f5c64c]/20',
      bgGradient: 'bg-gradient-to-b from-[#4e0c18] via-[#2d050e] to-[#160207]',
      borderColor: 'border-[#f5c64c]/90',
      glowShadow: 'shadow-[0_0_25px_rgba(239,68,68,0.32),0_0_10px_rgba(245,198,76,0.25)] hover:shadow-[0_0_35px_rgba(248,113,113,0.5),0_0_15px_rgba(245,198,76,0.4)]',
      goldGlow: 'rgba(245, 158, 11, 0.55)',
      mandalaColor: 'text-[#f87171]/30',
      link: '/prizes'
    },
    {
      id: 'gp-3',
      title: 'Early Bird Bonus',
      subtitle: 'Smart Home & premium gift',
      description: 'Take home an Alexa Smart Speaker along with ₹10,000! Be an early bird and secure your chance to win these amazing rewards this Diwali.',
      image: prizeStar,
      animClass: 'animate-star-hover',
      auraColor: 'from-[#ffe58f]/40 via-[#34d399]/30 to-[#f5c64c]/20',
      bgGradient: 'bg-gradient-to-b from-[#093522] via-[#041f14] to-[#02120b]',
      borderColor: 'border-[#f5c64c]/90',
      glowShadow: 'shadow-[0_0_25px_rgba(16,185,129,0.32),0_0_10px_rgba(245,198,76,0.25)] hover:shadow-[0_0_35px_rgba(52,211,153,0.5),0_0_15px_rgba(245,198,76,0.4)]',
      goldGlow: 'rgba(16, 185, 129, 0.55)',
      mandalaColor: 'text-[#34d399]/30',
      link: '/prizes'
    }
  ];

  // 3. Default Live Prizes (4 Premium Glass Cards Matching Reference)
  const defaultLivePrizes = [
    {
      id: 'lp-1',
      rank: '1st Prize',
      amount: '₹10,000',
      image: liveTrophyGold,
      isTextPrize: false,
      accent: 'gold',
      cardBg: 'linear-gradient(135deg, rgba(38, 22, 6, 0.82) 0%, rgba(18, 10, 2, 0.92) 100%)',
      borderClass: 'border-[#d4af37]/55 hover:border-[#f5cb5c]/90',
      glowShadow: 'shadow-[0_8px_28px_rgba(0,0,0,0.55),0_0_15px_rgba(212,175,55,0.2)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.65),0_0_24px_rgba(245,203,92,0.38)]',
      flareColor: '#f5a623',
      flareCenterColor: '#ffe58f',
      visualAura: 'rgba(245, 166, 35, 0.25)',
      dividerColor: '#e5b32f',
      titleColor: '#ffe58f'
    },
    {
      id: 'lp-2',
      rank: '2nd Prize',
      amount: '₹9,500',
      image: liveTrophySilver,
      isTextPrize: false,
      accent: 'blue',
      cardBg: 'linear-gradient(135deg, rgba(4, 22, 54, 0.82) 0%, rgba(2, 10, 32, 0.92) 100%)',
      borderClass: 'border-[#0099ff]/55 hover:border-[#38bdf8]/90',
      glowShadow: 'shadow-[0_8px_28px_rgba(0,0,0,0.55),0_0_15px_rgba(0,153,255,0.22)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.65),0_0_24px_rgba(56,189,248,0.42)]',
      flareColor: '#00a8ff',
      flareCenterColor: '#e0f2fe',
      visualAura: 'rgba(0, 168, 255, 0.25)',
      dividerColor: '#38bdf8',
      titleColor: '#bae6fd'
    },
    {
      id: 'lp-3',
      rank: '3rd Prize',
      amount: '₹9,000',
      image: liveTrophyBronze,
      isTextPrize: false,
      accent: 'bronze',
      cardBg: 'linear-gradient(135deg, rgba(38, 16, 5, 0.82) 0%, rgba(18, 7, 2, 0.92) 100%)',
      borderClass: 'border-[#e66a00]/55 hover:border-[#fb923c]/90',
      glowShadow: 'shadow-[0_8px_28px_rgba(0,0,0,0.55),0_0_15px_rgba(230,106,0,0.22)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.65),0_0_24px_rgba(251,146,60,0.42)]',
      flareColor: '#ff7a00',
      flareCenterColor: '#fed7aa',
      visualAura: 'rgba(255, 122, 0, 0.25)',
      dividerColor: '#fb923c',
      titleColor: '#fed7aa'
    },
    {
      id: 'lp-4',
      rank: '10+ Festival Rewards',
      amount: '& Many More Exciting Prizes',
      image: liveGiftPurple,
      isTextPrize: true,
      accent: 'purple',
      cardBg: 'linear-gradient(135deg, rgba(32, 6, 56, 0.82) 0%, rgba(14, 2, 28, 0.92) 100%)',
      borderClass: 'border-[#9333ea]/55 hover:border-[#c084fc]/90',
      glowShadow: 'shadow-[0_8px_28px_rgba(0,0,0,0.55),0_0_15px_rgba(147,51,234,0.22)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.65),0_0_24px_rgba(192,132,252,0.42)]',
      flareColor: '#c026d3',
      flareCenterColor: '#f5d0fe',
      visualAura: 'rgba(192, 38, 211, 0.25)',
      dividerColor: '#c084fc',
      titleColor: '#f5d0fe'
    }
  ];

  // 4. Default Lucky Winners
  const defaultWinners = [
    {
      id: 'w-1',
      maskedName: 'Ramesh K****',
      shortTicket: 'DD-2026-45872',
      ticketNumber: 'DD-2026-45872',
      prizeAmount: '₹50,000',
      prizeTitle: 'Mega Jackpot Winner',
      city: 'Hyderabad, Telangana'
    },
    {
      id: 'w-2',
      maskedName: 'Priya S****',
      shortTicket: 'DD-2026-12493',
      ticketNumber: 'DD-2026-12493',
      prizeAmount: '₹25,000',
      prizeTitle: '2nd Prize Bumper Winner',
      city: 'Bangalore, Karnataka'
    },
    {
      id: 'w-3',
      maskedName: 'Anil M****',
      shortTicket: 'DD-2026-98124',
      ticketNumber: 'DD-2026-98124',
      prizeAmount: '₹10,000',
      prizeTitle: '3rd Prize Winner',
      city: 'Mumbai, Maharashtra'
    },
    {
      id: 'w-4',
      maskedName: 'Sunita D****',
      shortTicket: 'DD-2026-33901',
      ticketNumber: 'DD-2026-33901',
      prizeAmount: '₹5,000',
      prizeTitle: 'Festive Bonus Winner',
      city: 'Delhi NCR'
    }
  ];

  // 5. Default FAQs
  const defaultFaqs = [
    {
      id: 'faq-1',
      question: 'How do I participate in the Diwali Dhamaka lucky draw?',
      answer: 'Participating is simple! Click on "Enter Lucky Draw", enter your valid mobile number, verify via OTP, choose your participation tier, and your unique cryptographically stamped ticket number will be generated instantly.'
    },
    {
      id: 'faq-2',
      question: 'How are the winners selected and is it transparent?',
      answer: 'The lucky draw is conducted transparently via a certified cryptographically secure Random Number Generator (RNG). The draw is broadcasted live on our platform on 10 November 2026 at 07:00 PM (IST).'
    },
    {
      id: 'faq-3',
      question: 'When and how will I receive my prize money if I win?',
      answer: 'All premium gifts are transferred directly to verified registered addresses via secure logistics within 24 to 48 business hours following identity verification and TDS compliance.'
    },
    {
      id: 'faq-4',
      question: 'Can I purchase more than one ticket to increase my chances?',
      answer: 'Yes! You can choose our "Festival Special" tier (3 tickets) or "Early Bird Bonus" tier (5 tickets) to receive multiple unique ticket numbers, proportionally multiplying your chances to win.'
    },
    {
      id: 'faq-5',
      question: 'Where can I check my ticket status after registering?',
      answer: 'You can check your ticket anytime on our "Ticket Details" page by entering your unique ticket code (e.g. DD-2026-XXXXX) or through the SMS link sent to your registered mobile number.'
    }
  ];

  const offers = homeData?.offers && homeData.offers.length > 0 ? homeData.offers : defaultOffers;
  const recentWinners = homeData?.recentWinners && homeData.recentWinners.length > 0 ? homeData.recentWinners : defaultWinners;
  const faqs = homeData?.faqs && homeData.faqs.length > 0 ? homeData.faqs : defaultFaqs;

  return (
    <div className="relative min-h-screen">
      {/* --------------------------------------------------------------------- */}
      {/* 1. HERO SECTION                                                       */}
      {/* --------------------------------------------------------------------- */}
      {/* --------------------------------------------------------------------- */}
      {/* 1. HERO SECTION                                                       */}
      {/* --------------------------------------------------------------------- */}
      <section className="relative min-h-[100dvh] sm:min-h-[92vh] flex items-center justify-center pt-20 sm:pt-28 pb-12 sm:pb-0 overflow-hidden bg-[#050614]">
        {/* Hero Background Image Layer - Covers seamlessly on mobile, contain/cover on desktop */}
        <div
          className="absolute inset-0 bg-cover bg-center sm:bg-contain sm:bg-top bg-no-repeat transition-all"
          style={{ backgroundImage: `url(${heroBg})` }}
        ></div>

        {/* Ambient Gradient Overlays for Readability and Seamless Bottom Blending */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050614]/85 via-[#050614]/65 to-[#050614] sm:bg-gradient-to-r sm:from-[#050614]/95 sm:via-[#050614]/60 sm:to-transparent w-full lg:w-[70%]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(229,179,47,0.18)_0%,transparent_70%)] pointer-events-none"></div>

        {/* Floating Sparks */}
        <FestiveParticles count={30} />

        <div className="relative z-10 w-full px-4 sm:px-12 lg:px-24 pt-2 sm:pt-6 flex flex-col lg:flex-row items-center">
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-4 sm:space-y-6 w-full lg:w-1/2 max-w-xl mx-auto sm:mx-0">

            {/* Festive Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1e153b]/90 border border-[#e5b32f]/40 text-[#ffe58f] text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-gold-glow animate-pulse-slow">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>DIWALI DHAMAKA 2026 • OFFICIAL LUCKY DRAW</span>
            </div>

            {/* Main Title & Subtitle */}
            <div className="space-y-1 sm:space-y-2 relative z-10 w-full">
              {/* Soft glow behind the text to make it pop */}
              <div className="absolute -inset-10 bg-[radial-gradient(ellipse_at_center,rgba(229,179,47,0.15)_0%,transparent_60%)] pointer-events-none blur-2xl -z-10"></div>

              <h1 className="font-serif italic text-4xl xs:text-5xl sm:text-7xl md:text-[6.5rem] font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-[#ffffff] via-[#facc15] to-[#b45309] drop-shadow-[0_8px_20px_rgba(0,0,0,0.9)] leading-[1.08] pb-1">
                Diwali
                <br />
                Dhamaka
              </h1>

              <div className="pt-0 pb-1 sm:pb-3 flex justify-center sm:justify-start">
                <img
                  src={luckyDrawImg}
                  alt="Lucky Draw"
                  className="w-auto h-16 xs:h-20 sm:h-28 md:h-36 object-contain animate-ribbon-float drop-shadow-[0_8px_16px_rgba(0,0,0,0.8)]"
                />
              </div>

              {/* Mobile Countdown Timer (Integrated into flow, so it NEVER overlaps buttons!) */}
              <div className="lg:hidden w-full flex flex-col items-center justify-center my-3">
                <div className="w-full flex justify-center">
                  <CountdownTimer targetDate={draw.scheduledAt} />
                </div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-amber-300/80 mt-1.5 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-amber-400" />
                  <span>Grand Draw: {draw.displayDate} • {draw.displayTime}</span>
                </span>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-start gap-3 sm:gap-4 pt-1 sm:pt-0 w-full">
              <Link
                to="/participate"
                className="w-full sm:w-auto px-7 sm:px-8 py-3.5 rounded-full font-bold text-sm sm:text-base text-[#0b0d1e] bg-gradient-to-r from-[#ffe58f] via-[#e5b32f] to-[#d4af37] shadow-gold-glow hover:shadow-[0_0_35px_rgba(229,179,47,0.75)] hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 group"
              >
                <img src={giftImg} alt="Gift" className="w-7 h-7 sm:w-8 sm:h-8 object-contain animate-gift-tada group-hover:scale-125 transition-transform duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" />
                <span>ENTER LUCKY DRAW</span>
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                to="/prizes"
                className="group relative overflow-hidden w-full sm:w-auto px-6 sm:px-7 py-3.5 rounded-full font-bold text-sm sm:text-base text-[#fcf8f0] bg-[#141633]/85 border border-amber-400/40 backdrop-blur-md shadow-[inset_0_0_15px_rgba(245,158,11,0.1)] hover:shadow-[0_0_25px_rgba(245,158,11,0.4)] hover:border-amber-400 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <div className="absolute top-0 bottom-0 left-0 w-16 bg-gradient-to-r from-transparent via-amber-200/30 to-transparent animate-button-sweep"></div>
                <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 relative z-10" />
                <span className="relative z-10 group-hover:text-amber-300 transition-colors duration-300 tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">VIEW PRIZES</span>
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 relative z-10 group-hover:text-amber-300 group-hover:translate-x-1 transition-all duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" />
              </Link>
            </div>

            {/* Trust Badge */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start justify-center sm:justify-start gap-2 sm:gap-6 text-xs sm:text-sm text-white/75 w-full pt-1">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
                <span>Safe & Secure Participation</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
                <span>Transparent Certified Random Draw</span>
              </div>
            </div>
          </div>

          {/* Right side desktop spacer */}
          <div className="hidden lg:block lg:w-1/2"></div>
        </div>

        {/* Desktop Countdown Timer (positioned at 65% across screen, only on large displays) */}
        <div className="hidden lg:block absolute bottom-6 left-[65%] -translate-x-1/2 z-20 pointer-events-none animate-ribbon-float">
          <div className="pointer-events-auto scale-[0.85] origin-bottom">
            <CountdownTimer targetDate={draw.scheduledAt} />
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------------- */}
      {/* 2. ABOUT THE LUCKY DRAW (Celebrate the Festival of Lights)             */}
      {/* --------------------------------------------------------------------- */}
      <section
        id="about-draw"
        className="relative min-h-[640px] md:min-h-[680px] lg:min-h-[700px] xl:min-h-[720px] flex items-center justify-center pb-10 pt-0 sm:pb-12 sm:pt-0 md:pb-14 md:pt-0 lg:pb-16 lg:pt-0 overflow-hidden border-b border-[#e5b32f]/20"
        style={{
          backgroundImage: `url(${aboutSectionBg})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center top',
          backgroundSize: '100% 100%'
        }}
      >
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-8 lg:gap-10 xl:gap-14">
            {/* Left: Ornate Transparent Arch Artwork (~38-40% width) */}
            <div className="w-full md:w-[38%] lg:w-[38%] xl:w-[40%] flex flex-col items-center justify-center shrink-0 relative">
              {/* Radiant Warm Backlight Aura */}
              <div
                className="absolute w-[80%] h-[80%] rounded-full pointer-events-none -z-10 opacity-35 scale-95 blur-2xl"
                style={{
                  background: 'radial-gradient(circle, rgba(255, 195, 75, 0.45) 0%, rgba(240, 145, 25, 0.25) 40%, rgba(138, 18, 79, 0.12) 65%, transparent 75%)'
                }}
              />

              {/* Arch Container */}
              <div className="relative flex items-center justify-center">
                <img
                  src={aboutSectionArch}
                  alt="Diwali Palace Arch"
                  className="w-full max-w-[280px] sm:max-w-[340px] md:max-w-[370px] lg:max-w-[420px] xl:max-w-[460px] max-h-[480px] lg:max-h-[530px] xl:max-h-[560px] h-auto object-contain select-none drop-shadow-[0_14px_32px_rgba(0,0,0,0.15)]"
                  draggable={false}
                />
              </div>
            </div>

            {/* Right: Overview Description + 3 Benefit Pillars (~60-62% width) */}
            <div className="w-full md:w-[62%] lg:w-[62%] xl:w-[60%] flex flex-col justify-center text-left">
              {/* Eyebrow badge - Premium Diwali Lotus Treatment matching reference */}
              <div className="flex items-center justify-center gap-1.5 sm:gap-2.5 mb-4 sm:mb-5 w-full max-w-[680px]">
                {/* Left tapered horizontal divider line */}
                <div className="h-[1.5px] flex-1 max-w-[60px] sm:max-w-[100px] lg:max-w-[130px] bg-gradient-to-r from-transparent via-[#C8922E]/60 to-[#C8922E]"></div>

                {/* Left gold diamond */}
                <span className="text-[#C8922E] text-[8px] sm:text-[9px] leading-none shrink-0 select-none">◆</span>

                {/* Left subtle gold dots */}
                <div className="flex items-center gap-[2.5px] shrink-0">
                  <span className="w-1 h-1 rounded-full bg-[#C8922E]/70"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C8922E]"></span>
                </div>

                {/* Metallic Golden Lotus Emblem (~30px) */}
                <svg className="w-7 h-6 sm:w-8 sm:h-7 shrink-0 drop-shadow-[0_1px_3px_rgba(200,146,46,0.35)] select-none" viewBox="0 0 36 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="lotusGoldCenter" x1="18" y1="2" x2="18" y2="26" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#FFF4A8" />
                      <stop offset="30%" stopColor="#F5C042" />
                      <stop offset="70%" stopColor="#D98A16" />
                      <stop offset="100%" stopColor="#9C5906" />
                    </linearGradient>
                    <linearGradient id="lotusGoldLeft" x1="7" y1="9" x2="18" y2="26" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#FFECA0" />
                      <stop offset="40%" stopColor="#EEB236" />
                      <stop offset="80%" stopColor="#C47310" />
                      <stop offset="100%" stopColor="#8C4A03" />
                    </linearGradient>
                    <linearGradient id="lotusGoldRight" x1="29" y1="9" x2="18" y2="26" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#FFECA0" />
                      <stop offset="40%" stopColor="#EEB236" />
                      <stop offset="80%" stopColor="#C47310" />
                      <stop offset="100%" stopColor="#8C4A03" />
                    </linearGradient>
                    <linearGradient id="lotusGoldBottom" x1="18" y1="17" x2="18" y2="26" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#F7C64E" />
                      <stop offset="100%" stopColor="#A85E08" />
                    </linearGradient>
                  </defs>
                  {/* Left Bottom Petal */}
                  <path d="M18 26C11 26.5 4 23.5 2 20C4.5 17 11 18 18 26Z" fill="url(#lotusGoldBottom)" />
                  {/* Right Bottom Petal */}
                  <path d="M18 26C25 26.5 32 23.5 34 20C31.5 17 25 18 18 26Z" fill="url(#lotusGoldBottom)" />
                  {/* Left Middle Petal */}
                  <path d="M18 26C14 16 9 11 7 9.5C10 7.5 16 11 18 26Z" fill="url(#lotusGoldLeft)" />
                  {/* Right Middle Petal */}
                  <path d="M18 26C22 16 27 11 29 9.5C26 7.5 20 11 18 26Z" fill="url(#lotusGoldRight)" />
                  {/* Center Petal */}
                  <path d="M18 2C15 9 14.5 17 18 26C21.5 17 21 9 18 2Z" fill="url(#lotusGoldCenter)" />
                  {/* Center ridge shine */}
                  <path d="M18 3V24" stroke="#FFF7C2" strokeWidth="0.75" strokeLinecap="round" opacity="0.6" />
                </svg>

                {/* Right subtle gold dots */}
                <div className="flex items-center gap-[2.5px] shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C8922E]"></span>
                  <span className="w-1 h-1 rounded-full bg-[#C8922E]/70"></span>
                </div>

                {/* Eyebrow Label Text */}
                <span className="font-serif font-semibold text-[18px] sm:text-[19px] lg:text-[21px] text-[#7A173F] tracking-[0.02em] whitespace-nowrap shrink-0">
                  About the Lucky Draw
                </span>

                {/* Right gold diamond */}
                <span className="text-[#C8922E] text-[8px] sm:text-[9px] leading-none shrink-0 select-none">◆</span>

                {/* Right tapered horizontal divider line */}
                <div className="h-[1.5px] flex-1 max-w-[60px] sm:max-w-[100px] lg:max-w-[130px] bg-gradient-to-l from-transparent via-[#C8922E]/60 to-[#C8922E]"></div>
              </div>

              {/* Main Heading (One line on desktop, 44-48px, font-semibold, elegant breathing room) */}
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[45px] xl:text-[48px] font-semibold tracking-normal leading-[1.2] mb-4 sm:mb-4.5 lg:mb-5 whitespace-normal lg:whitespace-nowrap">
                <span className="text-[#131b3e]">Celebrate the </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b37d14] via-[#dfa528] to-[#996515]">
                  Festival of Lights
                </span>
              </h2>

              {/* Supporting Description with professional editorial line-height and breathing room */}
              <p className="text-[#51576d] text-[15px] sm:text-[15.5px] lg:text-[16px] leading-[1.72] tracking-[0.01em] max-w-[700px] mb-6 sm:mb-7 font-normal">
                This Diwali, we bring you a special lucky draw with amazing prizes, exclusive offers and exciting rewards. Simply participate, follow the steps and get a chance to win big. It's our way of adding more joy, happiness and brightness to your celebrations.
              </p>

              {/* 3 Ultra-Premium Interactive Pillar Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-5 xl:gap-6 w-full max-w-[960px] items-stretch">
                <AboutFeatureCard
                  title="Easy Participation"
                  description="Simple steps, quick registration, and instant confirmation."
                  iconType="users"
                />
                <AboutFeatureCard
                  title="Transparent Draw"
                  description="Fair and verified draw process for everyone."
                  iconType="shield"
                />
                <AboutFeatureCard
                  title="Exciting Rewards"
                  description="Amazing prizes, special offers and festive bonuses."
                  iconType="gift"
                />
              </div>

              {/* "KNOW MORE" CTA Button matching reference */}
              <div className="w-full max-w-[960px] flex items-center justify-center mt-6">
                <Link
                  to="/about"
                  className="group relative inline-flex items-center justify-between gap-3.5 h-[46px] w-[172px] px-5 rounded-full text-white overflow-hidden select-none cursor-pointer transition-all duration-300 ease-out shadow-[0_4px_18px_rgba(138,18,79,0.32)] hover:shadow-[0_8px_28px_rgba(200,146,46,0.45),0_4px_18px_rgba(138,18,79,0.4)] hover:-translate-y-0.5"
                  style={{
                    background: 'linear-gradient(135deg, #9C1558 0%, #8A124F 45%, #6E0D3E 100%)',
                    border: '1.5px solid #dfb658'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #AE1B65 0%, #9B1559 45%, #7D0E46 100%)';
                    e.currentTarget.style.borderColor = '#ffe07a';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #9C1558 0%, #8A124F 45%, #6E0D3E 100%)';
                    e.currentTarget.style.borderColor = '#dfb658';
                  }}
                >
                  {/* Subtle luxury light sweep on hover */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

                  {/* Button Text */}
                  <span className="font-serif font-semibold text-[13.5px] tracking-[0.14em] text-[#FFFDF8] uppercase leading-none whitespace-nowrap drop-shadow-sm">
                    Know More
                  </span>

                  {/* Circular Gold Icon Ring with Animated Arrow - Moving forward and backward */}
                  <div className="relative w-[30px] h-[30px] rounded-full border-[1.2px] border-[#dfb658] bg-[#610B36]/60 flex items-center justify-center shrink-0 animate-cta-beckon group-hover:animate-none group-hover:translate-x-1.5 group-hover:border-[#ffe58f] group-hover:bg-[#8A124F] group-hover:scale-108 group-hover:shadow-[0_0_12px_rgba(255,224,122,0.7)] transition-all duration-300 overflow-hidden">
                    <ArrowRight className="w-3.5 h-3.5 text-white stroke-[2.2] transition-transform duration-300 ease-out" />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------------- */}
      {/* 3. HOW IT WORKS TIMELINE                                              */}
      {/* --------------------------------------------------------------------- */}
      <section
        id="how-it-works"
        className="relative w-full overflow-hidden aspect-[1917/861] min-h-fit py-10 sm:py-12 lg:py-0 flex items-center justify-center"
        style={{ aspectRatio: '1917 / 861' }}
      >
        <img
          src={howItWorksBg}
          alt="How It Works Background"
          className="absolute inset-0 w-full h-full pointer-events-none select-none"
          style={{
            objectFit: 'fill'
          }}
        />

        {/* Ambient Slowly Blinking Festive Light Dots Layer */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-10">
          {festiveLightDots.map((dot, idx) => (
            <span
              key={idx}
              className={`absolute rounded-full pointer-events-none ${dot.isFlame ? 'animate-flame-pulse' : 'animate-light-twinkle'
                }`}
              style={{
                left: dot.left,
                top: dot.top,
                width: `${dot.size}px`,
                height: `${dot.size}px`,
                background: dot.isFlame
                  ? 'radial-gradient(circle, #ffffff 0%, #ffeb99 40%, #ff9c1a 75%, transparent 100%)'
                  : 'radial-gradient(circle, #ffffff 0%, #fff3b0 35%, #f5b025 70%, transparent 100%)',
                animationDuration: `${dot.dur}s`,
                animationDelay: `${dot.delay}s`,
              }}
            />
          ))}
        </div>

        {/* Replicated Content Layer matching the Reference Design */}
        <div className="relative z-20 w-full h-full flex flex-col justify-center items-center max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Top Section Header: Clean, Premium Diwali "HOW IT WORKS" Decorative Heading matching Reference */}
          <div className="w-[96%] sm:w-[90%] md:w-[82%] lg:w-[74%] max-w-[940px] mx-auto flex items-center justify-center gap-1.5 sm:gap-2.5 md:gap-3.5 mb-4 sm:mb-5 lg:mb-6 select-none">
            {/* Left Tapered Rule Line */}
            <div className="relative flex-1 flex items-center min-w-[24px] sm:min-w-[50px]">
              <div className="absolute inset-0 h-[3px] bg-gradient-to-r from-transparent via-[#f5cb5c]/40 to-[#ffe58f]/70 blur-[2px]" />
              <div className="relative w-full h-[1.5px] bg-gradient-to-r from-transparent via-[#e5b32f]/85 via-50% via-[#fed45b] to-[#fff3b0] shadow-[0_0_8px_rgba(245,203,92,0.7)]" />
            </div>

            {/* Left Outer Accent: dot • diamond • dot • connector */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              {/* Outer Golden Pearl */}
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gradient-to-tr from-[#c88d12] via-[#ffe382] to-[#ffffff] shadow-[0_0_8px_rgba(255,220,100,0.9)] ring-1 ring-[#ffe58f]/70 shrink-0" />

              {/* Faceted Golden Diamond */}
              <HeadingFacetDiamond />

              {/* Inner Golden Pearl */}
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gradient-to-tr from-[#c88d12] via-[#ffe382] to-[#ffffff] shadow-[0_0_8px_rgba(255,220,100,0.9)] ring-1 ring-[#ffe58f]/70 shrink-0" />

              {/* Golden Connector Bar */}
              <span className="w-3.5 sm:w-5 md:w-6 h-[1.5px] rounded-full bg-gradient-to-r from-[#dfa21a] via-[#ffe895] to-[#f5cb5c] shadow-[0_0_6px_rgba(255,215,90,0.7)] shrink-0" />
            </div>

            {/* Left Delicate Lotus Ornament */}
            <DelicateHeadingLotus mirrored={false} />

            {/* Center Heading Text: HOW IT WORKS */}
            <div className="relative flex items-center justify-center px-1.5 sm:px-3 md:px-4 shrink-0">
              {/* Soft radial gold illumination behind the text for contrast */}
              <div className="absolute -inset-x-4 -inset-y-2 bg-gradient-to-r from-transparent via-amber-400/25 to-transparent blur-md pointer-events-none" />

              <span className="relative font-serif font-black text-xs sm:text-[14.5px] md:text-[16px] lg:text-[17px] tracking-[0.24em] sm:tracking-[0.3em] md:tracking-[0.34em] bg-gradient-to-b from-[#FFFFFF] via-[#FFF3BE] via-45% via-[#F5CB5C] to-[#C98B10] bg-clip-text text-transparent uppercase whitespace-nowrap drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] drop-shadow-[0_0_14px_rgba(245,198,76,0.55)]">
                HOW IT WORKS
              </span>
            </div>

            {/* Right Delicate Lotus Ornament */}
            <DelicateHeadingLotus mirrored={true} />

            {/* Right Outer Accent: connector • dot • diamond • dot */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              {/* Golden Connector Bar */}
              <span className="w-3.5 sm:w-5 md:w-6 h-[1.5px] rounded-full bg-gradient-to-r from-[#f5cb5c] via-[#ffe895] to-[#dfa21a] shadow-[0_0_6px_rgba(255,215,90,0.7)] shrink-0" />

              {/* Inner Golden Pearl */}
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gradient-to-tr from-[#c88d12] via-[#ffe382] to-[#ffffff] shadow-[0_0_8px_rgba(255,220,100,0.9)] ring-1 ring-[#ffe58f]/70 shrink-0" />

              {/* Faceted Golden Diamond */}
              <HeadingFacetDiamond />

              {/* Outer Golden Pearl */}
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gradient-to-tr from-[#c88d12] via-[#ffe382] to-[#ffffff] shadow-[0_0_8px_rgba(255,220,100,0.9)] ring-1 ring-[#ffe58f]/70 shrink-0" />
            </div>

            {/* Right Tapered Rule Line */}
            <div className="relative flex-1 flex items-center min-w-[24px] sm:min-w-[50px]">
              <div className="absolute inset-0 h-[3px] bg-gradient-to-l from-transparent via-[#f5cb5c]/40 to-[#ffe58f]/70 blur-[2px]" />
              <div className="relative w-full h-[1.5px] bg-gradient-to-l from-transparent via-[#e5b32f]/85 via-50% via-[#fed45b] to-[#fff3b0] shadow-[0_0_8px_rgba(245,203,92,0.7)]" />
            </div>
          </div>

          {/* Main Heading: ONE LINE on desktop with stately serif proportions & open kerning */}
          <h2 className="font-serif text-3xl sm:text-4xl md:text-[42px] lg:text-[46px] xl:text-[48px] font-bold tracking-[0.02em] text-[#fffdfa] whitespace-normal lg:whitespace-nowrap leading-[1.25] drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
            Just 4 Simple Steps to{' '}
            <span className="bg-gradient-to-r from-[#ffeaa0] via-[#f7cb52] to-[#d89617] bg-clip-text text-transparent font-extrabold drop-shadow-[0_2px_10px_rgba(245,198,76,0.4)]">
              Win
            </span>
          </h2>

          {/* Subheading with generous breathing room & comfortable reading height */}
          <p className="text-sm sm:text-[15px] md:text-[16px] text-[#e2e8f0]/90 max-w-2xl mx-auto mt-3.5 sm:mt-4 lg:mt-4.5 font-normal tracking-[0.015em] leading-relaxed drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]">
            Get your official Diwali Dhamaka lucky ticket in less than two minutes.
          </p>

          {/* 4 Step Cards in One Row with 3 Circular Arrow Connectors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 xl:gap-5.5 mt-8 sm:mt-10 lg:mt-12 w-full max-w-[1240px]">
            {howItWorksSteps.map((step, idx) => (
              <div
                key={step.num}
                style={{ zIndex: 40 - idx * 5 }}
                className="relative pt-7 pb-6 px-4 sm:px-5 rounded-[22px] bg-gradient-to-b from-[#181136]/92 via-[#10132b]/88 to-[#090b1c]/96 backdrop-blur-xl border border-[#f3c64c]/35 hover:border-[#ffe58f]/80 transition-all duration-400 flex flex-col items-center text-center shadow-[0_15px_40px_-10px_rgba(0,0,0,0.85),0_0_22px_rgba(243,198,76,0.06),inset_0_1px_1px_rgba(255,255,255,0.08)] hover:shadow-[0_22px_50px_-10px_rgba(0,0,0,0.9),0_0_35px_rgba(243,198,76,0.28),inset_0_1px_2px_rgba(255,255,255,0.2)] hover:-translate-y-2 group overflow-visible cursor-pointer"
              >
                {/* Ambient Top Inner Radial Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-44 h-28 bg-[radial-gradient(ellipse_at_top,rgba(243,198,76,0.18),transparent_75%)] pointer-events-none rounded-t-[22px] blur-sm group-hover:scale-125 transition-transform duration-500" />

                {/* Shimmer Light Reflection Sweep on Hover */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/[0.08] to-transparent pointer-events-none rounded-[22px]" />

                {/* 4 Ornate Corner Accents */}
                <CardCornerFlourish position="top-left" />
                <CardCornerFlourish position="top-right" />
                <CardCornerFlourish position="bottom-left" />
                <CardCornerFlourish position="bottom-right" />

                {/* Connecting Arrow between cards (desktop only) with forward-backward animated flow */}
                {idx < 3 && (
                  <div
                    className="hidden lg:flex absolute top-1/2 left-[calc(100%+8px)] xl:left-[calc(100%+11px)] -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-none"
                  >
                    <div
                      className="relative w-8 h-8 xl:w-9 xl:h-9 rounded-full bg-gradient-to-br from-[#281345] via-[#161033] to-[#0a0c20] border-2 border-[#f3c64c] flex items-center justify-center text-[#ffe58f] shadow-[0_0_16px_rgba(243,198,76,0.45),0_4px_12px_rgba(0,0,0,0.8)] animate-connector-glide"
                      style={{
                        animationDelay: `${idx * 0.35}s`
                      }}
                    >
                      {/* Soft ambient ping aura */}
                      <span className="absolute inset-0 rounded-full bg-amber-400/20 animate-ping opacity-60 pointer-events-none" />
                      <ArrowRight
                        className="w-3.5 h-3.5 xl:w-4 xl:h-4 stroke-[2.4] animate-inner-arrow-flow"
                        style={{
                          animationDelay: `${idx * 0.35}s`
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Top Center Circular Number Badge with 24K Gold Beveled Ring */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-b from-[#881337] via-[#590a29] to-[#250310] border-2 border-[#f3c64c] flex items-center justify-center text-[#ffe58f] font-serif font-black text-xs sm:text-sm shadow-[0_4px_16px_rgba(136,19,55,0.8),0_0_14px_rgba(243,198,76,0.5),inset_0_1px_2px_rgba(255,255,255,0.3)] group-hover:scale-110 group-hover:border-[#ffe58f] group-hover:shadow-[0_0_20px_rgba(243,198,76,0.7)] transition-all duration-300 z-30">
                  <span className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] tracking-wider">{step.num}</span>
                </div>

                {/* Concentric Circular Icon Well */}
                <div className="relative w-15 h-15 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-[#2a1745]/90 via-[#18133b]/95 to-[#0b0d22] border border-[#f3c64c]/40 flex items-center justify-center mb-3 mt-1 shadow-[0_0_20px_rgba(243,198,76,0.18),inset_0_2px_6px_rgba(255,255,255,0.12)] group-hover:scale-110 group-hover:border-[#ffe58f] group-hover:shadow-[0_0_28px_rgba(243,198,76,0.45)] group-hover:rotate-2 transition-all duration-300">
                  <div className="absolute inset-1 rounded-xl border border-[#f3c64c]/15 pointer-events-none" />
                  {step.icon}
                </div>

                {/* Title */}
                <h3 className="font-serif font-bold text-base sm:text-[18px] text-[#ffffff] mb-1.5 leading-snug group-hover:text-[#ffe58f] transition-colors duration-200 drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-[12px] sm:text-[12.5px] text-[#e2e8f0]/85 group-hover:text-white leading-relaxed max-w-[215px] mx-auto transition-colors duration-200">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Centered CTA Button with Decorative Wings */}
          <div className="mt-8 sm:mt-9 flex items-center justify-center gap-3 sm:gap-4.5 w-full">
            {/* Left decorative wing */}
            <div className="hidden sm:flex items-center gap-1.5 opacity-85">
              <span className="w-12 md:w-20 lg:w-28 h-[1.5px] bg-gradient-to-r from-transparent via-[#f3c64c]/60 to-[#ffe58f]" />
              <span className="text-[10px] text-[#f3c64c] drop-shadow-[0_0_6px_rgba(243,198,76,0.8)]">◆</span>
              <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-tr from-[#c88d12] via-[#ffe382] to-[#ffffff] shadow-[0_0_6px_rgba(255,220,100,0.9)] ring-1 ring-[#ffe58f]/60" />
            </div>

            {/* Pill Button: ENTER LUCKY DRAW with forward/backward animated arrow badge */}
            <Link
              to="/participate"
              className="group relative inline-flex items-center gap-4 pl-8 pr-3.5 py-3 rounded-full bg-gradient-to-r from-[#ffe58f] via-[#f3c64c] to-[#d4af37] text-[#240813] font-serif font-extrabold text-xs sm:text-sm tracking-wider uppercase shadow-[0_6px_25px_rgba(243,198,76,0.45),0_0_20px_rgba(255,229,143,0.3)] hover:shadow-[0_8px_35px_rgba(243,198,76,0.7),0_0_30px_rgba(255,229,143,0.6)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 cursor-pointer overflow-hidden border border-[#fff4cc]/80"
            >
              {/* Luxury Shimmer Light Sweep on hover */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

              <span className="drop-shadow-[0_1px_1px_rgba(255,255,255,0.4)] relative z-10 font-black">
                ENTER LUCKY DRAW
              </span>
              <span className="w-8 h-8 rounded-full bg-gradient-to-br from-[#700d2b] via-[#52071d] to-[#2e030f] border border-[#ffe58f]/70 flex items-center justify-center text-[#ffe58f] shadow-md animate-cta-arrow-glide relative z-10 group-hover:scale-105 transition-transform">
                <ArrowRight className="w-4 h-4 stroke-[2.4] animate-inner-arrow-flow" />
              </span>
            </Link>

            {/* Right decorative wing */}
            <div className="hidden sm:flex items-center gap-1.5 opacity-85 scale-x-[-1]">
              <span className="w-12 md:w-20 lg:w-28 h-[1.5px] bg-gradient-to-r from-transparent via-[#f3c64c]/60 to-[#ffe58f]" />
              <span className="text-[10px] text-[#f3c64c] drop-shadow-[0_0_6px_rgba(243,198,76,0.8)]">◆</span>
              <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-tr from-[#c88d12] via-[#ffe382] to-[#ffffff] shadow-[0_0_6px_rgba(255,220,100,0.9)] ring-1 ring-[#ffe58f]/60" />
            </div>
          </div>

          {/* Bottom Tagline */}
          <div className="flex items-center justify-center gap-3 mt-4 text-[9.5px] sm:text-[10.5px] tracking-[0.24em] font-medium text-[#d6c7a1]/75 uppercase">
            <span className="w-6 sm:w-12 h-[1px] bg-gradient-to-r from-transparent to-[#dfb658]/40" />
            <span>LIGHT UP YOUR FESTIVE SEASON WITH BIGGER POSSIBILITIES</span>
            <span className="w-6 sm:w-12 h-[1px] bg-gradient-to-l from-transparent to-[#dfb658]/40" />
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------------- */}
      {/* 4. SPECIAL OFFERS                                                     */}
      {/* --------------------------------------------------------------------- */}
      <section
        id="special-offers"
        className="relative w-full overflow-hidden py-10 sm:py-14 lg:py-16"
      >
        {/* Background Image: Absolute positioned behind content, covering entire section edge-to-edge */}
        <img
          src={specialOffersBg}
          alt="Special Offers Background"
          className="absolute inset-0 w-full h-full pointer-events-none select-none z-0"
          style={{
            objectFit: 'fill',
            objectPosition: 'center'
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header - Ultra-Luxurious Festive Styling */}
          <div className="text-center max-w-3xl mx-auto mb-7 sm:mb-8">
            {/* 1. Royal Festive Lotus & Diamond Ornamental Eyebrow Divider */}
            <div className="flex items-center justify-center gap-1.5 sm:gap-2.5 mb-3 sm:mb-3.5 max-w-xl mx-auto select-none">
              {/* Left tapered horizontal gold line */}
              <div className="h-[1.5px] flex-1 max-w-[50px] sm:max-w-[90px] md:max-w-[120px] bg-gradient-to-r from-transparent via-[#C8922E]/60 to-[#C8922E]" />

              {/* Left gold diamond */}
              <span className="text-[#C8922E] text-[9px] sm:text-[10px] leading-none shrink-0">◆</span>

              {/* Metallic Golden Lotus Emblem */}
              <svg className="w-5 h-4 sm:w-6 sm:h-5 shrink-0 drop-shadow-[0_1px_3px_rgba(200,146,46,0.3)]" viewBox="0 0 36 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="lotusGoldCenterSO" x1="18" y1="2" x2="18" y2="26" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#FFF4A8" />
                    <stop offset="30%" stopColor="#F5C042" />
                    <stop offset="70%" stopColor="#D98A16" />
                    <stop offset="100%" stopColor="#9C5906" />
                  </linearGradient>
                  <linearGradient id="lotusGoldLeftSO" x1="7" y1="9" x2="18" y2="26" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#FFECA0" />
                    <stop offset="40%" stopColor="#EEB236" />
                    <stop offset="80%" stopColor="#C47310" />
                    <stop offset="100%" stopColor="#8C4A03" />
                  </linearGradient>
                  <linearGradient id="lotusGoldRightSO" x1="29" y1="9" x2="18" y2="26" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#FFECA0" />
                    <stop offset="40%" stopColor="#EEB236" />
                    <stop offset="80%" stopColor="#C47310" />
                    <stop offset="100%" stopColor="#8C4A03" />
                  </linearGradient>
                  <linearGradient id="lotusGoldBottomSO" x1="18" y1="17" x2="18" y2="26" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#F7C64E" />
                    <stop offset="100%" stopColor="#A85E08" />
                  </linearGradient>
                </defs>
                <path d="M18 26C11 26.5 4 23.5 2 20C4.5 17 11 18 18 26Z" fill="url(#lotusGoldBottomSO)" />
                <path d="M18 26C25 26.5 32 23.5 34 20C31.5 17 25 18 18 26Z" fill="url(#lotusGoldBottomSO)" />
                <path d="M18 26C14 16 9 11 7 9.5C10 7.5 16 11 18 26Z" fill="url(#lotusGoldLeftSO)" />
                <path d="M18 26C22 16 27 11 29 9.5C26 7.5 20 11 18 26Z" fill="url(#lotusGoldRightSO)" />
                <path d="M18 2C15 9 14.5 17 18 26C21.5 17 21 9 18 2Z" fill="url(#lotusGoldCenterSO)" />
                <path d="M18 3V24" stroke="#FFF7C2" strokeWidth="0.75" strokeLinecap="round" opacity="0.6" />
              </svg>

              {/* Eyebrow Text: SPECIAL OFFERS */}
              <span className="text-[11.5px] sm:text-[12.5px] font-bold uppercase tracking-[0.24em] text-[#1c1836] shrink-0 px-1">
                SPECIAL OFFERS
              </span>

              {/* Right gold diamonds (staggered sizes matching reference) */}
              <span className="text-[#C8922E] text-[10px] sm:text-[11px] leading-none shrink-0">◆</span>
              <span className="text-[#C8922E] text-[7.5px] sm:text-[8px] leading-none shrink-0">◆</span>

              {/* Right tapered horizontal gold line */}
              <div className="h-[1.5px] flex-1 max-w-[50px] sm:max-w-[90px] md:max-w-[120px] bg-gradient-to-l from-transparent via-[#C8922E]/60 to-[#C8922E]" />
            </div>

            {/* 2. Grand Festive Display Headline (Decreased size, refined weight & spacing) */}
            <h2 className="font-serif text-2xl sm:text-[28px] md:text-[32px] lg:text-[34px] font-bold text-[#141634] leading-[1.25] tracking-tight">
              More Participation. More Chances.{' '}
              <span className="bg-gradient-to-r from-[#b45309] via-[#d97706] to-[#92400e] bg-clip-text text-transparent font-bold drop-shadow-[0_1px_8px_rgba(217,119,6,0.18)]">
                More Rewards.
              </span>
            </h2>

            {/* 3. Refined Elegant Subtitle */}
            <p className="font-sans text-[13.5px] sm:text-[14.5px] text-[#475569] max-w-xl mx-auto mt-2.5 font-normal leading-relaxed">
              Grab our exclusive festive offers and boost your chances to win amazing prizes.
            </p>

            {/* 4. Luxury Crystal Trust Seal Bar */}
            <div className="inline-flex flex-wrap items-center justify-center gap-3 sm:gap-5 mt-3.5 py-1.5 px-4 sm:px-6 rounded-full bg-white/80 border border-[#dfb658]/40 shadow-[0_3px_14px_rgba(180,83,9,0.06),inset_0_1px_2px_rgba(255,255,255,0.95)] backdrop-blur-md">
              <span className="flex items-center gap-1.5 text-[11.5px] sm:text-xs font-medium text-[#334155]">
                <span className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-[#fef3c7] to-[#fde68a] border border-[#d97706]/40 flex items-center justify-center shadow-xs">
                  <Check className="w-2 h-2 text-[#b45309]" strokeWidth={3} />
                </span>
                Instant Digital Delivery
              </span>
              <span className="text-[#dfb658] text-[9px] font-bold select-none hidden sm:inline-block">◆</span>
              <span className="flex items-center gap-1.5 text-[11.5px] sm:text-xs font-medium text-[#334155]">
                <span className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-[#fef3c7] to-[#fde68a] border border-[#d97706]/40 flex items-center justify-center shadow-xs">
                  <Check className="w-2 h-2 text-[#b45309]" strokeWidth={3} />
                </span>
                100% Certified Transparent
              </span>
              <span className="text-[#dfb658] text-[9px] font-bold select-none hidden sm:inline-block">◆</span>
              <span className="flex items-center gap-1.5 text-[11.5px] sm:text-xs font-medium text-[#334155]">
                <span className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-[#fef3c7] to-[#fde68a] border border-[#d97706]/40 flex items-center justify-center shadow-xs">
                  <Check className="w-2 h-2 text-[#b45309]" strokeWidth={3} />
                </span>
                Direct Bank Disbursement
              </span>
            </div>
          </div>

          {/* 3 Interactive Premium Offer Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-7 items-stretch">
            {specialOfferCards.map((card) => (
              <InteractiveOfferCard
                key={card.id}
                card={card}
                isSelected={selectedOfferTier === card.id}
                onSelect={() => setSelectedOfferTier(card.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------------- */}
      {/* 4. OUR GRAND PRIZES (Compact Premium Section)                         */}
      {/* --------------------------------------------------------------------- */}
      <section
        id="grand-prizes"
        className="relative w-full overflow-hidden flex flex-col justify-center py-7 sm:py-9 md:py-10 md:min-h-[470px] md:max-h-[530px]"
        style={{
          backgroundImage: `url(${grandPrizesBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 w-full text-center">
          {/* Section Header - Ultra-Luxurious Royal Festive Header */}
          <div className="text-center max-w-2xl mx-auto mb-5 sm:mb-6">
            {/* 1. Golden Lotus Icon above Eyebrow matching reference */}
            <div className="flex items-center justify-center mb-1.5 select-none">
              <svg className="w-6 h-4 sm:w-7 sm:h-5 text-[#f5c64c] drop-shadow-[0_1px_6px_rgba(245,198,76,0.6)]" viewBox="0 0 36 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="lotusGoldGP" x1="18" y1="2" x2="18" y2="22" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#FFF7C2" />
                    <stop offset="40%" stopColor="#F5C042" />
                    <stop offset="100%" stopColor="#A85E08" />
                  </linearGradient>
                </defs>
                <path d="M18 22C12 22.5 5 19.5 3 16C5.5 13 11 14 18 22Z" fill="url(#lotusGoldGP)" />
                <path d="M18 22C24 22.5 31 19.5 33 16C30.5 13 25 14 18 22Z" fill="url(#lotusGoldGP)" />
                <path d="M18 22C14 13 9 9 7 7.5C10 5.5 16 9 18 22Z" fill="url(#lotusGoldGP)" opacity="0.9" />
                <path d="M18 22C22 13 27 9 29 7.5C26 5.5 20 9 18 22Z" fill="url(#lotusGoldGP)" opacity="0.9" />
                <path d="M18 2C15 8 14.5 15 18 22C21.5 15 21 8 18 2Z" fill="url(#lotusGoldGP)" />
              </svg>
            </div>

            {/* 2. Ornamental Eyebrow Divider with Tapered Gold Lines */}
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-1.5 select-none">
              <div className="h-[1.5px] w-8 sm:w-14 bg-gradient-to-r from-transparent via-[#C8922E]/70 to-[#C8922E]" />
              <span className="text-[#f5c64c] text-[8px] sm:text-[9px] drop-shadow-[0_0_6px_rgba(245,198,76,0.9)]">◆</span>
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.26em] text-[#ffe58f] drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
                OUR GRAND PRIZES
              </span>
              <span className="text-[#f5c64c] text-[8px] sm:text-[9px] drop-shadow-[0_0_6px_rgba(245,198,76,0.9)]">◆</span>
              <div className="h-[1.5px] w-8 sm:w-14 bg-gradient-to-l from-transparent via-[#C8922E]/70 to-[#C8922E]" />
            </div>

            {/* 3. Main Headline: Crisp Ivory & Metallic Radiant Gold */}
            <h2 className="font-serif text-2xl sm:text-[30px] md:text-[34px] font-bold tracking-tight text-white leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
              Big Dreams.{' '}
              <span className="bg-gradient-to-r from-[#ffe58f] via-[#f7cb59] to-[#d4af37] bg-clip-text text-transparent drop-shadow-[0_2px_12px_rgba(245,198,76,0.35)]">
                Bigger Rewards.
              </span>
            </h2>

            {/* 4. Elegant Explanatory Subtitle from Reference */}
            <p className="font-sans text-[12.5px] sm:text-[13.5px] text-[#e2e8f0]/85 font-normal tracking-wide max-w-lg mx-auto mt-1.5 leading-relaxed">
              Participate, Celebrate and Win Amazing Prizes This Diwali.
            </p>
          </div>

          {/* 3 Compact Prize Cards matching Reference */}
          <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-6 md:gap-7">
            {defaultGrandPrizes.map((prize) => (
              <InteractiveGrandPrizeCard
                key={prize.id}
                prize={prize}
              />
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------------- */}
      {/* 5. OUR LIVE PRIZES (Compact Premium Glassmorphism Section)            */}
      {/* --------------------------------------------------------------------- */}
      <section
        id="live-prizes"
        className="relative w-full overflow-hidden py-10 sm:py-12 md:py-14"
        style={{
          backgroundImage: `url(${livePrizesBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Section Header - Ultra-Luxurious Royal Festive Header */}
          <div className="relative text-center max-w-4xl mx-auto mb-7 sm:mb-9 md:mb-10">
            {/* Ambient golden atmospheric glow behind heading */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[580px] h-[160px] bg-[radial-gradient(ellipse_at_center,_rgba(245,198,76,0.18)_0%,_rgba(245,198,76,0.03)_55%,_transparent_75%)] blur-2xl pointer-events-none -z-10" />

            {/* 1. Golden Lotus Floral Element centered above heading with glowing halo */}
            <div className="relative inline-flex items-center justify-center mb-2.5 sm:mb-3 select-none">
              <div className="absolute -inset-3 rounded-full blur-xl bg-[#f5c64c]/25 pointer-events-none" />
              <img
                src={liveLotusGold}
                alt="Golden Lotus"
                className="relative z-10 w-13 h-7 sm:w-16 sm:h-9 md:w-18 md:h-10 object-contain drop-shadow-[0_2px_12px_rgba(245,198,76,0.7)]"
              />
            </div>

            {/* 2. Main Heading with Royal Tapered Hairline & Diamond Ornaments */}
            <div className="flex items-center justify-center gap-2.5 sm:gap-4 md:gap-6 select-none w-full">
              {/* Left Royal Hairline & Diamond Ornament */}
              <RoyalHeaderOrnament flip={false} />

              {/* Main Heading Text */}
              <h2 className="shrink-0 font-serif text-3xl sm:text-4xl md:text-[44px] lg:text-[48px] font-bold tracking-tight text-white leading-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
                <span className="text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] drop-shadow-[0_0_20px_rgba(255,255,255,0.25)]">
                  Our Live{' '}
                </span>
                <span className="bg-gradient-to-b from-[#FFF5C0] via-[#F6C644] to-[#C88A20] bg-clip-text text-transparent drop-shadow-[0_2px_16px_rgba(245,198,76,0.65)]">
                  Prizes
                </span>
              </h2>

              {/* Right Royal Hairline & Diamond Ornament */}
              <RoyalHeaderOrnament flip={true} />
            </div>

            {/* 3. Subtitle */}
            <p className="font-sans text-[13px] sm:text-[14.5px] md:text-[15.5px] text-[#e2e8f0] font-normal tracking-[0.06em] max-w-lg mx-auto mt-2 sm:mt-2.5 leading-relaxed drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">
              Big Dreams. Bigger Rewards.
            </p>
          </div>

          {/* 4 Prize Cards Grid: 4 in a row on desktop, 2x2 on tablet, 1 column on mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 lg:gap-4.5 xl:gap-5 items-stretch max-w-[1240px] mx-auto">
            {defaultLivePrizes.map((prize, index) => (
              <LivePrizeGlassCard key={prize.id} prize={prize} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------------- */}
      {/* 6. GRAND DRAW DETAILS (Live Banner)                                   */}
      {/* --------------------------------------------------------------------- */}
      {/* 6. GRAND DRAW DETAILS (Live Banner)                                   */}
      {/* --------------------------------------------------------------------- */}
      <section className="relative py-10 my-8 overflow-hidden rounded-3xl mx-4 sm:mx-6 lg:mx-8 border border-[#d4af37]/40 shadow-[0_8px_32px_rgba(212,175,55,0.2)] backdrop-blur-md"
        style={{
          background: 'linear-gradient(135deg, rgba(38, 22, 6, 0.82) 0%, rgba(18, 10, 2, 0.92) 100%)',
        }}
      >
        <div className="absolute top-0 inset-x-8 h-[1.5px] bg-gradient-to-r from-transparent via-[#ffe58f]/40 to-transparent pointer-events-none" />
        <div className="absolute inset-0 -translate-x-full hover:translate-x-full transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/[0.05] to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Title & Info */}
            <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
              <div className="px-4 py-1.5 rounded-full text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#ff4d4d] bg-[#4a0000]/80 border border-[#ff4d4d]/40 flex items-center gap-2 shadow-[0_0_15px_rgba(255,77,77,0.3)] animate-pulse">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff4d4d] shadow-[0_0_8px_#ff4d4d]"></span>
                LIVE DRAW
              </div>
              <div>
                <h3 className="font-serif italic font-extrabold text-3xl sm:text-4xl lg:text-[40px] text-transparent bg-clip-text bg-gradient-to-b from-[#ffe58f] via-[#f5c64c] to-[#d4af37] tracking-wider drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]" style={{ WebkitTextStroke: '1px rgba(229,179,47,0.2)' }}>
                  Grand Draw Details
                </h3>
                <div className="flex items-center justify-center sm:justify-start gap-4 text-[13px] text-white/85 mt-2 font-medium tracking-wide">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-[#e5b32f]" />
                    Date: {draw.displayDate}
                  </span>
                  <span className="text-[#e5b32f] text-[10px]">◆</span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[#e5b32f]" />
                    Time: {draw.displayTime}
                  </span>
                </div>
              </div>
            </div>

            {/* Countdown timer (Premium Banner variant) */}
            <div className="flex flex-col sm:flex-row items-center gap-6 lg:gap-8">
              <div className="text-center flex flex-col items-center">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#ffe58f]/70 block mb-2 drop-shadow-md text-center">
                  Countdown to Draw
                </span>
                <CountdownTimer targetDate={draw.scheduledAt} variant="banner" />
              </div>

              {/* Watch Draw Live Button */}
              <Link
                to="/live-draw"
                className="group relative px-7 py-3.5 rounded-full font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-red-600 to-rose-700 shadow-[0_0_20px_rgba(225,29,72,0.6)] flex items-center gap-2 transition-all hover:scale-105 active:scale-95 shrink-0 border border-red-400/30 overflow-hidden"
              >
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
                <Flame className="w-4 h-4 text-amber-300 animate-flicker relative z-10" />
                <span className="relative z-10 drop-shadow-md tracking-wide">WATCH DRAW LIVE</span>
                <ChevronRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------------- */}
      {/* 7. OUR LUCKY WINNERS (Compact Background & Layout matching reference) */}
      {/* --------------------------------------------------------------------- */}
      <section
        id="lucky-winners"
        className="relative w-full m-0 p-0 overflow-hidden box-border flex items-center justify-center min-h-[480px] sm:min-h-[520px] md:min-h-[540px] lg:h-[580px] xl:h-[600px]"
        style={{
          boxSizing: 'border-box',
          backgroundImage: `url(${luckyWinnersBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="relative z-10 w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 box-border flex flex-col items-center justify-center">
          {/* Section Heading & Subtitle */}
          <div className="flex flex-col items-center justify-center text-center mb-5 sm:mb-6">
            <SectionHeaderCrown className="w-10 h-7 sm:w-11 sm:h-8 mb-2" />
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[40px] font-bold text-white tracking-wide leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
              Our Lucky Winners
            </h2>
            <div className="flex items-center justify-center gap-2.5 sm:gap-3.5 mt-2">
              <div className="flex items-center gap-1.5 opacity-85">
                <div className="w-6 sm:w-10 h-[1px] bg-gradient-to-r from-transparent to-[#dfb658]" />
                <div className="w-1.5 h-1.5 rotate-45 bg-[#dfb658]" />
                <div className="w-3.5 h-[1px] bg-[#dfb658]" />
              </div>
              <p className="text-xs sm:text-sm font-sans tracking-wide text-[#cbd5e1] font-medium">
                Real People. Real Happiness.
              </p>
              <div className="flex items-center gap-1.5 opacity-85">
                <div className="w-3.5 h-[1px] bg-[#dfb658]" />
                <div className="w-1.5 h-1.5 rotate-45 bg-[#dfb658]" />
                <div className="w-6 sm:w-10 h-[1px] bg-gradient-to-l from-transparent to-[#dfb658]" />
              </div>
            </div>
          </div>

          {/* Cards & Carousel Navigation Container */}
          <div className="w-full flex items-center justify-center gap-2 sm:gap-3 lg:gap-4 max-w-[1280px] select-none">
            {/* Left Carousel Arrow */}
            <button
              onClick={handlePrevWinner}
              disabled={isWinnerAtStart}
              aria-label="Previous winners"
              className={`shrink-0 w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all duration-300 z-20 group ${isWinnerAtStart
                ? 'opacity-25 cursor-not-allowed pointer-events-none scale-95'
                : 'cursor-pointer text-[#dfb658] hover:text-[#fff6cb] hover:scale-110 active:scale-95'
                }`}
              style={{
                background: 'linear-gradient(180deg, rgba(16, 22, 44, 0.9) 0%, rgba(8, 12, 26, 0.95) 100%)',
                border: isWinnerAtStart
                  ? '1px solid rgba(223, 182, 88, 0.2)'
                  : '1.5px solid rgba(223, 182, 88, 0.65)',
                boxShadow: isWinnerAtStart
                  ? 'none'
                  : '0 0 16px rgba(223, 182, 88, 0.25)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
              }}
            >
              <ChevronLeft size={22} className={isWinnerAtStart ? 'opacity-40' : 'group-hover:-translate-x-0.5 transition-transform duration-200'} />
            </button>

            {/* Carousel Viewport (Overflow hidden, allows vertical hover tilt room) */}
            <div
              className="overflow-hidden w-full py-4 -my-4 px-1"
              onTouchStart={handleWinnerTouchStart}
              onTouchEnd={handleWinnerTouchEnd}
            >
              {/* Sliding Track with GPU acceleration & Momentum Spring Curve */}
              <div
                ref={winnerTrackRef}
                className="flex gap-3 sm:gap-3.5 items-stretch will-change-transform"
                style={{
                  transform: winnerStepWidth
                    ? `translateX(-${winnerSlideIndex * winnerStepWidth}px)`
                    : 'none',
                  transition: 'transform 550ms cubic-bezier(0.16, 1, 0.3, 1)',
                  willChange: 'transform'
                }}
              >
                {winnerSlides.map((winner, idx) => (
                  <div
                    key={winner.instanceKey}
                    className="shrink-0 flex justify-center w-[85%] sm:w-[calc((100%-24px)/3)] lg:w-[calc((100%-56px)/5)]"
                  >
                    <SingleWinnerCard
                      winner={winner}
                      isActive={idx === winnerSlideIndex}
                      onSelect={setSelectedWinner}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Right Carousel Arrow */}
            <button
              onClick={handleNextWinner}
              disabled={isWinnerAtEnd}
              aria-label="Next winners"
              className={`shrink-0 w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all duration-300 z-20 group ${isWinnerAtEnd
                ? 'opacity-25 cursor-not-allowed pointer-events-none scale-95'
                : 'cursor-pointer text-[#dfb658] hover:text-[#fff6cb] hover:scale-110 active:scale-95'
                }`}
              style={{
                background: 'linear-gradient(180deg, rgba(16, 22, 44, 0.9) 0%, rgba(8, 12, 26, 0.95) 100%)',
                border: isWinnerAtEnd
                  ? '1px solid rgba(223, 182, 88, 0.2)'
                  : '1.5px solid rgba(223, 182, 88, 0.65)',
                boxShadow: isWinnerAtEnd
                  ? 'none'
                  : '0 0 16px rgba(223, 182, 88, 0.25)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
              }}
            >
              <ChevronRight size={22} className={isWinnerAtEnd ? 'opacity-40' : 'group-hover:translate-x-0.5 transition-transform duration-200'} />
            </button>
          </div>

          {/* Interactive Carousel Pagination Indicator Dots */}
          <div className="flex items-center justify-center gap-2 mt-4 select-none">
            {luckyWinnersData.map((_, i) => (
              <button
                key={i}
                onClick={() => handleDotClick(i)}
                aria-label={`Go to prize ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${activeWinnerDot === i
                  ? 'w-7 bg-gradient-to-r from-[#ffeaa0] to-[#dfb658] shadow-[0_0_10px_rgba(223,182,88,0.8)]'
                  : 'w-2 bg-[#dfb658]/35 hover:bg-[#dfb658]/70 hover:scale-125'
                  }`}
              />
            ))}
          </div>

          {/* Centered Button: "VIEW ALL WINNERS →" */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 mt-5 sm:mt-6">
            {/* Left decorative ornament */}
            <div className="flex items-center gap-1.5 opacity-80">
              <div className="w-8 sm:w-14 h-[1px] bg-gradient-to-r from-transparent to-[#dfb658]" />
              <div className="w-2 h-2 rotate-45 border border-[#dfb658]" />
              <div className="w-1.5 h-1.5 rotate-45 bg-[#dfb658]" />
            </div>

            <Link
              to="/winners"
              className="inline-flex items-center gap-2.5 px-6 py-2 rounded-full transition-all duration-300 group hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: 'linear-gradient(180deg, rgba(16, 22, 42, 0.92) 0%, rgba(8, 12, 26, 0.96) 100%)',
                border: '1.5px solid #dfb658',
                boxShadow: '0 0 18px rgba(223, 182, 88, 0.28), inset 0 0 10px rgba(223, 182, 88, 0.1)',
                backdropFilter: 'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)',
              }}
            >
              <span className="font-serif tracking-widest text-[11px] sm:text-xs font-semibold text-white uppercase group-hover:text-[#ffd875] transition-colors">
                View All Winners
              </span>
              <span className="w-5 h-5 rounded-full border border-[#dfb658] flex items-center justify-center text-[#dfb658] group-hover:bg-[#dfb658] group-hover:text-black transition-all">
                <ChevronRight size={12} strokeWidth={2.5} />
              </span>
            </Link>

            {/* Right decorative ornament */}
            <div className="flex items-center gap-1.5 opacity-80">
              <div className="w-1.5 h-1.5 rotate-45 bg-[#dfb658]" />
              <div className="w-2 h-2 rotate-45 border border-[#dfb658]" />
              <div className="w-8 sm:w-14 h-[1px] bg-gradient-to-l from-transparent to-[#dfb658]" />
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------------- */}
      {/* 8. FREQUENTLY ASKED QUESTIONS (Light Cream Section)                   */}
      {/* --------------------------------------------------------------------- */}
      <section className="relative w-full overflow-hidden bg-[#060918] py-16 sm:py-20 border-t border-b border-[#dfb658]/20">
        {/* Subtle radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(223,182,88,0.08)_0%,transparent_70%)] pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">

          {/* Section Heading & Subtitle */}
          <div className="flex flex-col items-center justify-center text-center mb-10 sm:mb-12">
            <SectionHeaderCrown className="w-10 h-7 sm:w-11 sm:h-8 mb-2" />
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[40px] font-bold text-white tracking-wide leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
              Frequently Asked Questions
            </h2>
            <div className="flex items-center justify-center gap-2.5 sm:gap-3.5 mt-2">
              <div className="flex items-center gap-1.5 opacity-85">
                <div className="w-6 sm:w-10 h-[1px] bg-gradient-to-r from-transparent to-[#dfb658]" />
                <div className="w-1.5 h-1.5 rotate-45 bg-[#dfb658]" />
                <div className="w-3.5 h-[1px] bg-[#dfb658]" />
              </div>
              <p className="text-xs sm:text-sm font-sans tracking-wide text-[#cbd5e1] font-medium uppercase">
                Find answers & get started
              </p>
              <div className="flex items-center gap-1.5 opacity-85">
                <div className="w-3.5 h-[1px] bg-[#dfb658]" />
                <div className="w-1.5 h-1.5 rotate-45 bg-[#dfb658]" />
                <div className="w-6 sm:w-10 h-[1px] bg-gradient-to-l from-transparent to-[#dfb658]" />
              </div>
            </div>
          </div>

          <div className="w-full space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl overflow-hidden transition-all duration-300 border ${isOpen ? 'bg-gradient-to-b from-[#141633] to-[#0c0e22] border-[#dfb658] shadow-[0_4px_25px_rgba(223,182,88,0.15)]' : 'bg-[#0c0e22]/80 border-[#2a2e57] hover:border-[#dfb658]/50'} shadow-[0_4px_15px_rgba(0,0,0,0.4)] backdrop-blur-sm`}
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full px-5 sm:px-6 py-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                  >
                    <span className={`font-serif text-[15px] sm:text-[16px] tracking-wide transition-colors ${isOpen ? 'text-[#f5c64c] font-bold' : 'text-[#cbd5e1] font-medium hover:text-white'}`}>
                      {faq.question}
                    </span>
                    <span className={`text-xl font-bold text-[#dfb658] transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-45 text-[#f5c64c]' : ''}`}>
                      +
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-[13.5px] sm:text-[14px] text-[#94a3b8] font-sans leading-relaxed border-t border-[#dfb658]/10 mt-2 pt-4">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/faq"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#dfb658] hover:text-[#f5c64c] transition-all group tracking-widest uppercase border-[1.5px] border-[#dfb658]/40 px-7 py-3.5 rounded-full hover:bg-[#dfb658]/10 hover:border-[#dfb658] hover:shadow-[0_0_15px_rgba(223,182,88,0.2)]"
            >
              <span>View All Questions</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------------- */}
      {/* 9. FINAL CALL TO ACTION (Grand Festive Golden Section)                */}
      {/* --------------------------------------------------------------------- */}
      <section
        className="relative py-20 text-center overflow-hidden border-t border-[#e5b32f]/40"
        style={{
          backgroundImage: `url(${howItWorksBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-[#060918]/75"></div>
        <FestiveParticles count={20} />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#ffe58f]/10 border border-[#e5b32f]/30 text-xs text-[#ffe58f] font-semibold uppercase tracking-wider mb-4">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            Limited Festive Entry Window
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold gold-gradient-text tracking-wide">
            Your Diwali. Your Chance. Your Lucky Moment.
          </h2>
          <p className="text-sm sm:text-base text-white/80 max-w-xl mx-auto mt-3 mb-8">
            Don't miss this golden opportunity. Join now, get your official lucky ticket, and make this Diwali memorable!
          </p>

          <Link
            to="/participate"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-full font-bold text-sm sm:text-base text-[#0b0d1e] bg-gradient-to-r from-[#ffe58f] via-[#e5b32f] to-[#d4af37] shadow-gold-glow hover:shadow-[0_0_40px_rgba(229,179,47,0.85)] hover:scale-105 active:scale-95 transition-all duration-200"
          >
            <Sparkles className="w-5 h-5 text-[#0b0d1e]" />
            <span>ENTER NOW</span>
            <ChevronRight className="w-5 h-5 text-[#0b0d1e]" />
          </Link>
        </div>
      </section>

      {/* Winner Spotlight Modal */}
      <WinnerAnnouncementModal
        winner={selectedWinner}
        isOpen={!!selectedWinner}
        onClose={() => setSelectedWinner(null)}
      />
    </div>
  );
}
