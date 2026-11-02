import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Trophy, Search, Filter, Sparkles, CheckCircle, Calendar, MapPin, ChevronLeft, ChevronRight, Crown, Award, Medal, Gift, Ticket, ShieldCheck } from 'lucide-react';
import { api } from '../services/api';
import WinnerAnnouncementModal from '../components/common/WinnerAnnouncementModal';
import winnersPageBg from '../../Images/winners-page-bg.png';
import liveTrophyGold from '../assets/live-trophy-gold.png';
import liveTrophySilver from '../assets/live-trophy-silver.png';
import liveTrophyBronze from '../assets/live-trophy-bronze.png';
import liveGiftPurple from '../assets/live-gift-purple.png';

const getTierAsset = (tier) => {
  switch (tier?.toLowerCase()) {
    case 'gold':
      return liveTrophyGold;
    case 'silver':
      return liveTrophySilver;
    case 'bronze':
      return liveTrophyBronze;
    case 'purple':
    default:
      return liveGiftPurple;
  }
};

const getTierTheme = (tier) => {
  switch (tier?.toLowerCase()) {
    case 'gold':
      return {
        label: 'Gold Tier',
        TierIcon: Crown,
        tierIconColor: 'text-amber-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.85)] fill-amber-400/30',
        badgeBg: 'bg-gradient-to-r from-amber-500/25 via-amber-400/15 to-amber-950/70',
        badgeBorder: 'border-amber-400/60',
        badgeText: 'text-[#ffe58f]',
        badgeShadow: 'shadow-[0_2px_12px_rgba(245,158,11,0.25)]',

        ticketBg: 'bg-[#141009]/95',
        ticketBorder: 'border-[#f3c64c]/45',
        ticketText: 'text-[#ffe58f]',
        ticketIconColor: 'text-amber-400',

        medallionBg: 'bg-[radial-gradient(ellipse_at_center,rgba(251,191,36,0.30)_0%,rgba(32,22,10,0.95)_75%)]',
        medallionRing: 'border-[#f3c64c]/60 shadow-[0_0_22px_rgba(243,198,76,0.3)] ring-1 ring-[#f3c64c]/30',

        cardBg: 'from-[#22180d]/95 via-[#151222]/95 to-[#0b0d1a]/95',
        cardBorder: 'border-[#f3c64c]/40 hover:border-[#ffe58f]',
        cardShadow: 'hover:shadow-[0_20px_50px_-10px_rgba(243,198,76,0.35)]',
        radialGlow: 'radial-gradient(circle at top left, rgba(245, 158, 11, 0.35), transparent 70%)',
        prizeGradient: 'bg-gradient-to-r from-[#fff7d1] via-[#f3c64c] to-[#d4af37]',
        prizeTitleText: 'text-[#ffe58f]/80',
        iconColor: 'text-[#f3c64c]',
        detailsBg: 'bg-[#0f0e1c]/80',
        detailsBorder: 'border-[#f3c64c]/20',
        locationTagBg: 'bg-[#241a10]',
        nameHoverText: 'group-hover:text-amber-200'
      };
    case 'silver':
      return {
        label: 'Silver Tier',
        TierIcon: Award,
        tierIconColor: 'text-slate-100 drop-shadow-[0_0_8px_rgba(226,232,240,0.85)] fill-slate-300/30',
        badgeBg: 'bg-gradient-to-r from-slate-400/25 via-slate-300/15 to-slate-900/70',
        badgeBorder: 'border-slate-300/60',
        badgeText: 'text-slate-100',
        badgeShadow: 'shadow-[0_2px_12px_rgba(148,163,184,0.25)]',

        ticketBg: 'bg-[#0b1018]/95',
        ticketBorder: 'border-slate-400/45',
        ticketText: 'text-slate-200',
        ticketIconColor: 'text-slate-300',

        medallionBg: 'bg-[radial-gradient(ellipse_at_center,rgba(226,232,240,0.26)_0%,rgba(16,23,34,0.95)_75%)]',
        medallionRing: 'border-slate-300/60 shadow-[0_0_22px_rgba(148,163,184,0.3)] ring-1 ring-slate-300/30',

        cardBg: 'from-[#141b26]/95 via-[#0e1320]/95 to-[#080b16]/95',
        cardBorder: 'border-[#94a3b8]/40 hover:border-[#e2e8f0]',
        cardShadow: 'hover:shadow-[0_20px_50px_-10px_rgba(148,163,184,0.35)]',
        radialGlow: 'radial-gradient(circle at top left, rgba(148, 163, 184, 0.30), transparent 70%)',
        prizeGradient: 'bg-gradient-to-r from-[#ffffff] via-[#e2e8f0] to-[#94a3b8]',
        prizeTitleText: 'text-slate-300/80',
        iconColor: 'text-[#cbd5e1]',
        detailsBg: 'bg-[#0a0e18]/80',
        detailsBorder: 'border-slate-400/20',
        locationTagBg: 'bg-[#162030]',
        nameHoverText: 'group-hover:text-cyan-200'
      };
    case 'bronze':
      return {
        label: 'Bronze Tier',
        TierIcon: Medal,
        tierIconColor: 'text-orange-300 drop-shadow-[0_0_8px_rgba(249,115,22,0.85)] fill-orange-500/30',
        badgeBg: 'bg-gradient-to-r from-orange-500/25 via-orange-400/15 to-amber-950/70',
        badgeBorder: 'border-orange-500/60',
        badgeText: 'text-orange-200',
        badgeShadow: 'shadow-[0_2px_12px_rgba(217,119,6,0.25)]',

        ticketBg: 'bg-[#140b08]/95',
        ticketBorder: 'border-orange-500/45',
        ticketText: 'text-orange-200',
        ticketIconColor: 'text-orange-400',

        medallionBg: 'bg-[radial-gradient(ellipse_at_center,rgba(249,115,22,0.25)_0%,rgba(32,16,10,0.95)_75%)]',
        medallionRing: 'border-orange-500/60 shadow-[0_0_22px_rgba(217,119,6,0.3)] ring-1 ring-orange-500/30',

        cardBg: 'from-[#24160e]/95 via-[#17111c]/95 to-[#0d0916]/95',
        cardBorder: 'border-[#d97706]/40 hover:border-[#fb923c]',
        cardShadow: 'hover:shadow-[0_20px_50px_-10px_rgba(217,119,6,0.35)]',
        radialGlow: 'radial-gradient(circle at top left, rgba(217, 119, 6, 0.30), transparent 70%)',
        prizeGradient: 'bg-gradient-to-r from-[#ffedd5] via-[#fb923c] to-[#d97706]',
        prizeTitleText: 'text-orange-300/80',
        iconColor: 'text-[#fb923c]',
        detailsBg: 'bg-[#100814]/80',
        detailsBorder: 'border-[#d97706]/20',
        locationTagBg: 'bg-[#26150e]',
        nameHoverText: 'group-hover:text-orange-200'
      };
    case 'purple':
    default:
      return {
        label: 'Purple Tier',
        TierIcon: Gift,
        tierIconColor: 'text-fuchsia-300 drop-shadow-[0_0_8px_rgba(232,121,249,0.85)] fill-fuchsia-400/30',
        badgeBg: 'bg-gradient-to-r from-purple-500/25 via-purple-400/15 to-purple-950/70',
        badgeBorder: 'border-purple-400/60',
        badgeText: 'text-purple-200',
        badgeShadow: 'shadow-[0_2px_12px_rgba(192,132,252,0.25)]',

        ticketBg: 'bg-[#12071a]/95',
        ticketBorder: 'border-purple-400/45',
        ticketText: 'text-purple-200',
        ticketIconColor: 'text-purple-300',

        medallionBg: 'bg-[radial-gradient(ellipse_at_center,rgba(192,132,252,0.28)_0%,rgba(32,13,48,0.95)_75%)]',
        medallionRing: 'border-purple-400/60 shadow-[0_0_22px_rgba(192,132,252,0.3)] ring-1 ring-purple-400/30',

        cardBg: 'from-[#221136]/95 via-[#150d24]/95 to-[#0b0616]/95',
        cardBorder: 'border-[#c084fc]/40 hover:border-[#e879f9]',
        cardShadow: 'hover:shadow-[0_20px_50px_-10px_rgba(192,132,252,0.35)]',
        radialGlow: 'radial-gradient(circle at top left, rgba(168, 85, 247, 0.32), transparent 70%)',
        prizeGradient: 'bg-gradient-to-r from-[#fae8ff] via-[#e879f9] to-[#c084fc]',
        prizeTitleText: 'text-purple-300/80',
        iconColor: 'text-[#c084fc]',
        detailsBg: 'bg-[#0f0618]/80',
        detailsBorder: 'border-purple-500/20',
        locationTagBg: 'bg-[#240e36]',
        nameHoverText: 'group-hover:text-fuchsia-200'
      };
  }
};

