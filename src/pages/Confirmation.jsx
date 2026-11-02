import React, { useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { CheckCircle2, Sparkles, Trophy, Calendar, Download, Eye, ArrowRight, Flame, ShieldCheck, Receipt } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export default function Confirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { ticket, tickets, participant, payment, whatsapp } = location.state || {};

  useEffect(() => {
    // Fire celebratory confetti burst upon load
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ffe58f', '#e5b32f', '#d4af37', '#ffaa00']
      });
    } catch (e) {}
  }, []);

  // Fallback demo data if visited directly
  const displayTicket = ticket || {
    ticketNumber: 'DD-2026-45872',
    drawName: 'Diwali Dhamaka Grand Lucky Draw 2026',
    drawDate: '10 Nov 2026',
    drawTime: '07:00 PM (IST)',
    status: 'ACTIVE'
  };

  const displayParticipant = participant || {
    fullName: 'Kiran Kumar',
    phone: '9876543210'
  };

  const cleanPhone = (displayParticipant.phone || '').replace(/\D/g, '');
  const tokenListText = (tickets && tickets.length > 1)
    ? tickets.map((t, idx) => `  ${idx + 1}. *${t.ticketNumber}*`).join('\n')
    : `🎟️ *TOKEN ID:* *${displayTicket.ticketNumber}*`;

  const defaultWhatsappMessage =
