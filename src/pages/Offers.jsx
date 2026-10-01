import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Gift, Tag, Clock, ChevronRight, CheckCircle2 } from 'lucide-react';
import { api } from '../services/api';
import grandPrizesBg from '../../Images/grand-prizes-bg.png';
import prizeTrophy from '../assets/prize-trophy.png';
import prizeGift from '../assets/prize-gift.png';
import prizeStar from '../assets/prize-star.png';

export default function Offers() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOffers() {
      try {
        setOffers([
          {
            id: 1,
            title: 'Golden Ticket',
            subtitle: 'VIP Access',
            description: 'Exclusive access to premium draws and guaranteed smaller rewards.',
            ctaText: 'GO VIP',
            ctaLink: '/participate?offer=ten_entry'
          },
          {
            id: 2,
            title: 'Festival Combo',
            subtitle: 'Buy 2 Get 1 Free',
            description: 'Purchase your tickets before the festival begins and get an extra ticket absolutely free.',
            ctaText: 'CLAIM OFFER',
            ctaLink: '/participate?offer=festival_special'
          },
          {
            id: 3,
            title: 'Early Bird Special',
            subtitle: '5 Tickets Pack',
            description: 'Maximize your chances with our special Diwali combo pack at a discounted price.',
            ctaText: 'GET COMBO',
            ctaLink: '/participate?offer=early_bird'
          }
        ]);
      } catch (err) {
        console.error('Failed to load offers:', err);
      } finally {
        setLoading(false);
      }
    }
    loadOffers();
  }, []);

  return (
    <div
      className="relative min-h-screen w-full pt-28 pb-20 overflow-hidden"
      style={{
        backgroundImage: `url(${grandPrizesBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="absolute inset-0 bg-[#060918]/75 backdrop-blur-[2px]"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1e143b] border border-[#e5b32f]/40 text-[#ffe58f] text-xs font-semibold tracking-wider uppercase shadow-gold-glow">
            <Tag className="w-3.5 h-3.5 text-amber-400" />
            <span>Exclusive Festive Specials</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-extrabold gold-gradient-text tracking-wide">
            Diwali Dhamaka Offers
          </h1>
          <p className="text-sm sm:text-base text-white/70">
            Multiply your chances and unlock bonus tickets with our limited-time festival offers.
          </p>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center">
          {offers.map((offer, idx) => {
            const style = idx === 0
              ? { bg: 'bg-gradient-to-b from-[#280c4e] via-[#140626] to-[#0a0314]', shadow: 'shadow-[0_0_25px_rgba(168,85,247,0.32),0_0_10px_rgba(245,198,76,0.25)] hover:shadow-[0_0_35px_rgba(192,132,252,0.5),0_0_15px_rgba(245,198,76,0.4)]', img: prizeTrophy, animClass: 'animate-trophy-hover' }
              : idx === 1
                ? { bg: 'bg-gradient-to-b from-[#4e0c18] via-[#2d050e] to-[#160207]', shadow: 'shadow-[0_0_25px_rgba(239,68,68,0.32),0_0_10px_rgba(245,198,76,0.25)] hover:shadow-[0_0_35px_rgba(248,113,113,0.5),0_0_15px_rgba(245,198,76,0.4)]', img: prizeGift, animClass: 'animate-gift-hover' }
                : { bg: 'bg-gradient-to-b from-[#093522] via-[#041f14] to-[#02120b]', shadow: 'shadow-[0_0_25px_rgba(16,185,129,0.32),0_0_10px_rgba(245,198,76,0.25)] hover:shadow-[0_0_35px_rgba(52,211,153,0.5),0_0_15px_rgba(245,198,76,0.4)]', img: prizeStar, animClass: 'animate-star-hover' };

            return (
              <div
                key={offer.id}
                className={`w-full max-w-[340px] min-h-[400px] relative rounded-2xl p-6 sm:p-7 text-center flex flex-col justify-between items-center cursor-pointer select-none transition-all duration-300 ease-out hover:-translate-y-2 ${style.bg} border border-[#f5c64c]/90 hover:border-[#ffe58f] ${style.shadow} group overflow-hidden`}
              >
                <div className="flex flex-col items-center justify-center mb-6 w-full">
                  <div className="relative min-h-[100px] flex items-end justify-center mb-6 w-full">
                    <img
                      src={style.img}
                      alt="Prize Icon"
                      className={`w-auto h-[85px] object-contain drop-shadow-[0_15px_15px_rgba(0,0,0,0.6)] group-hover:${style.animClass} transition-transform duration-500`}
                    />
                  </div>

                  <h3 className="font-serif text-[28px] font-bold text-white tracking-wide leading-tight mb-4 text-shadow-sm">
                    {offer.title}
                  </h3>

                  <div className="flex items-center justify-center gap-1.5 opacity-85 mb-4 w-full">
                    <div className="w-6 h-[1px] bg-gradient-to-r from-transparent to-[#dfb658]"></div>
                    <div className="w-1.5 h-1.5 rotate-45 bg-[#dfb658]"></div>
                    <div className="w-6 h-[1px] bg-gradient-to-l from-transparent to-[#dfb658]"></div>
                  </div>

                  <div className="text-[13px] font-bold text-[#f5c64c] tracking-wide mb-4 uppercase">
                    {offer.subtitle}
                  </div>

                  <p className="text-[13px] text-white/80 leading-relaxed max-w-[260px]">
                    {offer.description}
                  </p>
                </div>

                <Link
                  to={offer.ctaLink || '/participate'}
                  className="group/btn relative px-8 py-2.5 rounded-full overflow-hidden border border-[#dfb658]/70 hover:border-[#f5c64c] transition-all duration-300 flex items-center gap-2 mt-4 shadow-[0_0_15px_rgba(223,182,88,0.1)] hover:shadow-[0_0_20px_rgba(223,182,88,0.2)] bg-black/20"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#dfb658]/0 via-[#dfb658]/20 to-[#dfb658]/0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative font-serif font-bold text-[11px] text-[#f5c64c] tracking-[0.2em] uppercase">
                    {offer.ctaText || "VIEW OFFER"}
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#f5c64c] relative group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