export default function Winners() {
  const location = useLocation();
  const [winners, setWinners] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedTier, setSelectedTier] = useState('all');
  const [selectedWinner, setSelectedWinner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const TIER_ORDER = ['all', 'gold', 'silver', 'bronze', 'purple'];

  const handleMobileTabNavigation = (direction) => {
    const currentIndex = TIER_ORDER.indexOf(selectedTier);
    if (direction === 'left') {
      const nextIndex = currentIndex === 0 ? TIER_ORDER.length - 1 : currentIndex - 1;
      setSelectedTier(TIER_ORDER[nextIndex]);
    } else {
      const nextIndex = currentIndex === TIER_ORDER.length - 1 ? 0 : currentIndex + 1;
      setSelectedTier(TIER_ORDER[nextIndex]);
    }
  };

  // Reset page when search or tier filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedTier]);

  // If navigated from Home page with a selected winner
  useEffect(() => {
    if (location.state?.selectedWinner) {
      setSelectedWinner(location.state.selectedWinner);
    }
  }, [location.state]);

  useEffect(() => {
    async function loadWinners() {
      setLoading(true);
      try {
        const cleanSearch = search.trim() || undefined;
        const cleanTier = selectedTier !== 'all' ? selectedTier : undefined;

        const res = await api.getWinners({
          search: cleanSearch,
          tier: cleanTier
        });

        let list = (res && res.success && Array.isArray(res.data)) ? [...res.data] : [];

        // Winners retrieved strictly dynamically from database

        setWinners(list);
      } catch (err) {
        console.error('Failed to fetch winners from database:', err);
        setWinners([]);
      } finally {
        setLoading(false);
      }
    }
    loadWinners();
  }, [search, selectedTier]);

  const totalPages = Math.max(1, Math.ceil(winners.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedWinners = winners.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="pt-[72px] sm:pt-[80px] md:pt-[88px] lg:pt-[96px] bg-[#00030b]">
      <div
        className="w-full min-h-[calc(100vh-96px)] bg-[#00030b] winners-page"
        style={{
          backgroundImage: `url(${winnersPageBg})`,
          backgroundColor: '#00030b',
          backgroundPosition: 'center top',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% auto'
        }}
      >
        <style>{`
          @media (max-width: 1023px) {
            .winners-page {
              background-size: max(100%, 1024px) auto !important;
            }
          }
          @keyframes wn-shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(200%); }
          }
          @keyframes wn-pulse-glow {
            0%, 100% { opacity: 0.7; }
            50% { opacity: 1; }
          }
          .wn-tier-btn {
            position: relative; overflow: hidden;
            transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s ease, border-color 0.25s ease;
          }
          .wn-tier-btn::before {
            content: '';
            position: absolute; top: 0; left: 0; right: 0; height: 1px;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent);
            pointer-events: none;
          }
          .wn-tier-btn .wn-shimmer {
            position: absolute; top: 0; left: 0; right: 0; bottom: 0;
            background: linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.15) 50%, transparent 70%);
            animation: wn-shimmer 2.8s ease infinite;
            pointer-events: none;
          }
          .wn-tier-btn:hover { transform: translateY(-2px) scale(1.05); }
          .wn-tier-btn.active { transform: translateY(-2px) scale(1.08); }
          .wn-tier-btn.active .wn-active-glow {
            animation: wn-pulse-glow 2s ease infinite;
          }
        `}</style>
        <div className="pt-8 sm:pt-10 lg:pt-12 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12" style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>

        {/* Hall of Fame badge */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '6px 18px', borderRadius: '999px',
            background: 'linear-gradient(135deg, rgba(30,20,59,0.9) 0%, rgba(20,12,40,0.95) 100%)',
            border: '1px solid rgba(229,179,47,0.5)',
            boxShadow: '0 0 18px rgba(229,179,47,0.25), inset 0 1px 0 rgba(255,229,143,0.12)'
          }}>
            <Trophy className="w-3.5 h-3.5" style={{ color: '#f5c64c' }} />
            <span style={{
              color: '#ffe58f', fontSize: '11px', fontWeight: '700',
              letterSpacing: '0.2em', textTransform: 'uppercase'
            }}>Hall of Fame</span>
          </div>
        </div>

        {/* Diamond ornament row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '16px' }}>
          <div style={{ height: '1px', width: '60px', background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.7))' }} />
          <div style={{ width: '7px', height: '7px', transform: 'rotate(45deg)', background: '#f5c64c', boxShadow: '0 0 10px rgba(245,198,76,0.9)' }} />
          <div style={{ width: '5px', height: '5px', transform: 'rotate(45deg)', border: '1.5px solid rgba(245,198,76,0.55)' }} />
          <div style={{ width: '7px', height: '7px', transform: 'rotate(45deg)', background: '#f5c64c', boxShadow: '0 0 10px rgba(245,198,76,0.9)' }} />
          <div style={{ height: '1px', width: '60px', background: 'linear-gradient(to left, transparent, rgba(212,175,55,0.7))' }} />
        </div>

        {/* Main Title */}
        <h1 style={{
          fontFamily: "'Georgia', 'Times New Roman', serif",
          fontSize: 'clamp(2.8rem, 7vw, 4.5rem)',
          fontWeight: '900',
          fontStyle: 'italic',
          letterSpacing: '-0.01em',
          lineHeight: '1.1',
          marginBottom: '16px',
          background: 'linear-gradient(135deg, #fff7cc 0%, #f5c64c 35%, #ffe58f 55%, #c8922e 80%, #f5c64c 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          filter: 'drop-shadow(0 2px 20px rgba(245,198,76,0.3))',
          WebkitTextStroke: '0.5px rgba(229,179,47,0.2)'
        }}>
          Verified Winners
        </h1>

        {/* Bottom divider line */}
        <div style={{ height: '1px', width: '180px', margin: '0 auto 18px', background: 'linear-gradient(to right, transparent, rgba(245,198,76,0.55), transparent)' }} />

        {/* Subtitle */}
        <p style={{
          fontSize: 'clamp(13px, 2vw, 15px)',
          color: 'rgba(226,232,240,0.8)',
          fontFamily: "'Inter', 'Segoe UI', sans-serif",
          fontWeight: '400',
          lineHeight: '1.75',
          letterSpacing: '0.03em',
          maxWidth: '540px',
          margin: '0 auto'
        }}>
          Real people, verified lucky tickets, and guaranteed disbursements.{' '}
          <span style={{ color: '#f5c64c', fontWeight: '600' }}>
            Click any card to re-live their winning announcement!
          </span>
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="relative mb-10">
        {/* Glowing border ring */}
        <div style={{
          position: 'absolute', inset: '-1.5px', borderRadius: '18px',
          background: 'linear-gradient(90deg, rgba(212,175,55,0.7) 0%, rgba(255,229,143,0.5) 50%, rgba(212,175,55,0.7) 100%)',
          filter: 'blur(2px)', pointerEvents: 'none', zIndex: 0
        }} />
        <div style={{
          position: 'relative', zIndex: 1,
          background: 'linear-gradient(135deg, rgba(15,13,40,0.96) 0%, rgba(8,9,28,0.98) 60%, rgba(14,11,36,0.96) 100%)',
          backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(245,198,76,0.35)',
          borderRadius: '16px',
          boxShadow: '0 8px 40px rgba(0,0,0,0.7), 0 0 24px rgba(212,175,55,0.12), inset 0 1px 0 rgba(255,229,143,0.15)'
        }} className="p-5 flex flex-col md:flex-row items-center justify-between gap-4 overflow-hidden">

          {/* Top sheen line */}
          <div style={{
            position: 'absolute', top: 0, left: '10%', right: '10%', height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(245,198,76,0.6), transparent)',
            borderRadius: '50%', pointerEvents: 'none'
          }} />

          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: 'rgba(245,198,76,0.6)' }} />
            <input
              type="text"
              placeholder="Search by ticket # or name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: '100%', paddingLeft: '2.5rem', paddingRight: '1rem',
                paddingTop: '0.75rem', paddingBottom: '0.75rem',
                background: 'rgba(4,5,18,0.9)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px', outline: 'none',
                color: 'white', fontSize: '13px', fontFamily: "'Inter', 'Segoe UI', sans-serif",
                fontWeight: '500', letterSpacing: '0.04em',
                transition: 'border-color 0.3s, box-shadow 0.3s'
              }}
              onFocus={e => { e.target.style.borderColor = 'rgba(245,198,76,0.55)'; e.target.style.boxShadow = '0 0 0 3px rgba(245,198,76,0.1)'; }}
              onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.boxShadow = 'none'; }}
            />
          </div>

          {/* Category Filter Tabs with Arrows */}
          <div className="relative flex items-center justify-center w-full md:w-auto">
            {/* Left Arrow (Mobile/Tablet Only) */}
            <button 
              onClick={() => handleMobileTabNavigation('left')}
              className="md:hidden absolute left-0 z-20 flex items-center justify-center w-8 h-8 rounded-full bg-[#1e143b]/90 border border-[#f5c64c]/40 text-[#ffe58f] shadow-[0_0_12px_rgba(245,198,76,0.3)] backdrop-blur-md hover:scale-110 active:scale-95 transition-all duration-300"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div 
              className="wn-filter-tabs flex items-center justify-center md:justify-start gap-2.5 w-full md:w-auto overflow-visible flex-nowrap pb-3 md:pb-0 px-10 md:px-0"
              style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
            >
              <style>{`
                .wn-filter-tabs::-webkit-scrollbar {
                  display: none;
                }
              `}</style>
              {[
              {
                tier: 'all',
                label: 'All Tiers',
                activeGrad: 'linear-gradient(135deg, #ffe58f 0%, #f5c64c 45%, #d4af37 100%)',
                activeBorder: 'rgba(245,198,76,0.8)',
                activeGlow: '0 0 22px rgba(245,198,76,0.65), 0 4px 14px rgba(0,0,0,0.4)',
                activeColor: '#0b0d1e',
                idleGrad: 'linear-gradient(135deg, rgba(30,22,60,0.85) 0%, rgba(18,14,42,0.9) 100%)',
                idleBorder: 'rgba(245,198,76,0.25)',
                idleGlow: '0 2px 10px rgba(0,0,0,0.4)',
                idleColor: 'rgba(255,229,143,0.75)',
                icon: '✦'
              },
              {
                tier: 'gold',
                label: 'Gold Tier',
                activeGrad: 'linear-gradient(135deg, #ffd700 0%, #e5b32f 50%, #b8860b 100%)',
                activeBorder: 'rgba(229,179,47,0.9)',
                activeGlow: '0 0 24px rgba(229,179,47,0.7), 0 4px 14px rgba(0,0,0,0.4)',
                activeColor: '#1a0a00',
                idleGrad: 'linear-gradient(135deg, rgba(40,28,8,0.85) 0%, rgba(26,16,4,0.9) 100%)',
                idleBorder: 'rgba(229,179,47,0.3)',
                idleGlow: '0 2px 10px rgba(0,0,0,0.4)',
                idleColor: 'rgba(229,179,47,0.8)',
                icon: '🥇'
              },
              {
                tier: 'silver',
                label: 'Silver Tier',
                activeGrad: 'linear-gradient(135deg, #e8e8e8 0%, #c0c0c0 50%, #909090 100%)',
                activeBorder: 'rgba(192,192,192,0.9)',
                activeGlow: '0 0 22px rgba(192,192,192,0.55), 0 4px 14px rgba(0,0,0,0.4)',
                activeColor: '#0d0d0d',
                idleGrad: 'linear-gradient(135deg, rgba(28,30,42,0.85) 0%, rgba(18,20,30,0.9) 100%)',
                idleBorder: 'rgba(192,192,192,0.25)',
                idleGlow: '0 2px 10px rgba(0,0,0,0.4)',
                idleColor: 'rgba(192,192,192,0.75)',
                icon: '🥈'
              },
              {
                tier: 'bronze',
                label: 'Bronze Tier',
                activeGrad: 'linear-gradient(135deg, #f4a460 0%, #cd7f32 50%, #8b4513 100%)',
                activeBorder: 'rgba(205,127,50,0.9)',
                activeGlow: '0 0 22px rgba(205,127,50,0.65), 0 4px 14px rgba(0,0,0,0.4)',
                activeColor: '#1a0800',
                idleGrad: 'linear-gradient(135deg, rgba(38,20,8,0.85) 0%, rgba(24,12,4,0.9) 100%)',
                idleBorder: 'rgba(205,127,50,0.3)',
                idleGlow: '0 2px 10px rgba(0,0,0,0.4)',
                idleColor: 'rgba(244,164,96,0.8)',
                icon: '🥉'
              },
              {
                tier: 'purple',
                label: 'Purple Tier',
                activeGrad: 'linear-gradient(135deg, #d8b4fe 0%, #a855f7 50%, #7c3aed 100%)',
                activeBorder: 'rgba(168,85,247,0.9)',
                activeGlow: '0 0 24px rgba(168,85,247,0.65), 0 4px 14px rgba(0,0,0,0.4)',
                activeColor: '#1a0030',
                idleGrad: 'linear-gradient(135deg, rgba(30,12,50,0.85) 0%, rgba(20,8,36,0.9) 100%)',
                idleBorder: 'rgba(168,85,247,0.3)',
                idleGlow: '0 2px 10px rgba(0,0,0,0.4)',
                idleColor: 'rgba(216,180,254,0.8)',
                icon: '💜'
              }
            ].map(({ tier, label, activeGrad, activeBorder, activeGlow, activeColor, idleGrad, idleBorder, idleGlow, idleColor, icon }) => {
              const isActive = selectedTier === tier;
              return (
                <button
                  key={tier}
                  onClick={() => setSelectedTier(tier)}
                  className={`wn-tier-btn shrink-0 items-center gap-[5px] ${isActive ? 'flex active' : 'hidden md:flex'}`}
                  style={{
                    background: isActive ? activeGrad : idleGrad,
                    color: isActive ? activeColor : idleColor,
                    border: `1px solid ${isActive ? activeBorder : idleBorder}`,
                    boxShadow: isActive ? activeGlow : idleGlow,
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    fontWeight: '800', fontSize: '11px',
                    letterSpacing: '0.13em', textTransform: 'uppercase',
                    padding: '9px 15px', borderRadius: '11px',
                    whiteSpace: 'nowrap', cursor: 'pointer',
                    fontFamily: "'Inter', 'Segoe UI', sans-serif"
                  }}
                >
                  {/* Shimmer overlay */}
                  <span className="wn-shimmer" />
                  {/* Active glow ring */}
                  {isActive && (
                    <span className="wn-active-glow" style={{
                      position: 'absolute', inset: '-1px', borderRadius: '12px',
                      border: `1px solid ${activeBorder}`,
                      opacity: 0.7, pointerEvents: 'none'
                    }} />
                  )}
                  <span style={{ fontSize: '12px', lineHeight: 1 }}>{icon}</span>
                  <span>{label}</span>
                </button>
              );
            })}
            </div>

            {/* Right Arrow (Mobile/Tablet Only) */}
            <button 
              onClick={() => handleMobileTabNavigation('right')}
              className="md:hidden absolute right-0 z-20 flex items-center justify-center w-8 h-8 rounded-full bg-[#1e143b]/90 border border-[#f5c64c]/40 text-[#ffe58f] shadow-[0_0_12px_rgba(245,198,76,0.3)] backdrop-blur-md hover:scale-110 active:scale-95 transition-all duration-300"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Winners Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 bg-[#0e1025]/60 rounded-3xl border border-amber-400/20 backdrop-blur-xl">
          <div className="w-12 h-12 border-3 border-amber-400/20 border-t-amber-400 rounded-full animate-spin mb-4 drop-shadow-[0_0_12px_rgba(245,198,76,0.5)]" />
          <h3 className="font-serif text-base font-semibold text-amber-200">Loading Verified Winners</h3>
          <p className="text-xs text-amber-200/50 mt-1">Retrieving official verified winner records from database...</p>
        </div>
      ) : winners.length === 0 ? (
        <div className="text-center py-20 bg-[#12142d] rounded-3xl border border-white/10">
          <Trophy className="w-12 h-12 text-white/20 mx-auto mb-3" />
          <h3 className="font-serif text-lg font-bold text-white/60">No Winners Found</h3>
          <p className="text-xs text-white/40 mt-1">Try adjusting your search query or filter criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {paginatedWinners.map((winner) => {
            const tierAsset = getTierAsset(winner.tier);
            const theme = getTierTheme(winner.tier);

            return (
              <div
                key={winner.id}
                onClick={() => setSelectedWinner(winner)}
                className={`relative rounded-3xl p-6 sm:p-7 bg-gradient-to-b ${theme.cardBg} border ${theme.cardBorder} shadow-[0_12px_35px_-8px_rgba(0,0,0,0.7)] ${theme.cardShadow} cursor-pointer transition-all duration-500 ease-out group flex flex-col justify-between overflow-hidden hover:-translate-y-2.5 backdrop-blur-xl`}
              >
                {/* 1. Ambient Tier Radial Glow inside card */}
                <div
                  className="absolute -top-12 -left-12 w-48 h-48 rounded-full pointer-events-none opacity-45 group-hover:opacity-85 transition-opacity duration-700 blur-2xl"
                  style={{ background: theme.radialGlow }}
                />

                {/* 2. Sweeping Glare Reflection on Hover */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none z-10" />

                {/* Card Content Top Section */}
                <div className="relative z-10">
                  {/* Header: 3D Medallion Avatar + Tier Chip & Ticket Number */}
                  <div className="flex items-start justify-between gap-3 mb-5">
                    {/* 3D Tier Trophy Medallion with Luminous Ambient Spotlight */}
                    <div className={`relative w-16 h-16 sm:w-18 sm:h-18 rounded-2xl ${theme.medallionBg} border ${theme.medallionRing} p-2 flex items-center justify-center group-hover:scale-105 group-hover:-rotate-2 transition-all duration-500 overflow-hidden shrink-0`}>
                      {/* Inner Ambient Glow Spotlight */}
                      <div
                        className="absolute inset-0 pointer-events-none opacity-50 group-hover:opacity-85 transition-opacity blur-sm"
                        style={{ background: theme.radialGlow }}
                      />
                      {/* 3D Trophy / Award Asset */}
                      <img
                        src={tierAsset}
                        alt={winner.tier}
                        className="relative z-10 w-full h-full object-contain scale-110 sm:scale-115 group-hover:scale-125 transition-transform duration-500 filter drop-shadow-[0_6px_12px_rgba(0,0,0,0.85)] brightness-110 contrast-105"
                      />
                    </div>

                    {/* Right Header Chips: Tier Badge & Ticket Pill */}
                    <div className="flex flex-col items-end gap-2">
                      {/* Premium Tier Hallmark Pill with Lucide Emblem */}
                      <span
                        className={`inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full border ${theme.badgeBorder} ${theme.badgeBg} ${theme.badgeText} ${theme.badgeShadow} backdrop-blur-md transition-all duration-300`}
                      >
                        <theme.TierIcon className={`w-3.5 h-3.5 ${theme.tierIconColor} shrink-0`} />
                        <span>{theme.label}</span>
                      </span>

                      {/* Ticket Pill with Cryptographic Badge Aesthetic & Ticket Icon */}
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${theme.ticketBg} border ${theme.ticketBorder} shadow-inner backdrop-blur-md group-hover:border-opacity-90 transition-all`}>
                        <Ticket className={`w-3.5 h-3.5 ${theme.ticketIconColor} shrink-0`} />
                        <span className="w-[1px] h-3 bg-white/20" />
                        <span className={`font-mono text-[11px] sm:text-xs font-bold ${theme.ticketText} tracking-wider`}>
                          {winner.ticketNumber}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Prize Info & Winner Name */}
                  <div className="space-y-1.5">
                    <span className={`text-[11px] sm:text-xs uppercase font-extrabold tracking-widest ${theme.prizeTitleText} block`}>
                      {winner.prizeTitle}
                    </span>
                    <div className={`font-serif text-3xl sm:text-4xl font-black ${theme.prizeGradient} bg-clip-text text-transparent tracking-tight group-hover:scale-[1.02] transition-transform origin-left drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)]`}>
                      {winner.prizeAmount}
                    </div>
                    {/* Offer Feature Tag — shown only for bronze/purple tier cards */}
                    {winner.offerTag && (
                      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] sm:text-[11px] font-bold tracking-wide ${
                        winner.tier === 'bronze'
                          ? 'bg-orange-950/70 border border-orange-500/40 text-orange-200'
                          : 'bg-purple-950/70 border border-purple-400/40 text-purple-200'
                      }`}>
                        <Sparkles className="w-3 h-3 shrink-0" />
                        <span>{winner.offerTag}</span>
                      </div>
                    )}
                    {/* Diwali Day Lucky Spin Winner Hallmark Badge */}
                    {winner.isSpinWinner && (
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] sm:text-[11px] font-bold tracking-wide bg-gradient-to-r from-amber-500/20 via-yellow-500/20 to-amber-600/20 border border-amber-400/40 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.25)]">
                        <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" />
                        <span>Diwali Day Lucky Spin Winner</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between pt-1">
                      <h3 className={`text-lg sm:text-xl font-bold text-white/95 font-serif tracking-wide ${theme.nameHoverText} transition-colors`}>
                        {winner.maskedName}
                      </h3>
                      {/* Verified Pill */}
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-400 bg-emerald-950/70 border border-emerald-500/40 px-2.5 py-0.5 rounded-full shadow-sm">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 drop-shadow-[0_0_6px_rgba(52,211,153,0.6)]" />
                        <span>Verified</span>
                      </span>
                    </div>
                  </div>

                  {/* Event Details: Date & City */}
                  <div className={`pt-3.5 pb-3 px-3.5 mt-5 rounded-2xl ${theme.detailsBg} border ${theme.detailsBorder} space-y-2 text-xs text-white/70`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="p-1 rounded-md bg-white/5 border border-white/10 flex items-center justify-center">
                          <Calendar className={`w-3.5 h-3.5 ${theme.iconColor}`} />
                        </span>
                        <span className="text-white/85 font-medium">Draw: {winner.drawDate}</span>
                      </div>
                      <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg ${theme.locationTagBg} border border-white/10 text-white/95 shadow-sm`}>
                        <MapPin className={`w-3 h-3 ${theme.iconColor}`} />
                        <span className="font-semibold text-[11px] sm:text-xs">{winner.city}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Numbered Pagination Structure */}
      {winners.length > 0 && (
        <div className="mt-12 relative">
          {/* Glowing border ring */}
          <div style={{
            position: 'absolute', inset: '-1.5px', borderRadius: '18px',
            background: 'linear-gradient(90deg, rgba(212,175,55,0.6) 0%, rgba(255,229,143,0.4) 50%, rgba(212,175,55,0.6) 100%)',
            filter: 'blur(2px)', pointerEvents: 'none', zIndex: 0
          }} />
          <div style={{
            position: 'relative', zIndex: 1,
            background: 'linear-gradient(135deg, rgba(15,13,40,0.96) 0%, rgba(8,9,28,0.98) 60%, rgba(14,11,36,0.96) 100%)',
            backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(245,198,76,0.30)',
            borderRadius: '16px',
            boxShadow: '0 8px 40px rgba(0,0,0,0.7), 0 0 24px rgba(212,175,55,0.1), inset 0 1px 0 rgba(255,229,143,0.12)'
          }} className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 sm:p-5">

            {/* Top sheen line */}
            <div style={{
              position: 'absolute', top: 0, left: '10%', right: '10%', height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(245,198,76,0.5), transparent)',
              pointerEvents: 'none'
            }} />

            {/* Summary / Range */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>
              <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: '13px', fontWeight: '500', letterSpacing: '0.03em' }}>Showing</span>
              <span style={{ color: '#ffe58f', fontSize: '16px', fontWeight: '800', fontFamily: 'Georgia, serif' }}>{startIndex + 1}</span>
              <span style={{ color: 'rgba(245,198,76,0.5)', fontSize: '14px', fontWeight: '300', margin: '0 1px' }}>–</span>
              <span style={{ color: '#ffe58f', fontSize: '16px', fontWeight: '800', fontFamily: 'Georgia, serif' }}>
                {Math.min(startIndex + itemsPerPage, winners.length)}
              </span>
              <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: '13px', fontWeight: '500' }}>of</span>
              <span style={{ color: '#ffe58f', fontSize: '16px', fontWeight: '800', fontFamily: 'Georgia, serif' }}>{winners.length}</span>
              <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: '11px', fontWeight: '700', letterSpacing: '0.14em', textTransform: 'uppercase', marginLeft: '2px' }}>Verified Winners</span>
            </div>

            {/* Number Navigation Buttons */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                onClick={() => { if (currentPage > 1) { setCurrentPage((prev) => prev - 1); window.scrollTo({ top: 250, behavior: 'smooth' }); } }}
                disabled={currentPage === 1}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  padding: '8px 16px', borderRadius: '10px',
                  background: 'rgba(16,18,52,0.85)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'rgba(255,255,255,0.7)', fontSize: '11px',
                  fontWeight: '800', letterSpacing: '0.14em', textTransform: 'uppercase',
                  cursor: 'pointer', transition: 'all 0.3s', opacity: currentPage === 1 ? 0.3 : 1
                }}
                aria-label="Previous Page"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Prev</span>
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => { setCurrentPage(pageNum); window.scrollTo({ top: 250, behavior: 'smooth' }); }}
                  style={currentPage === pageNum ? {
                    width: '40px', height: '40px', borderRadius: '10px',
                    background: 'linear-gradient(160deg, #ffe58f 0%, #f5c64c 50%, #d4af37 100%)',
                    color: '#0b0d1e', fontWeight: '900', fontSize: '15px',
                    fontFamily: 'Georgia, serif',
                    border: 'none', cursor: 'pointer',
                    boxShadow: '0 0 20px rgba(245,198,76,0.55), 0 4px 12px rgba(0,0,0,0.3)',
                    transform: 'scale(1.12)', transition: 'all 0.3s'
                  } : {
                    width: '40px', height: '40px', borderRadius: '10px',
                    background: 'rgba(16,18,52,0.85)',
                    color: 'rgba(255,255,255,0.65)', fontWeight: '700', fontSize: '14px',
                    fontFamily: 'Georgia, serif',
                    border: '1px solid rgba(255,255,255,0.1)',
                    cursor: 'pointer', transition: 'all 0.3s'
                  }}
                  aria-label={`Go to page ${pageNum}`}
                  aria-current={currentPage === pageNum ? 'page' : undefined}
                >
                  {pageNum}
                </button>
              ))}

              <button
                onClick={() => { if (currentPage < totalPages) { setCurrentPage((prev) => prev + 1); window.scrollTo({ top: 250, behavior: 'smooth' }); } }}
                disabled={currentPage === totalPages}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  padding: '8px 16px', borderRadius: '10px',
                  background: 'rgba(16,18,52,0.85)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'rgba(255,255,255,0.7)', fontSize: '11px',
                  fontWeight: '800', letterSpacing: '0.14em', textTransform: 'uppercase',
                  cursor: 'pointer', transition: 'all 0.3s', opacity: currentPage === totalPages ? 0.3 : 1
                }}
                aria-label="Next Page"
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Winner Spotlight Announcement Modal */}
      <WinnerAnnouncementModal
        winner={selectedWinner}
        isOpen={!!selectedWinner}
        onClose={() => setSelectedWinner(null)}
      />
        </div>
      </div>
    </div>
  );
}