`✨ *DIWALI DHAMAKA GRAND LUCKY DRAW 2026* ✨

Congratulations *${displayParticipant.fullName}*! Your participation is confirmed and your official lucky token has been generated.

${tokenListText}

📅 *Draw Date:* ${displayTicket.drawDate || '10 Nov 2026'}
⏰ *Draw Time:* ${displayTicket.drawTime || '07:00 PM (IST)'}
🔒 *Status:* VERIFIED & ACTIVE

👉 *View & Download Your Official Voucher:*
${window.location.origin}/ticket/${displayTicket.ticketNumber}

Please save this message for draw verification. Good luck! 🪔✨`;

  const whatsappUrl = (whatsapp && whatsapp.whatsappUrl)
    ? whatsapp.whatsappUrl
    : `https://api.whatsapp.com/send?phone=91${cleanPhone}&text=${encodeURIComponent(defaultWhatsappMessage)}`;

  const handleDownloadPdf = async () => {
    const element = document.getElementById('ticket-card');
    if (!element) return;
    
    try {
      const canvas = await html2canvas(element, {
        scale: 3, // High quality
        backgroundColor: '#1b1236',
        logging: false
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a5'
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      // Center the ticket vertically in the PDF
      const yPos = (pdf.internal.pageSize.getHeight() - pdfHeight) / 2;
      
      pdf.addImage(imgData, 'PNG', 0, yPos, pdfWidth, pdfHeight);
      pdf.save(`SparkFest_Ticket_${displayTicket.ticketNumber}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <div className="pt-28 pb-20 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#1b1236] via-[#141634] to-[#0c0d20] border-2 border-[#e5b32f]/50 shadow-[0_0_60px_rgba(229,179,47,0.3)] space-y-6 relative overflow-hidden">
        {/* Top Celebration Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 text-xs font-semibold uppercase tracking-wider">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Participation Confirmed</span>
        </div>

        <div className="space-y-2">
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold gold-gradient-text tracking-wide">
            Congratulations!
          </h1>
          <p className="text-sm text-white/80">
            Welcome, <span className="font-bold text-[#ffe58f]">{displayParticipant.fullName}</span>. Your official lucky draw entry is registered and confirmed for the Grand Draw.
          </p>
          
          <div className="mt-4 p-3.5 sm:p-4 rounded-xl bg-emerald-900/20 border border-emerald-500/30 flex items-center justify-between gap-4 max-w-md mx-auto shadow-inner backdrop-blur-sm animate-fadeIn">
             <div className="flex items-center gap-3 text-left">
               <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 border border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                 <svg className="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
                   <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                 </svg>
               </div>
               <div>
                 <div className="text-sm font-semibold text-emerald-300">Sent to WhatsApp!</div>
                 <div className="text-xs text-white/60">Token sent to +91 {displayParticipant.phone}</div>
               </div>
             </div>
             <a
               href={whatsappUrl}
               target="_blank"
               rel="noopener noreferrer"
               className="shrink-0 px-3.5 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/40 text-emerald-300 hover:text-emerald-200 text-xs font-semibold transition-all flex items-center gap-1.5 shadow-sm hover:scale-105 active:scale-95"
               title="Open Token in WhatsApp"
             >
               <span>Open</span>
               <ArrowRight className="w-3.5 h-3.5" />
             </a>
          </div>
        </div>

        {/* The Golden Ticket Card */}
        <div 
          id="ticket-card" 
          className="relative w-full rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(229,179,47,0.4)] transition-transform duration-500 hover:scale-[1.02] group/ticket border border-[#e5b32f]/20"
        >
          <img src="/Images/premium_ticket_bg.png" alt="Premium Token" className="w-full h-auto block" crossOrigin="anonymous" />

          {/* Dynamic Content Overlay */}
          <div className="absolute inset-0 flex">
             {/* Left side text overlays (Ticket Number & User Info) */}
             <div className="flex-1 relative">
                {/* User Info - Top Left */}
                <div className="absolute top-[8%] left-[5%] text-left">
                   <div className="font-extrabold text-[#ffe58f] text-[10px] sm:text-xs lg:text-sm drop-shadow-[0_3px_4px_rgba(0,0,0,1)] uppercase tracking-widest" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
                     {displayParticipant.fullName}
                   </div>
                   <div className="font-black text-[#e5b32f] font-mono text-[8px] sm:text-[10px] lg:text-xs drop-shadow-[0_3px_4px_rgba(0,0,0,1)] mt-0.5 tracking-wider" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
                     +91 {displayParticipant.phone}
                   </div>
                </div>

                {/* Ticket Number - Bottom Left/Center */}
                <div className="absolute bottom-[10%] left-[5%] text-left">
                   <div className="text-[6px] sm:text-[8px] lg:text-[10px] uppercase text-[#ffe58f]/90 font-bold tracking-widest drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] mb-0.5">Token ID</div>
                   <div className="font-mono text-sm sm:text-xl lg:text-2xl font-black text-[#ffe58f] drop-shadow-[0_4px_6px_rgba(0,0,0,1)] tracking-widest" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.9)' }}>
                     {displayTicket.ticketNumber}
                   </div>
                </div>
             </div>
             
             {/* Right side overlays */}
             <div className="w-[33%] relative">
                <div className="absolute top-[8%] right-[10%]">
                  <span className="px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[5px] sm:text-[7px] lg:text-[9px] uppercase font-extrabold text-[#0b0d1e] bg-gradient-to-r from-[#ffe58f] to-[#d4af37] shadow-[0_0_15px_rgba(229,179,47,0.8)] tracking-widest">
                    {displayTicket.status}
                  </span>
                </div>
             </div>
          </div>
          
          {/* Download Button (hidden in PDF) */}
          <button 
            data-html2canvas-ignore
            onClick={handleDownloadPdf}
            className="absolute top-[40%] right-[12%] sm:right-[15%] w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#0b0d1e]/60 backdrop-blur-md border border-[#e5b32f]/50 flex items-center justify-center text-[#ffe58f] hover:bg-[#e5b32f] hover:text-[#0b0d1e] transition-all shadow-[0_0_15px_rgba(0,0,0,0.8)] hover:shadow-[0_0_25px_rgba(229,179,47,1)] group z-50"
            title="Download Ticket PDF"
          >
            <Download className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            <span className="absolute -bottom-5 sm:-bottom-6 text-[7px] sm:text-[9px] text-[#ffe58f] opacity-0 group-hover:opacity-100 transition-opacity uppercase font-bold tracking-wider drop-shadow-md whitespace-nowrap">Save PDF</span>
          </button>
        </div>

        {/* Razorpay Payment Receipt Box */}
        {payment && (
          <div className="p-4 sm:p-5 rounded-2xl bg-[#090b1c]/90 border border-[#e5b32f]/30 text-left space-y-3 shadow-inner">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Receipt className="w-4 h-4 text-[#ffe58f]" />
                <span className="font-serif font-bold text-xs sm:text-sm text-white">Payment Receipt</span>
              </div>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-[10px] font-semibold uppercase">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span>Verified</span>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-white/70">
              <div>
                <span className="text-white/40 block text-[10px] uppercase">Payment ID</span>
                <span className="font-mono text-white font-medium break-all">{payment.paymentId}</span>
              </div>
              <div>
                <span className="text-white/40 block text-[10px] uppercase">Order ID</span>
                <span className="font-mono text-white font-medium break-all">{payment.orderId}</span>
              </div>
              <div>
                <span className="text-white/40 block text-[10px] uppercase">Amount Paid</span>
                <span className="text-[#ffe58f] font-bold text-sm">₹{payment.amount}</span>
              </div>
              <div>
                <span className="text-white/40 block text-[10px] uppercase">Security Standard</span>
                <span className="text-white">HMAC-SHA256 Authenticated</span>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3 rounded-full font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.35)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
            </svg>
            <span>OPEN IN WHATSAPP</span>
          </a>

          <Link
            to={`/ticket/${displayTicket.ticketNumber}`}
            className="w-full sm:w-auto px-6 py-3 rounded-full font-bold text-xs sm:text-sm text-[#0b0d1e] bg-gradient-to-r from-[#ffe58f] via-[#e5b32f] to-[#d4af37] shadow-gold-glow hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <Eye className="w-4 h-4" />
            <span>VIEW VOUCHER</span>
          </Link>

          <Link
            to="/live-draw"
            className="w-full sm:w-auto px-6 py-3 rounded-full font-semibold text-xs sm:text-sm text-[#ffe58f] border border-[#e5b32f]/40 hover:bg-[#e5b32f]/10 transition-all flex items-center justify-center gap-2"
          >
            <span>LIVE DRAW</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
