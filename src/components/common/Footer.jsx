import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import deepamImg from '../../assets/Deepam.png';
import { Flame, ShieldCheck, Mail, Phone, Clock, Heart, Award, Users, Send, CheckCircle2 } from 'lucide-react';

const Facebook = ({ className }) => <svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>;
const Instagram = ({ className }) => <svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>;
const Twitter = ({ className }) => <svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>;
const Youtube = ({ className }) => <svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.082 0 12 0 12s0 3.918.501 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.377.55 9.377.55s7.505 0 9.377-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.918 24 12 24 12s0-3.918-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>;
const Linkedin = ({ className }) => <svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim() !== '') {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 5000); // Reset after 5s
      setEmail('');
    }
  };

  return (
    <footer className="relative bg-gradient-to-b from-[#0a0c1a] via-[#0f0e26] to-[#12091f] border-t border-[#e5b32f]/20 pt-16 pb-12 overflow-hidden">
      {/* Subtle festive background glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#28114b]/30 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#541026]/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-12 gap-10 xl:gap-8 pb-12 border-b border-white/10">
          {/* Column 1: Brand & Overview (Spans 3 on large screens) */}
          <div className="lg:col-span-3 xl:col-span-3 space-y-4 xl:pr-6">
            <Link to="/" className="flex items-center gap-3 sm:gap-4 group focus:outline-none mb-3" aria-label="Diwali Dhamaka Home">
              <img 
                src={deepamImg} 
                alt="SparkFest Logo" 
                className="h-14 sm:h-16 md:h-20 object-contain animate-logo-3d-float hover:scale-105 transition-all duration-300 origin-left"
              />
              <div className="flex flex-col items-start justify-center space-y-1.5 group-hover:scale-105 transition-transform duration-300 origin-left">
                <span className="font-serif font-extrabold text-3xl sm:text-4xl tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[#ffed4a] via-[#f59e0b] to-[#ffed4a] leading-none animate-text-flicker" style={{ WebkitTextStroke: '1.5px rgba(180,83,9,0.6)' }}>
                  Diwali
                </span>
                <span className="font-serif italic font-bold text-sm sm:text-base tracking-[0.2em] text-white/90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] uppercase leading-none">
                  Dhamaka
                </span>
              </div>
            </Link>

            <p className="text-[13px] sm:text-sm text-[#fcf8f0]/80 leading-relaxed max-w-sm italic font-medium">
              India's premium Diwali rewards program. Light up your festivities and win guaranteed certified prizes!
            </p>

            <div className="pt-4 flex items-center gap-2.5 group cursor-default">
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#e5b32f]/20 to-transparent flex items-center justify-center border border-[#e5b32f]/30 group-hover:border-[#e5b32f] transition-colors duration-300 shadow-[0_0_10px_rgba(229,179,47,0.1)]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#f5c64c]" />
              </div>
              <span className="text-[11.5px] sm:text-[13px] font-serif text-[#ffe58f] tracking-wide">100% Secure & Audit Verified</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="xl:col-span-2 xl:border-l border-[#e5b32f]/15 xl:pl-8">
            <h4 className="font-serif text-sm font-bold tracking-wider text-[#ffe58f] uppercase mb-4 relative inline-block">
              Quick Links
              <div className="absolute -bottom-1 left-0 w-1/2 h-[1px] bg-gradient-to-r from-[#e5b32f] to-transparent"></div>
            </h4>
            <ul className="space-y-3 text-sm text-[#fcf8f0]/70">
              {[['Home', '/'], ['About Diwali Dhamaka', '/about'], ['How It Works', '/how-it-works'], ['Grand Prizes', '/prizes'], ['Special Offers', '/offers'], ['Verified Winners', '/winners'], ['Watch Live Draw', '/live-draw']].map(([title, path]) => (
                <li key={path} className="group">
                  <Link to={path} className={`inline-flex items-center gap-2 transition-all duration-300 transform group-hover:translate-x-1.5 ${path === '/live-draw' ? 'text-rose-300 hover:text-rose-400' : 'hover:text-[#ffe58f]'}`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#e5b32f] opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-[0_0_5px_rgba(229,179,47,0.8)]"></span>
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Legal & Governance */}
          <div className="xl:col-span-2 xl:border-l border-[#e5b32f]/15 xl:pl-8">
            <h4 className="font-serif text-sm font-bold tracking-wider text-[#ffe58f] uppercase mb-4 relative inline-block">
              Legal & Safety
              <div className="absolute -bottom-1 left-0 w-1/2 h-[1px] bg-gradient-to-r from-[#e5b32f] to-transparent"></div>
            </h4>
            <ul className="space-y-3 text-sm text-[#fcf8f0]/70">
              {[['Privacy Policy', '/privacy-policy'], ['Terms & Conditions', '/terms'], ['Responsible Play', '/responsible-participation'], ['Lucky Draw Rules', '/faq'], ['Refund & Return Policy', '/refund-policy'], ['Shopping Policy', '/shopping-policy'], ['Admin Portal', '/admin']].map(([title, path]) => (
                <li key={path} className="group">
                  <Link to={path} className={`inline-flex items-center gap-2 transition-all duration-300 transform group-hover:translate-x-1.5 ${title === 'Admin Portal' ? 'text-xs text-slate-400 hover:text-white' : 'hover:text-[#ffe58f]'}`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#e5b32f] opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-[0_0_5px_rgba(229,179,47,0.8)]"></span>
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Support */}
          <div className="xl:col-span-2 xl:border-l border-[#e5b32f]/15 xl:pl-8">
            <h4 className="font-serif text-sm font-bold tracking-wider text-[#ffe58f] uppercase mb-4 relative inline-block">
              Direct Support
              <div className="absolute -bottom-1 left-0 w-1/2 h-[1px] bg-gradient-to-r from-[#e5b32f] to-transparent"></div>
            </h4>
            <ul className="space-y-4 text-sm text-[#fcf8f0]/70 mt-2">
              <li className="group">
                <a href="mailto:support@viswasluckydraw.com" className="flex items-start gap-3 transition-all duration-300 transform group-hover:translate-x-1.5 hover:text-[#ffe58f]">
                  <div className="w-6 h-6 rounded bg-[#181a38] border border-[#e5b32f]/30 flex items-center justify-center shrink-0 group-hover:border-[#e5b32f] group-hover:shadow-[0_0_8px_rgba(229,179,47,0.3)] transition-all">
                    <Mail className="w-3 h-3 text-[#e5b32f]" />
                  </div>
                  <span className="mt-0.5 break-all">support@viswasluckydraw.com</span>
                </a>
              </li>
              <li className="group">
                <a href="tel:+918005552026" className="flex items-start gap-3 transition-all duration-300 transform group-hover:translate-x-1.5 hover:text-[#ffe58f]">
                  <div className="w-6 h-6 rounded bg-[#181a38] border border-[#e5b32f]/30 flex items-center justify-center shrink-0 group-hover:border-[#e5b32f] group-hover:shadow-[0_0_8px_rgba(229,179,47,0.3)] transition-all">
                    <Phone className="w-3 h-3 text-[#e5b32f]" />
                  </div>
                  <span className="mt-0.5">1800-555-2026 (Toll Free)</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-xs text-white/50 group cursor-default transition-all duration-300 transform hover:translate-x-1.5 hover:text-white/80">
                <div className="w-6 h-6 rounded bg-[#181a38]/50 border border-[#e5b32f]/10 flex items-center justify-center shrink-0 group-hover:border-[#e5b32f]/40 transition-all">
                  <Clock className="w-3 h-3 text-[#e5b32f]/70" />
                </div>
                <span className="mt-1 leading-tight">Mon - Sat:<br/>9:00 AM - 8:00 PM (IST)</span>
              </li>
            </ul>
          </div>

          {/* Column 5: Follow Us & Newsletter */}
          <div className="lg:col-span-3 xl:col-span-3 xl:border-l border-[#e5b32f]/15 xl:pl-8 flex flex-col justify-start">
            <h4 className="font-serif text-sm font-bold tracking-wider text-[#ffe58f] uppercase mb-4 relative inline-flex items-center gap-2 w-max">
              <Users className="w-4 h-4 text-[#e5b32f]" />
              Follow Us
              <div className="absolute -bottom-1 left-0 w-1/2 h-[1px] bg-gradient-to-r from-[#e5b32f] to-transparent"></div>
            </h4>
            
            <div className="flex items-center gap-3">
              {[
                { icon: Facebook, href: 'https://facebook.com', color: 'hover:text-[#1877F2] hover:border-[#1877F2] hover:shadow-[0_0_15px_rgba(24,119,242,0.5)]', delay: 'delay-0' },
                { icon: Instagram, href: 'https://instagram.com', color: 'hover:text-[#E4405F] hover:border-[#E4405F] hover:shadow-[0_0_15px_rgba(228,64,95,0.5)]', delay: 'delay-[50ms]' },
                { icon: Twitter, href: 'https://twitter.com', color: 'hover:text-[#1DA1F2] hover:border-[#1DA1F2] hover:shadow-[0_0_15px_rgba(29,161,242,0.5)]', delay: 'delay-[100ms]' },
                { icon: Youtube, href: 'https://youtube.com', color: 'hover:text-[#FF0000] hover:border-[#FF0000] hover:shadow-[0_0_15px_rgba(255,0,0,0.5)]', delay: 'delay-[150ms]' },
                { icon: Linkedin, href: 'https://linkedin.com', color: 'hover:text-[#0A66C2] hover:border-[#0A66C2] hover:shadow-[0_0_15px_rgba(10,102,194,0.5)]', delay: 'delay-[200ms]' }
              ].map((social, idx) => {
                const Icon = social.icon;
                return (
                  <a 
                    key={idx} 
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group relative overflow-hidden w-10 h-10 rounded-full border border-[#e5b32f]/40 flex items-center justify-center text-[#ffe58f] transition-all duration-500 hover:-translate-y-2 hover:scale-110 bg-[#12142d] ${social.color} ${social.delay}`}
                  >
                    {/* Sweeping glare */}
                    <div className="absolute top-0 bottom-0 left-0 w-5 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:animate-button-sweep z-10"></div>
                    
                    <Icon className="w-[18px] h-[18px] relative z-20 transition-transform duration-300 group-hover:scale-110" />
                  </a>
                );
              })}
            </div>

            <div className="w-full h-[1px] bg-gradient-to-r from-[#e5b32f]/40 to-transparent my-8"></div>

            <div className="flex items-center gap-2.5 mb-2">
              <Mail className="w-5 h-5 text-[#e5b32f]" />
              <h4 className="font-bold text-[15px] text-white">
                Subscribe to Our Newsletter
              </h4>
            </div>
            
            <p className="text-[13px] text-white/50 mb-5">
              Get the latest updates, offers and news.
            </p>
            
            {subscribed ? (
              <div className="flex items-center gap-2.5 p-3.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-sm animate-[fadeIn_0.5s_ease-out]">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>Thank you for subscribing! We'll keep you updated.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="relative group">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address" 
                  required
                  className="w-full bg-[#12142d] border border-[#e5b32f]/20 rounded-full py-3.5 pl-5 pr-[110px] text-[13px] text-white focus:outline-none focus:border-[#e5b32f]/60 focus:bg-[#181a38] transition-all"
                />
                <button type="submit" className="absolute right-1.5 top-1.5 bottom-1.5 bg-gradient-to-r from-[#ffe58f] via-[#e5b32f] to-[#d4af37] text-[#0b0d1e] font-bold text-[13px] px-4 rounded-full flex items-center gap-2 hover:shadow-[0_0_15px_rgba(229,179,47,0.5)] hover:scale-105 active:scale-95 transition-all">
                  <Send className="w-3.5 h-3.5 -ml-1" />
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>© 2026 Diwali Dhamaka. All rights reserved. Built for festive corporate celebrations.</p>

          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-amber-300/80">
              <ShieldCheck className="w-4 h-4" />
              Secure & Responsible Participation
            </span>
            <span className="px-2 py-0.5 rounded border border-white/20 text-[11px] font-semibold text-white/60">
              18+ Only
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
