import React, { useState, useEffect } from 'react';
import { HelpCircle, Search, ChevronDown, Sparkles } from 'lucide-react';
import { api } from '../services/api';
import howItWorksBg from '../../Images/how-it-works-background.png';

export default function FAQ() {
  const [faqs, setFaqs] = useState([]);
  const [categories, setCategories] = useState(['All', 'General', 'Participation', 'Prizes & Rewards', 'Delivery & Security']);
  const [selectedCat, setSelectedCat] = useState('General');
  const [search, setSearch] = useState('');
  const [activeFaq, setActiveFaq] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const allFaqs = [
      {
        id: 1,
        category: 'General',
        question: 'What is SparkFest Diwali Dhamaka?',
        answer: 'SparkFest Diwali Dhamaka is our exclusive annual lucky draw event offering participants a chance to win premium cracker hampers and exclusive rewards to brighten their Diwali celebrations.'
      },
      {
        id: 2,
        category: 'General',
        question: 'How do I participate in the lucky draw?',
        answer: 'Simply register on our platform, verify your mobile number, and purchase an entry ticket. Each ticket grants you a unique number for the upcoming live draw.'
      },

      {
        id: 12,
        category: 'General',
        question: 'Are there any entry fees hidden beyond the ticket price?',
        answer: 'No, the ticket price is absolutely final. We believe in complete transparency, and there are no hidden charges or processing fees at any stage.'
      },
      {
        id: 3,
        category: 'Participation',
        question: 'Can I purchase multiple tickets?',
        answer: 'Yes! You can purchase multiple tickets to increase your chances of winning. There is no limit to the number of entries a single participant can have.'
      },
      {
        id: 4,
        category: 'Participation',
        question: 'Is my ticket transferrable to someone else?',
        answer: 'No, tickets are strictly non-transferable and are tied to the registered mobile number and identity of the purchaser to ensure absolute fairness.'
      },
      {
        id: 5,
        category: 'Prizes & Rewards',
        question: 'How are the winners selected in the live draw?',
        answer: 'Winners are selected through a completely transparent, verified random draw system that is broadcasted live on our platform to ensure fairness for all participants.'
      },
      {
        id: 6,
        category: 'Prizes & Rewards',
        question: 'Are the prize amounts refundable or exchangeable?',
        answer: 'No, all prize amounts are strictly non-refundable. Once a winning ticket is confirmed and verified, the awarded prize value is final and cannot be cancelled or exchanged.'
      },
      {
        id: 7,
        category: 'Prizes & Rewards',
        question: 'How will I be notified if I win?',
        answer: 'Winner notifications and secure delivery tracking links are sent instantly via SMS and email to the registered contact details immediately upon the completion of the live draw.'
      },
      {
        id: 8,
        category: 'Delivery & Security',
        question: 'What do I need to provide for delivery verification?',
        answer: 'Winners must provide a valid government-recognized ID (Aadhaar/PAN) for identity and delivery verification before physical cracker gifts are dispatched.'
      },
      {
        id: 9,
        category: 'Delivery & Security',
        question: 'How safe is the delivery of crackers?',
        answer: 'All cracker deliveries are fully insured and handled safely by our certified logistics partners, strictly following necessary safety precautions and local regulations.'
      },
      {
        id: 10,
        category: 'Delivery & Security',
        question: 'Is my payment information secure?',
        answer: 'Absolutely. We use bank-grade 256-bit encryption and partner with industry-leading payment gateways. We never store your raw credit card or UPI details on our servers.'
      }
    ];

    let filtered = allFaqs;
    
    if (selectedCat !== 'All') {
      filtered = filtered.filter(f => f.category === selectedCat);
    }
    
    if (search.trim()) {
      const s = search.toLowerCase();
      filtered = filtered.filter(f => 
        f.question.toLowerCase().includes(s) || 
        f.answer.toLowerCase().includes(s)
      );
    }

    setFaqs(filtered);
    setLoading(false);
  }, [selectedCat, search]);

  return (
    <div className="pt-[68px] sm:pt-[76px] lg:pt-[80px] w-full">
      <div
        className="w-full flex flex-col justify-start overflow-x-hidden pb-10"
        style={{
          backgroundImage: `url(${howItWorksBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          backgroundRepeat: 'repeat-y'
        }}
      >
        <div className="pt-6 sm:pt-8 lg:pt-10 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col justify-start flex-1 mb-0">
      {/* Header */}
      <div className="text-center space-y-3 mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1e143b] border border-[#e5b32f]/40 text-[#ffe58f] text-xs font-semibold tracking-wider uppercase shadow-[0_0_15px_rgba(245,198,76,0.2)] animate-pulse">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Knowledge & Help Center</span>
        </div>
        
        <div className="flex flex-col items-center gap-3">
          <h1 className="font-serif italic font-extrabold text-[36px] sm:text-[46px] lg:text-[56px] tracking-wider drop-shadow-[0_4px_15px_rgba(0,0,0,0.9)] transition-all duration-700 hover:scale-[1.02]"
            style={{
              background: 'linear-gradient(135deg, #fff7cc 0%, #f5c64c 35%, #d4af37 65%, #c8922e 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              WebkitTextStroke: '1px rgba(245, 198, 76, 0.3)',
              lineHeight: '1.2'
            }}>
            Frequently Asked Questions
          </h1>
          <div className="flex items-center justify-center gap-2 mt-1">
            <div className="h-[1px] w-24 bg-gradient-to-r from-transparent to-[#d4af37]" />
            <div className="w-2 h-2 rotate-45 bg-[#f5c64c] shadow-[0_0_12px_rgba(245,198,76,0.9)] animate-[spin_4s_linear_infinite]" />
            <div className="h-[1px] w-24 bg-gradient-to-l from-transparent to-[#d4af37]" />
          </div>
        </div>

        <p className="text-sm sm:text-base text-white/70 max-w-xl mx-auto pt-4 leading-relaxed tracking-wide font-medium">
          Everything you need to know about Diwali Dhamaka Lucky Draw, verification, and claiming.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="w-4 h-4 text-white/40 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search question or keyword..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-[#131533] border border-[#e5b32f]/25 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#e5b32f]"
        />
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCat(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap ${
              selectedCat === cat
                ? 'bg-gradient-to-r from-[#ffe58f] to-[#e5b32f] text-[#0b0d1e] font-bold shadow-gold-glow'
                : 'bg-[#141634] text-white/70 hover:text-white border border-white/5'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* FAQ Accordions */}
      {faqs.length === 0 ? (
        <div className="text-center py-16 bg-[#131533] rounded-3xl border border-white/5">
          <p className="text-sm text-white/60">No questions found matching your criteria.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={faq.id}
                className={`rounded-[1.25rem] border transition-all duration-500 overflow-hidden relative group/faq ${
                  isOpen 
                    ? 'bg-gradient-to-b from-[rgba(25,28,68,0.95)] to-[rgba(10,11,26,0.98)] border-[#f5c64c]/40 shadow-[0_15px_40px_rgba(0,0,0,0.6),inset_0_0_20px_rgba(245,198,76,0.08)] scale-[1.02]' 
                    : 'bg-[#141634]/70 border-white/10 hover:border-[#f5c64c]/25 hover:bg-[#1a1c42]/90 hover:shadow-[0_8px_25px_rgba(0,0,0,0.4)]'
                }`}
                style={{ backdropFilter: 'blur(16px)' }}
              >
                {/* Subtle ambient glow behind active item */}
                {isOpen && (
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-[radial-gradient(circle,rgba(245,198,76,0.12),transparent_70%)] blur-2xl pointer-events-none" />
                )}

                <button
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none relative z-10"
                >
                  <span className={`font-serif text-base sm:text-lg font-bold transition-colors duration-300 ${isOpen ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#fff7cc] to-[#f5c64c]' : 'text-white/90 group-hover/faq:text-[#ffe58f]'}`}>
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-500 ${isOpen ? 'bg-[#f5c64c]/20 border border-[#f5c64c]/50 shadow-[0_0_12px_rgba(245,198,76,0.3)] rotate-180' : 'bg-white/5 border border-white/10'}`}>
                    <ChevronDown className={`w-4 h-4 transition-colors duration-300 ${isOpen ? 'text-[#f5c64c]' : 'text-white/50 group-hover/faq:text-[#ffe58f]'}`} />
                  </div>
                </button>
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 text-[13px] sm:text-sm text-white/70 leading-relaxed border-t border-white/10 pt-4 relative z-10 opacity-0 animate-[fadeIn_0.5s_ease-out_forwards]">
                    <style>{`
                      @keyframes fadeIn {
                        from { opacity: 0; transform: translateY(-10px); }
                        to { opacity: 1; transform: translateY(0); }
                      }
                    `}</style>
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
        </div>
      </div>
    </div>
  );
}
