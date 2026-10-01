import React, { useState, useEffect } from 'react';
import { Flame, Trophy, Play, Sparkles, ShieldCheck, Users, Clock, Calendar, CheckCircle2 } from 'lucide-react';
import { api } from '../services/api';
import CountdownTimer from '../components/common/CountdownTimer';
import WinnerAnnouncementModal from '../components/common/WinnerAnnouncementModal';
import winnersPageBg from '../../Images/winners-page-bg.png';
import liveDrawCelebration from '../../Images/Golden Lucky Draw Throne Celebration.png';
import FestiveParticles from '../components/common/FestiveParticles';
import confetti from 'canvas-confetti';

export default function LiveDraw() {
  const [currentDraw, setCurrentDraw] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [selectedWinner, setSelectedWinner] = useState(null);
  const [drumNumber, setDrumNumber] = useState('DD-2026-•••••');
  const [liveWinners, setLiveWinners] = useState([]);

  // Super Impressive Fireworks & Golden Confetti Effect
  useEffect(() => {
    let fireworkInterval;
    let goldPaperInterval;

    if (isDemoMode) {
      // Golden curly papers continuously raining down from entire top space
      const launchGoldenPapers = () => {
        const duration = 1000 * 20; // Only run for the first 20 seconds
        const animationEnd = Date.now() + duration;

        goldPaperInterval = setInterval(() => {
          const timeLeft = animationEnd - Date.now();
          if (timeLeft <= 0) return clearInterval(goldPaperInterval);

          confetti({
            particleCount: 2, // Slightly more dense for a festive party feel
            startVelocity: 8, // Tiny burst to make it feel like an active party drop
            spread: 360, 
            colors: ['#FFFFFF', '#FFD700', '#FFE600', '#FFF8DC', '#E5B80B'], 
            shapes: ['square', 'circle'], // Classic party mix of squares and circles
            gravity: 0.6, // Falls a bit faster and more lively
            scalar: Math.random() * 0.6 + 0.8, // Decreased paper size as requested
            drift: Math.random() * 2 - 1, // More active, playful swaying
            ticks: 800, 
            origin: {
              x: Math.random(), 
              y: Math.random() * -0.2 
            },
            zIndex: 10000
          });
        }, 25); // 40 times per second for a dense, lively party shower
      };

      // Blast fireworks from extreme Left and Right sides to Center
      const launchFireworks = () => {
        const duration = 1000 * 20; // Only run for the first 20 seconds
        const animationEnd = Date.now() + duration;
        
        // Realistic side-cannon fireworks defaults
        const defaults = { 
          startVelocity: 55, // Shoot higher and further towards center
          spread: 80, // Tighter spread for a directed blast
          ticks: 300, 
          zIndex: 10000,
          gravity: 1.2 
        };

        fireworkInterval = setInterval(() => {
          const timeLeft = animationEnd - Date.now();
          if (timeLeft <= 0) return clearInterval(fireworkInterval);
          
          const particleCount = 80 * (timeLeft / duration);
          
          // Blast from Left Edge (aiming top right)
          confetti(Object.assign({}, defaults, { 
            particleCount, 
            angle: 60,
            origin: { x: 0, y: Math.random() * 0.2 + 0.6 }, 
            colors: ['#ff0000', '#ffe58f', '#ff00ff', '#ffffff'] 
          }));
          
          // Blast from Right Edge (aiming top left)
          confetti(Object.assign({}, defaults, { 
            particleCount, 
            angle: 120,
            origin: { x: 1, y: Math.random() * 0.2 + 0.6 }, 
            colors: ['#00ff00', '#d4af37', '#00ccff', '#ffffff'] 
          }));
        }, 600); // Slightly slower intervals for massive distinct blasts
      };

      launchGoldenPapers();
      launchFireworks();

      return () => {
        clearInterval(fireworkInterval);
        clearInterval(goldPaperInterval);
      };
    }
  }, [isDemoMode]);

  useEffect(() => {
    async function fetchDraw() {
      try {
        const res = await api.getCurrentDraw();
        if (res.success) {
          setCurrentDraw(res.data);
        }
        const winRes = await api.getRecentWinners();
        if (winRes.success) {
          setLiveWinners(winRes.data);
        }
      } catch (err) {
        console.error('Failed to fetch draw details:', err);
      }
    }
    fetchDraw();
  }, []);

  // Interactive Live Draw Simulation
  const handleSimulateDraw = async () => {
    setIsDrawing(true);
    // Rapid rolling number animation on ticket drum
    const rollInterval = setInterval(() => {
      const rand5 = Math.floor(10000 + Math.random() * 90000);
      setDrumNumber(`DD-2026-${rand5}`);
    }, 80);

    setTimeout(async () => {
      clearInterval(rollInterval);
      try {
        // Admin or demonstration trigger
        const pickWinner = liveWinners.length > 0 ? liveWinners[0] : {
          winnerName: 'Ramesh Sharma',
          maskedName: 'R*** S***',
          ticketNumber: 'DD-2026-45872',
          prizeTitle: '1st Prize',
          prizeAmount: 'Premium Gold Coin',
          drawDate: '10 Nov 2026'
        };

        setDrumNumber(pickWinner.ticketNumber);
        setSelectedWinner(pickWinner);
      } catch (err) {
        console.error(err);
      } finally {
        setIsDrawing(false);
      }
    }, 2800);
  };

  const draw = currentDraw || {
    name: 'Diwali Dhamaka Grand Lucky Draw 2026',
    displayDate: '10 Nov 2026',
    displayTime: '07:00 PM (IST)',
    scheduledAt: '2026-11-10T13:30:00.000Z',
    status: 'SCHEDULED',
    totalParticipants: 4280,
    totalPrizePool: 'Exclusive'
  };

  return (
    <div className="pt-[68px] sm:pt-[76px] lg:pt-[80px] w-full">
      <div 
        className="w-full min-h-screen flex flex-col justify-start overflow-x-hidden pb-10 relative"
        style={{
          backgroundImage: `url(${winnersPageBg})`,
          backgroundSize: '100% auto',
          backgroundPosition: 'top center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: '#0a091c' // Ensures any empty space blends perfectly with the dark theme
        }}
      >
        <div className="absolute inset-0 z-0 opacity-80 pointer-events-none">
          <FestiveParticles />
        </div>
        
        {/* Advanced Glowing Demo Button */}
        <button 
          onClick={() => setIsDemoMode(!isDemoMode)}
          className="absolute top-[30px] right-4 sm:right-8 z-50 flex items-center justify-center w-14 h-14 rounded-full border-2 border-emerald-400/50 hover:border-emerald-300 transition-all duration-500 group cursor-pointer overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(6, 95, 70, 0.4) 100%)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            boxShadow: '0 0 20px rgba(16, 185, 129, 0.4), inset 0 0 15px rgba(16, 185, 129, 0.2)'
          }}
          title={isDemoMode ? "Back to Countdown" : "Launch Live Stage Demo"}
        >
          {/* Animated Glow Rings */}
          <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping" style={{ animationDuration: '3s' }} />
          <div className="absolute inset-0 rounded-full bg-emerald-400/30 animate-pulse" style={{ animationDuration: '2s' }} />
          
          <Play className={`w-6 h-6 text-emerald-300 drop-shadow-[0_0_12px_rgba(52,211,153,1)] transition-transform duration-500 z-10 ${isDemoMode ? 'rotate-90' : 'group-hover:scale-125'}`} />
          
          {/* Shine effect */}
          <div className="absolute -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shine_1.5s_ease-in-out_infinite]" />
        </button>

        <div className="pt-6 sm:pt-8 lg:pt-10 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col justify-start flex-1 mb-0 relative z-10">
          {/* Top Live Stage Banner */}
          <div className="text-center relative mb-16 pt-10">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest text-[#ffe58f] bg-amber-500/10 border border-[#e5b32f]/40 mb-6 shadow-[0_0_15px_rgba(245,198,76,0.3)] animate-pulse">
              <span className="w-2.5 h-2.5 rounded-full bg-[#f5c64c] shadow-[0_0_8px_rgba(245,198,76,0.8)]"></span>
              <span>GLOBAL BROADCAST EVENT</span>
            </div>

            <div className="flex flex-col items-center gap-3 mb-6">
              <h1 className="font-serif italic font-extrabold text-[42px] sm:text-[56px] lg:text-[68px] tracking-wider drop-shadow-[0_4px_15px_rgba(0,0,0,0.9)]"
                style={{
                  background: 'linear-gradient(135deg, #fff7cc 0%, #f5c64c 35%, #d4af37 65%, #c8922e 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  WebkitTextStroke: '1px rgba(245, 198, 76, 0.3)',
                  lineHeight: '1.2'
                }}>
                {draw.name}
              </h1>
              <div className="flex items-center justify-center gap-2 mt-2">
                <div className="h-[1px] w-24 bg-gradient-to-r from-transparent to-[#d4af37]" />
                <div className="w-2 h-2 rotate-45 bg-[#f5c64c] shadow-[0_0_12px_rgba(245,198,76,0.9)]" />
                <div className="h-[1px] w-24 bg-gradient-to-l from-transparent to-[#d4af37]" />
              </div>
            </div>

            <p className="text-sm sm:text-base text-white/80 max-w-2xl mx-auto mb-10 font-medium tracking-wide leading-relaxed">
              Join the exclusive live selection event on <span className="text-[#ffe58f] font-bold">{draw.displayDate}</span> at <span className="text-[#ffe58f] font-bold">{draw.displayTime}</span>. Experience transparency with our verified cryptographic pseudorandom ticket engine.
            </p>

            {isDemoMode ? (
              <>
                {/* Simulated Lucky Draw Started State (Unboxed) */}
                <div className="w-full relative overflow-visible mb-12">
                  <div className="relative w-full overflow-hidden flex justify-center items-center">
                    {/* Intense Golden Glow for the middle of the image */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-[#f5c64c] opacity-40 blur-[100px] rounded-full pointer-events-none z-0" />
                    
                    {/* Edge blending shadows to perfectly merge all 4 sides of the image into the background without a box look */}
                    <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-[#0a091c] via-[#0a091c]/80 to-transparent z-20 pointer-events-none" />
                    <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#0a091c] via-[#0a091c]/80 to-transparent z-20 pointer-events-none" />
                    <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-[#0a091c] via-[#0a091c]/80 to-transparent z-20 pointer-events-none" />
                    <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-[#0a091c] via-[#0a091c]/80 to-transparent z-20 pointer-events-none" />

                    <img 
                      src={liveDrawCelebration} 
                      alt="Live Draw Celebration" 
                      className="w-full h-auto object-contain mix-blend-screen relative z-10" 
                      loading="eager"
                      fetchPriority="high"
                    />
                    <div className="absolute top-4 right-4 z-20 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-600/20 border border-red-500/50 shadow-[0_0_15px_rgba(220,38,38,0.4)] backdrop-blur-md">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(220,38,38,0.8)] animate-pulse" />
                      <span className="text-red-400 text-xs font-bold uppercase tracking-wider">Live Broadcast</span>
                    </div>
                    
                    <div className="absolute bottom-6 left-0 right-0 z-20 text-center px-4">
                      <h3 className="font-serif text-3xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#ffe58f] via-white to-[#d4af37] mb-2 drop-shadow-[0_4px_15px_rgba(0,0,0,0.9)] animate-pulse">
                        The Lucky Draw Has Started!
                      </h3>
                      <p className="text-white text-sm sm:text-lg font-bold drop-shadow-[0_2px_10px_rgba(0,0,0,1)] bg-black/30 inline-block px-4 py-1 rounded-full backdrop-blur-sm">
                        The engine is now securely drawing winners directly from our administration hub.
                      </p>
                    </div>
                  </div>
  
                  <div className="max-w-5xl mx-auto px-4 mt-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 mt-2">
                    {/* Gold Box */}
                    <div className="flex flex-col items-center justify-center p-6 rounded-2xl relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300"
                      style={{
                        background: 'linear-gradient(135deg, rgba(245, 198, 76, 0.15) 0%, rgba(200, 146, 46, 0.05) 100%)',
                        backdropFilter: 'blur(16px)',
                        border: '1px solid rgba(245, 198, 76, 0.3)',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 0 20px rgba(245, 198, 76, 0.1)'
                      }}>
                      <div className="absolute top-0 inset-x-4 h-[1px] bg-gradient-to-r from-transparent via-[#f5c64c]/50 to-transparent" />
                      <div className="w-14 h-14 mb-4 rounded-full bg-gradient-to-br from-[#ffe58f] to-[#d4af37] flex items-center justify-center shadow-[0_0_20px_rgba(245,198,76,0.6)] group-hover:scale-110 transition-transform">
                         <Trophy className="w-7 h-7 text-yellow-900" />
                      </div>
                      <span className="text-white font-bold text-lg mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">5 Gold Draws</span>
                      <span className="px-4 py-1.5 bg-gradient-to-r from-[#e6c669] to-[#c79a32] text-black text-[11px] font-black uppercase tracking-wider rounded-full shadow-lg">Gold Tier (₹10)</span>
                    </div>

                    {/* Silver Box */}
                    <div className="flex flex-col items-center justify-center p-6 rounded-2xl relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300"
                      style={{
                        background: 'linear-gradient(135deg, rgba(226, 232, 240, 0.15) 0%, rgba(148, 163, 184, 0.05) 100%)',
                        backdropFilter: 'blur(16px)',
                        border: '1px solid rgba(226, 232, 240, 0.3)',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 0 20px rgba(226, 232, 240, 0.1)'
                      }}>
                      <div className="absolute top-0 inset-x-4 h-[1px] bg-gradient-to-r from-transparent via-slate-300/50 to-transparent" />
                      <div className="w-14 h-14 mb-4 rounded-full bg-gradient-to-br from-slate-200 to-slate-400 flex items-center justify-center shadow-[0_0_20px_rgba(203,213,225,0.4)] group-hover:scale-110 transition-transform">
                         <Trophy className="w-7 h-7 text-slate-800" />
                      </div>
                      <span className="text-white font-bold text-lg mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">5 Silver Draws</span>
                      <span className="px-4 py-1.5 bg-gradient-to-r from-slate-200 to-slate-400 text-black text-[11px] font-black uppercase tracking-wider rounded-full shadow-lg">Silver Tier (₹10)</span>
                    </div>

                    {/* Bronze Box */}
                    <div className="flex flex-col items-center justify-center p-6 rounded-2xl relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300"
                      style={{
                        background: 'linear-gradient(135deg, rgba(217, 119, 6, 0.15) 0%, rgba(180, 83, 9, 0.05) 100%)',
                        backdropFilter: 'blur(16px)',
                        border: '1px solid rgba(217, 119, 6, 0.3)',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 0 20px rgba(217, 119, 6, 0.1)'
                      }}>
                      <div className="absolute top-0 inset-x-4 h-[1px] bg-gradient-to-r from-transparent via-amber-600/50 to-transparent" />
                      <div className="w-14 h-14 mb-4 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center shadow-[0_0_20px_rgba(217,119,6,0.6)] group-hover:scale-110 transition-transform">
                         <Trophy className="w-7 h-7 text-amber-100" />
                      </div>
                      <span className="text-white font-bold text-lg mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] text-center">2 Bronze Only</span>
                      <span className="px-4 py-1.5 bg-gradient-to-r from-amber-500 to-amber-700 text-white text-[11px] font-black uppercase tracking-wider rounded-full shadow-lg">Bronze Tier (₹30)</span>
                    </div>

                    {/* Purple Box */}
                    <div className="flex flex-col items-center justify-center p-6 rounded-2xl relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300"
                      style={{
                        background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.15) 0%, rgba(126, 34, 206, 0.05) 100%)',
                        backdropFilter: 'blur(16px)',
                        border: '1px solid rgba(168, 85, 247, 0.3)',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 0 20px rgba(168, 85, 247, 0.1)'
                      }}>
                      <div className="absolute top-0 inset-x-4 h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
                      <div className="w-14 h-14 mb-4 rounded-full bg-gradient-to-br from-purple-500 to-purple-800 flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.6)] group-hover:scale-110 transition-transform">
                         <Trophy className="w-7 h-7 text-purple-100" />
                      </div>
                      <span className="text-white font-bold text-lg mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] text-center">2 Purple Only</span>
                      <span className="px-4 py-1.5 bg-gradient-to-r from-purple-500 to-purple-800 text-white text-[11px] font-black uppercase tracking-wider rounded-full shadow-lg">Purple Tier (₹50)</span>
                    </div>
                  </div>
  
                  <div className="text-center p-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent" />
                    <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
                    <p className="text-white/80 text-sm leading-relaxed max-w-lg mx-auto">
                      Once the administration hub finalizes the draw, all official results will be immediately revealed and beautifully displayed on the <span className="font-bold text-emerald-400 uppercase tracking-wide">Winners</span> page. Stay tuned!
                    </p>
                  </div>
                </div>
                </div>
              </>
            ) : (
              <>
                {/* Live Countdown in Stage */}
                <div className="mb-12 sm:scale-110 origin-top">
                  <CountdownTimer targetDate={draw.scheduledAt} />
                </div>
        
                {/* Impressive Broadcast Status replacing the Drum */}
                <div className="max-w-xl mx-auto p-8 sm:p-10 rounded-[2rem] relative overflow-hidden group/status mb-12"
                  style={{
                    background: 'linear-gradient(135deg, rgba(20, 16, 40, 0.4) 0%, rgba(10, 9, 28, 0.6) 100%)',
                    backdropFilter: 'blur(24px)',
                    WebkitBackdropFilter: 'blur(24px)',
                    border: '1px solid rgba(245, 198, 76, 0.25)',
                    boxShadow: '0 0 40px rgba(0, 0, 0, 0.5), inset 0 0 20px rgba(245, 198, 76, 0.05)'
                  }}>
                  <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full pointer-events-none bg-[radial-gradient(circle,rgba(245,198,76,0.15),transparent_70%)] blur-2xl" />
                  <div className="absolute top-0 inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-[#f5c64c]/40 to-transparent pointer-events-none" />
                  
                  <h3 className="font-serif text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#ffe58f] to-[#d4af37] mb-3">
                    Awaiting Broadcast Initialization
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed mb-8">
                    The cryptographic drawing algorithm is securely locked until the scheduled time. When the broadcast begins, the engine will select verified winners in real-time directly from our administration hub.
                  </p>
                  <div className="inline-flex items-center justify-center gap-3 px-5 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20 shadow-inner">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.8)] animate-ping absolute" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.8)] relative" />
                    <span className="text-amber-300/90 text-[11px] font-black uppercase tracking-[0.2em]">Secure System Ready</span>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Verified Draw Guarantees */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Box 1 - Green Theme (Provably Fair RNG) */}
            <div className="flex flex-col items-center text-center p-8 rounded-[1.25rem] relative overflow-hidden group/card"
              style={{
                background: 'linear-gradient(180deg, rgba(6, 20, 15, 0.95) 0%, rgba(3, 11, 8, 0.98) 100%)',
                border: '1px solid rgba(16, 185, 129, 0.25)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
              }}>
              <div className="absolute -bottom-10 inset-x-12 h-20 bg-emerald-500/20 blur-[24px] rounded-full pointer-events-none" />
              <div className="absolute bottom-0 inset-x-24 h-[3px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent blur-[1px]" />

              <div className="w-14 h-14 rounded-full flex items-center justify-center mb-6 relative">
                <div className="absolute inset-0 rounded-full border border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.25)]" />
                <ShieldCheck className="w-6 h-6 text-emerald-400 relative z-10" />
              </div>

              <div className="flex flex-col items-center gap-2 mb-4">
                <h4 className="font-serif italic font-bold text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-emerald-100 to-emerald-400">
                  Provably Fair RNG
                </h4>
                <div className="flex items-center justify-center gap-2">
                  <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-emerald-500/70" />
                  <div className="w-1.5 h-1.5 rotate-45 bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                  <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-emerald-500/70" />
                </div>
              </div>
              <p className="text-[13px] text-white/70 leading-relaxed font-medium">
                Independent cryptographically seed-based draw algorithms.
              </p>
            </div>

            {/* Box 2 - Blue Theme (Exclusive Prize Pool) */}
            <div className="flex flex-col items-center text-center p-8 rounded-[1.25rem] relative overflow-hidden group/card"
              style={{
                background: 'linear-gradient(180deg, rgba(8, 14, 30, 0.95) 0%, rgba(4, 7, 18, 0.98) 100%)',
                border: '1px solid rgba(59, 130, 246, 0.25)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
              }}>
              <div className="absolute -bottom-10 inset-x-12 h-20 bg-blue-500/20 blur-[24px] rounded-full pointer-events-none" />
              <div className="absolute bottom-0 inset-x-24 h-[3px] bg-gradient-to-r from-transparent via-blue-400 to-transparent blur-[1px]" />

              <div className="w-14 h-14 rounded-full flex items-center justify-center mb-6 relative">
                <div className="absolute inset-0 rounded-full border border-blue-500/40 shadow-[0_0_15px_rgba(59,130,246,0.25)]" />
                <Trophy className="w-6 h-6 text-blue-400 relative z-10" />
              </div>

              <div className="flex flex-col items-center gap-2 mb-4">
                <h4 className="font-serif italic font-bold text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-blue-100 to-blue-400">
                  Exclusive Prize Pool
                </h4>
                <div className="flex items-center justify-center gap-2">
                  <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-blue-500/70" />
                  <div className="w-1.5 h-1.5 rotate-45 bg-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                  <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-blue-500/70" />
                </div>
              </div>
              <p className="text-[13px] text-white/70 leading-relaxed font-medium">
                Tier 1, Tier 2, Tier 3 and 10+ festive reward hampers.
              </p>
            </div>

            {/* Box 3 - Pink Theme (4,280+ Confirmed) */}
            <div className="flex flex-col items-center text-center p-8 rounded-[1.25rem] relative overflow-hidden group/card"
              style={{
                background: 'linear-gradient(180deg, rgba(28, 8, 14, 0.95) 0%, rgba(16, 4, 8, 0.98) 100%)',
                border: '1px solid rgba(244, 63, 94, 0.25)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
              }}>
              <div className="absolute -bottom-10 inset-x-12 h-20 bg-rose-500/20 blur-[24px] rounded-full pointer-events-none" />
              <div className="absolute bottom-0 inset-x-24 h-[3px] bg-gradient-to-r from-transparent via-rose-400 to-transparent blur-[1px]" />

              <div className="w-14 h-14 rounded-full flex items-center justify-center mb-6 relative">
                <div className="absolute inset-0 rounded-full border border-rose-500/40 shadow-[0_0_15px_rgba(244,63,94,0.25)]" />
                <Users className="w-6 h-6 text-rose-400 relative z-10" />
              </div>

              <div className="flex flex-col items-center gap-2 mb-4">
                <h4 className="font-serif italic font-bold text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-rose-100 to-rose-400">
                  4,280+ Confirmed
                </h4>
                <div className="flex items-center justify-center gap-2">
                  <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-rose-500/70" />
                  <div className="w-1.5 h-1.5 rotate-45 bg-rose-400 shadow-[0_0_8px_rgba(244,63,94,0.8)]" />
                  <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-rose-500/70" />
                </div>
              </div>
              <p className="text-[13px] text-white/70 leading-relaxed font-medium">
                Registered participants entering this festival draw.
              </p>
            </div>
          </div>

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
