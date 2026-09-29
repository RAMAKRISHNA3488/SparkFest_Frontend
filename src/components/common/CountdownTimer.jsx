import React, { useState, useEffect } from 'react';

export default function CountdownTimer({ targetDate, onStatusChange, variant = 'default' }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 12,
    hours: 8,
    minutes: 34,
    seconds: 27,
    status: 'SCHEDULED' // SCHEDULED, LIVE, COMPLETED
  });

  useEffect(() => {
    if (!targetDate) return;

    const calculateTime = () => {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();
      const diff = target - now;

      if (diff <= 0) {
        // If within 2 hours after target, consider it LIVE
        if (diff > -2 * 60 * 60 * 1000) {
          setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, status: 'LIVE' });
          if (onStatusChange) onStatusChange('LIVE');
        } else {
          setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, status: 'COMPLETED' });
          if (onStatusChange) onStatusChange('COMPLETED');
        }
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, status: 'SCHEDULED' });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const pad = (n) => String(n).padStart(2, '0');

  // Variant: Banner (Compact horizontal as in reference image Grand Draw banner)
  if (variant === 'banner') {
    const timeBlocks = [
      { label: 'Days', value: pad(timeLeft.days) },
      { label: 'Hours', value: pad(timeLeft.hours) },
      { label: 'Minutes', value: pad(timeLeft.minutes) },
      { label: 'Seconds', value: pad(timeLeft.seconds) }
    ];

    return (
      <div className="flex items-center justify-center gap-1.5 sm:gap-2.5">
        {timeBlocks.map((block, i) => (
          <React.Fragment key={block.label}>
            <div className="flex flex-col items-center">
              <div className="relative w-[48px] h-[54px] sm:w-[60px] sm:h-[68px] rounded-[12px] bg-gradient-to-b from-[#2a133b] to-[#0d0414] border-[1.5px] border-[#f5c64c]/50 shadow-[0_4px_20px_rgba(0,0,0,0.8),inset_0_2px_12px_rgba(245,198,76,0.25)] flex items-center justify-center overflow-hidden group">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(245,198,76,0.35),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                <div className="absolute top-1/2 left-0 w-full h-[1.5px] bg-black/60 z-10 pointer-events-none shadow-[0_1px_2px_rgba(255,255,255,0.1)]"></div>
                <span className="relative z-20 font-['Cinzel_Decorative'] text-[26px] sm:text-[34px] font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-[#ffffff] via-[#fde047] to-[#d97706] drop-shadow-[0_2px_8px_rgba(245,158,11,0.8)] animate-pulse-slow">
                  {block.value}
                </span>
              </div>
              <span className="text-[9px] sm:text-[10.5px] font-bold uppercase tracking-widest text-[#d4af37] mt-2 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                {block.label}
              </span>
            </div>
            {i < 3 && <span className="text-[18px] sm:text-[24px] font-bold text-[#e5b32f]/80 -mt-5 animate-pulse">:</span>}
          </React.Fragment>
        ))}
      </div>
    );
  }

  // Variant: Default Hero Card (Matching the Reference Image exactly)
  return (
    <div className="inline-flex items-center gap-1.5 sm:gap-6 px-3 sm:px-8 py-2.5 sm:py-4 rounded-2xl bg-[#080a1c]/80 sm:bg-transparent border border-amber-400/40 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.5)] animate-container-float max-w-full">
      {/* Days */}
      <div className="flex flex-col items-center min-w-[44px] sm:min-w-[70px]">
        <span className="font-['Cinzel_Decorative'] text-2xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#fde047] via-[#d97706] to-[#fde047] tracking-wider drop-shadow-[0_2px_10px_rgba(245,158,11,0.6)] animate-shimmer">
          {pad(timeLeft.days)}
        </span>
        <span className="text-[9px] sm:text-sm uppercase tracking-[0.12em] sm:tracking-[0.2em] text-amber-200/80 font-semibold mt-0.5 sm:mt-1">
          Days
        </span>
      </div>

      <div className="h-7 sm:h-10 w-px bg-gradient-to-b from-transparent via-amber-400/50 to-transparent"></div>

      {/* Hours */}
      <div className="flex flex-col items-center min-w-[44px] sm:min-w-[70px]">
        <span className="font-['Cinzel_Decorative'] text-2xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#fde047] via-[#d97706] to-[#fde047] tracking-wider drop-shadow-[0_2px_10px_rgba(245,158,11,0.6)] animate-shimmer">
          {pad(timeLeft.hours)}
        </span>
        <span className="text-[9px] sm:text-sm uppercase tracking-[0.12em] sm:tracking-[0.2em] text-amber-200/80 font-semibold mt-0.5 sm:mt-1">
          Hours
        </span>
      </div>

      <div className="h-7 sm:h-10 w-px bg-gradient-to-b from-transparent via-amber-400/50 to-transparent"></div>

      {/* Minutes */}
      <div className="flex flex-col items-center min-w-[44px] sm:min-w-[70px]">
        <span className="font-['Cinzel_Decorative'] text-2xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#fde047] via-[#d97706] to-[#fde047] tracking-wider drop-shadow-[0_2px_10px_rgba(245,158,11,0.6)] animate-shimmer">
          {pad(timeLeft.minutes)}
        </span>
        <span className="text-[9px] sm:text-sm uppercase tracking-[0.12em] sm:tracking-[0.2em] text-amber-200/80 font-semibold mt-0.5 sm:mt-1">
          Minutes
        </span>
      </div>

      <div className="h-7 sm:h-10 w-px bg-gradient-to-b from-transparent via-amber-400/50 to-transparent"></div>

      {/* Seconds */}
      <div className="flex flex-col items-center min-w-[44px] sm:min-w-[70px]">
        <span className="font-['Cinzel_Decorative'] text-2xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#fde047] via-[#d97706] to-[#fde047] tracking-wider animate-heartbeat-glow">
          {pad(timeLeft.seconds)}
        </span>
        <span className="text-[9px] sm:text-sm uppercase tracking-[0.12em] sm:tracking-[0.2em] text-amber-200/80 font-semibold mt-0.5 sm:mt-1">
          Seconds
        </span>
      </div>
    </div>
  );
}
