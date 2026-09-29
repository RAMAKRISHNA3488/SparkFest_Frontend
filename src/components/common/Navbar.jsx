import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Flame, Menu, X, ChevronRight, Sparkles, ShieldCheck, Gift } from 'lucide-react';
import deepamImg from '../../assets/Deepam.png';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'How It Works', path: '/how-it-works' },
  { name: 'Prizes', path: '/prizes' },
  { name: 'Offers', path: '/offers' },
  { name: 'Winners', path: '/winners' },
  { name: 'Contact', path: '/contact' }
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const isWinners = location.pathname.startsWith('/winners');

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isWinners
          ? `bg-[#080a18] border-b border-[#e5b32f]/15 ${isScrolled ? 'py-2.5 shadow-2xl' : 'py-4'}`
          : isScrolled
          ? 'glass-nav py-2.5 shadow-2xl bg-[#050614]/90 backdrop-blur-md'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 flex items-center justify-between">
        {/* Left: Brand Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 sm:gap-3 group focus:outline-none"
          aria-label="Diwali Dhamaka Home"
        >
          <img 
            src={deepamImg} 
            alt="SparkFest Logo" 
            className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain animate-logo-3d-float hover:scale-105 transition-all duration-300 origin-left"
          />

          <div className="flex flex-col items-center sm:items-start justify-center space-y-1 group-hover:scale-105 transition-transform duration-300 origin-left">
            <span className="font-serif font-extrabold text-2xl sm:text-3xl lg:text-[2.2rem] tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[#ffed4a] via-[#f59e0b] to-[#ffed4a] leading-none animate-text-flicker" style={{ WebkitTextStroke: '1px rgba(180,83,9,0.6)' }}>
              Diwali
            </span>

            <div className="flex items-center w-full justify-center sm:justify-start pt-0.5">
              <span className="font-serif text-[10px] sm:text-[12px] lg:text-[13px] text-amber-500 font-semibold tracking-wider drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                Light Up Your World
              </span>
            </div>
          </div>
        </Link>

        {/* Center/Right: Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`relative px-3 py-1.5 text-xs xl:text-sm font-medium tracking-wide transition-colors duration-200 rounded-md group ${active
                  ? 'text-[#ffe58f] font-semibold'
                  : 'text-[#fcf8f0]/80 hover:text-white hover:bg-white/5'
                  }`}
              >
                {link.name}
                {active && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-transparent via-[#e5b32f] to-transparent shadow-gold-glow"></span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA */}
        <div className="hidden sm:flex items-center gap-2.5">
          <Link
            to="/live-draw"
            className="hidden md:flex items-center gap-2 px-4 py-1.5 rounded-full relative group overflow-hidden border border-rose-500/60 hover:border-rose-500 transition-all duration-300 hover:shadow-[0_0_20px_rgba(244,63,94,0.7)]"
          >
            {/* Background fill on hover */}
            <div className="absolute inset-0 bg-rose-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
            
            {/* Sweeping glare on hover */}
            <div className="absolute top-0 bottom-0 left-0 w-8 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:animate-button-sweep"></div>
            
            <span className="relative flex h-2 w-2 z-10">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 group-hover:bg-white opacity-80"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500 group-hover:bg-white transition-colors duration-300"></span>
            </span>
            
            <span className="relative z-10 text-[11px] font-bold tracking-[0.2em] uppercase text-rose-400 group-hover:text-white transition-colors duration-300">
              Live Draw
            </span>
          </Link>

          <Link
            to="/admin"
            className="group relative inline-flex items-center gap-2 px-5 py-2 rounded-full font-bold text-xs sm:text-sm text-[#0b0d1e] bg-gradient-to-r from-[#ffe58f] via-[#e5b32f] to-[#d4af37] shadow-gold-glow hover:shadow-[0_0_30px_rgba(229,179,47,0.7)] hover:scale-105 active:scale-95 transition-all duration-200"
            title="Admin Portal"
          >
            <ShieldCheck className="w-4 h-4 text-[#0b0d1e] transition-transform group-hover:scale-110" />
            <span>ADMIN</span>
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex sm:hidden items-center gap-2">
          <Link
            to="/admin"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-[#0b0d1e] bg-gradient-to-r from-[#ffe58f] via-[#e5b32f] to-[#d4af37] shadow-gold-glow"
            title="Admin Portal"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#0b0d1e]" />
            <span>ADMIN</span>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-[#ffe58f] hover:bg-white/10 focus:outline-none"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0c0f24] border-b border-[#e5b32f]/20 shadow-2xl px-4 pt-3 pb-6 space-y-2 animate-fadeIn">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${active
                  ? 'bg-[#28114b] text-[#ffe58f] border-l-4 border-[#e5b32f]'
                  : 'text-[#fcf8f0]/80 hover:bg-white/5 hover:text-white'
                  }`}
              >
                {link.name}
              </Link>
            );
          })}

          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            <Link
              to="/live-draw"
              className="flex items-center justify-center gap-2 w-full py-2 text-sm font-semibold text-rose-300 bg-rose-950/40 rounded-lg border border-rose-500/20"
            >
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
              Watch Live Draw Room
            </Link>
            <Link
              to="/admin"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-full text-sm font-bold text-[#0b0d1e] bg-gradient-to-r from-[#ffe58f] via-[#e5b32f] to-[#d4af37] shadow-gold-glow"
            >
              <ShieldCheck className="w-4 h-4 text-[#0b0d1e]" />
              <span>ADMIN PANEL</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}

    </header>
  );
}
