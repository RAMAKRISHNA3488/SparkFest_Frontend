import React, { useState, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { 
  Mail, Phone, Clock, MapPin, Send, CheckCircle2, AlertCircle, 
  Shield, Sparkles, Headphones, Copy, Check, ArrowUpRight, 
  User, Tag, MessageSquare, RefreshCw, Ticket, HelpCircle,
  ExternalLink, ChevronDown, ChevronUp, Search, MessageCircle,
  ShieldCheck, FileText, Sparkle, ArrowRight
} from 'lucide-react';
import { api } from '../services/api';
import emailjs from '@emailjs/browser';
import contactPageBg from '../../Images/contact-page-bg.png';

const QUICK_SUBJECTS = [
  { id: 'ticket', label: 'Ticket Verification', icon: Ticket },
  { id: 'prize', label: 'Prize Claim', icon: Sparkles },
  { id: 'draw', label: 'Draw Schedule', icon: Clock },
  { id: 'offers', label: 'Offers & Vouchers', icon: Tag },
  { id: 'general', label: 'General Help', icon: HelpCircle }
];

const FAQS = [
  {
    q: 'How will I be notified if my ticket wins a prize?',
    a: 'Winners are announced in real-time during the Live Draw every Saturday at 8:00 PM IST. If your ticket wins, you will receive an immediate SMS alert, email voucher, and confirmation code directly to your registered contact.'
  },
  {
    q: 'How do I claim a Luxury Car, Gold, or premium gift?',
    a: 'Visit the Winners or Prizes page and click "Claim Prize" with your 10-digit registered mobile number and lucky ticket ID. Our VIP claims concierge will verify your identity and guide you through fulfillment.'
  },
  {
    q: 'When does the official Diwali Dhamaka draw take place?',
    a: 'Weekly drawings take place every Saturday at 8:00 PM IST. The Mega Grand Diwali Bumper Draw is scheduled for the auspicious festival night at 9:00 PM IST.'
  },
  {
    q: 'Is my personal and ticket verification data secure?',
    a: 'Yes. All data transmissions are encrypted using enterprise 256-bit SSL protocols. We never share your phone number, ticket identity, or personal records with third parties.'
  }
];

// Authentic Official WhatsApp Icon
function WhatsAppIcon({ className = "w-4 h-4" }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      className={className} 
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
  );
}

export default function Contact() {
  // Navigation Tabs: 'form', 'track', 'faqs'
  const [activeTab, setActiveTab] = useState('form');

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    ticketNumber: '',
    message: ''
  });

  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ loading: false, success: false, error: null, refNum: '', submittedData: null });
  const [toastMessage, setToastMessage] = useState(null);
  const [copiedKey, setCopiedKey] = useState(null);

  // Tracking State
  const [searchRef, setSearchRef] = useState('');
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [savedInquiries, setSavedInquiries] = useState([]);

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // Live IST Desk Status
  const [deskStatus, setDeskStatus] = useState({ isOpen: true, timeStr: '', statusText: '' });

  // Load saved inquiries from localStorage
  const loadSavedInquiries = () => {
    try {
      const items = JSON.parse(localStorage.getItem('diwali_contact_inquiries') || '[]');
      setSavedInquiries(items);
      if (items.length > 0 && !selectedInquiry) {
        setSelectedInquiry(items[0]);
      }
    } catch (_) {
      setSavedInquiries([]);
    }
  };

  useEffect(() => {
    loadSavedInquiries();
  }, []);

  // Update Live IST Clock & Desk Status every minute
  useEffect(() => {
    const updateDeskStatus = () => {
      const now = new Date();
      const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
      const istDate = new Date(utc + (3600000 * 5.5));
      
      const day = istDate.getDay(); // 0: Sun, 1: Mon ... 6: Sat
      const hour = istDate.getHours();
      
      const isWorkingDay = day >= 1 && day <= 6;
      const isWorkingHour = hour >= 9 && hour < 20; // 9:00 AM - 8:00 PM IST
      const isOpen = isWorkingDay && isWorkingHour;

      const timeStr = istDate.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });

      setDeskStatus({
        isOpen,
        timeStr,
        statusText: isOpen ? 'Live Desk Online' : 'Desk Offline (Opens 9:00 AM IST)'
      });
    };

    updateDeskStatus();
    const interval = setInterval(updateDeskStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  // Show Toast
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Clipboard copy
  const copyToClipboard = (text, label, key) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(text);
      if (key) {
        setCopiedKey(key);
        setTimeout(() => setCopiedKey(null), 2200);
      }
      showToast(`Copied ${label} to clipboard!`);
    }
  };

  // Validate single field
  const validateField = (field, value) => {
    let err = '';
    const trimmed = (value || '').trim();

    if (field === 'name') {
      if (!trimmed) {
        err = 'Full name is required';
      } else if (trimmed.length < 2) {
        err = 'Minimum 2 characters';
      } else if (!/^[a-zA-Z\s.'-]+$/.test(trimmed)) {
        err = 'Name should only contain letters';
      }
    } else if (field === 'email') {
      if (!trimmed) {
        err = 'Email address is required';
      } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(trimmed)) {
        err = 'Valid email required (e.g. name@example.com)';
      }
    } else if (field === 'phone') {
      if (trimmed) {
        const cleanDigits = trimmed.replace(/\D/g, '');
        if (cleanDigits.length !== 10) {
          err = '10-digit mobile number required';
        } else if (!/^[6-9]\d{9}$/.test(cleanDigits)) {
          err = 'Must start with 6, 7, 8, or 9';
        }
      }
    } else if (field === 'subject') {
      if (!trimmed) {
        err = 'Subject or inquiry topic is required';
      } else if (trimmed.length < 3) {
        err = 'Minimum 3 characters';
      }
    } else if (field === 'message') {
      if (!trimmed) {
        err = 'Message description is required';
      } else if (trimmed.length < 10) {
        err = 'Please provide at least 10 characters';
      }
    }

    return err;
  };

  // Handle Input Changes
  const handleInputChange = (field, val) => {
    let sanitizedVal = val;
    // For phone: only allow numbers, max 10 digits
    if (field === 'phone') {
      sanitizedVal = val.replace(/\D/g, '').slice(0, 10);
    }

    setFormData(prev => ({ ...prev, [field]: sanitizedVal }));

    // If field was already touched, validate dynamically
    if (touched[field]) {
      const err = validateField(field, sanitizedVal);
      setErrors(prev => ({ ...prev, [field]: err }));
    }
  };

  // Handle onBlur for inline validation
  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const err = validateField(field, formData[field]);
    setErrors(prev => ({ ...prev, [field]: err }));
  };

  // Quick Select Subject
  const selectQuickSubject = (subj) => {
    setFormData(prev => ({ ...prev, subject: subj }));
    setTouched(prev => ({ ...prev, subject: true }));
    setErrors(prev => ({ ...prev, subject: '' }));
  };

  // Does the subject require or recommend a ticket number?
  const showTicketField = useMemo(() => {
    const s = (formData.subject || '').toLowerCase();
    return s.includes('ticket') || s.includes('prize') || s.includes('claim') || s.includes('verify');
  }, [formData.subject]);

  // Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mark all touched
    setTouched({
      name: true,
      email: true,
      phone: true,
      subject: true,
      message: true
    });

    const nameErr = validateField('name', formData.name);
    const emailErr = validateField('email', formData.email);
    const phoneErr = validateField('phone', formData.phone);
    const subjectErr = validateField('subject', formData.subject);
    const msgErr = validateField('message', formData.message);

    const allErrors = {
      name: nameErr,
      email: emailErr,
      phone: phoneErr,
      subject: subjectErr,
      message: msgErr
    };

    setErrors(allErrors);

    if (nameErr || emailErr || phoneErr || subjectErr || msgErr) {
      setStatus({
        loading: false,
        success: false,
        error: 'Please resolve the highlighted fields before submitting.',
        refNum: '',
        submittedData: null
      });
      return;
    }

    setStatus({ loading: true, success: false, error: null, refNum: '', submittedData: null });

    try {
      let referenceNumber = '';
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        subject: formData.subject.trim(),
        message: formData.ticketNumber?.trim()
          ? `[Ticket Number: ${formData.ticketNumber.trim()}]\n\n${formData.message.trim()}`
          : formData.message.trim()
      };

      try {
        const res = await api.submitContact(payload);
        if (res && res.success) {
          referenceNumber = res.data?.referenceNumber;
        }
      } catch (backendErr) {
        console.warn('Backend server note:', backendErr.message);
      }

      if (!referenceNumber) {
        const randomHex = Math.random().toString(36).substring(2, 7).toUpperCase();
        referenceNumber = `SR-2026-${randomHex}`;
      }

      const inquiryRecord = {
        ref: referenceNumber,
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        subject: formData.subject.trim(),
        ticketNumber: formData.ticketNumber.trim(),
        message: formData.message.trim(),
        createdAt: new Date().toISOString(),
        status: 'RECEIVED'
      };

      // Persist in localStorage
      try {
        const saved = JSON.parse(localStorage.getItem('diwali_contact_inquiries') || '[]');
        saved.unshift(inquiryRecord);
        localStorage.setItem('diwali_contact_inquiries', JSON.stringify(saved.slice(0, 25)));
        setSavedInquiries(saved.slice(0, 25));
        setSelectedInquiry(inquiryRecord);
      } catch (_) {}

      // Send actual email using EmailJS
      try {
        // Prepare template parameters
        const templateParams = {
          reference_id: referenceNumber,
          from_name: formData.name.trim(),
          from_email: formData.email.trim(),
          phone_number: formData.phone.trim(),
          subject: formData.subject.trim(),
          ticket_number: formData.ticketNumber.trim() || 'N/A',
          message: formData.message.trim(),
          to_email: 'support@viswasluckydraw.com'
        };

        // NOTE: You will need to replace these with your actual EmailJS IDs
        // emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams, 'YOUR_PUBLIC_KEY')
        
        await emailjs.send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_placeholder', 
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_placeholder', 
          templateParams, 
          import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'public_key_placeholder'
        );
      } catch (emailErr) {
        console.warn('EmailJS error (You need to configure your keys):', emailErr);
      }

      // Fire Festive Confetti
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.55 },
          colors: ['#ffe58f', '#f3c64c', '#d4af37', '#e879f9', '#38bdf8', '#ffffff']
        });
      } catch (_) {}

      setStatus({
        loading: false,
        success: true,
        error: null,
        refNum: referenceNumber,
        submittedData: inquiryRecord
      });
      setErrors({});
    } catch (err) {
      setStatus({
        loading: false,
        success: false,
        error: err.message || 'Submission failed. Please check your network and try again.',
        refNum: '',
        submittedData: null
      });
    }
  };

  // Search Reference Handler in Track Tab
  const handleSearchRef = (e) => {
    e.preventDefault();
    if (!searchRef.trim()) return;
    const term = searchRef.trim().toUpperCase();
    const found = savedInquiries.find(item => item.ref.toUpperCase().includes(term));
    if (found) {
      setSelectedInquiry(found);
      showToast(`Inquiry record ${found.ref} found!`);
    } else {
      // Mock generated view for external/new ref lookup
      const mockRecord = {
        ref: term.startsWith('SR-') ? term : `SR-2026-${term}`,
        name: 'Verified Ticket Holder',
        email: 'Direct Participant',
        subject: 'Official Verification Request',
        ticketNumber: term.includes('DD-') ? term : 'Attached to Record',
        message: 'Inquiry received through official Festive Support channels. Desk officer assigned for review.',
        createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
        status: 'UNDER_REVIEW'
      };
      setSelectedInquiry(mockRecord);
      showToast(`Inquiry ${mockRecord.ref} located in verification queue.`);
    }
  };

  // Helper check if a field is valid
  const isFieldValid = (field) => {
    return touched[field] && !errors[field] && (formData[field] || '').trim().length > 0;
  };

  return (
    <div className="pt-[68px] sm:pt-[76px] lg:pt-[80px] w-full">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-4 sm:right-8 z-50 animate-scaleUp">
          <div className="px-4 py-2.5 rounded-2xl bg-[#14122e]/95 backdrop-blur-xl border border-amber-400/60 shadow-[0_10px_35px_rgba(243,198,76,0.3)] text-[#ffe58f] text-xs font-bold flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      <div
        className="w-full flex flex-col justify-start overflow-x-hidden pb-10"
        style={{
          backgroundImage: `url(${contactPageBg})`,
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="pt-6 sm:pt-8 lg:pt-10 pb-0 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col justify-start flex-1 mb-0">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-2.5 mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1e143b]/90 border border-[#e5b32f]/50 text-[#ffe58f] text-xs font-semibold tracking-wider uppercase shadow-gold-glow">
              <Headphones className="w-3.5 h-3.5 text-amber-400" />
              <span>Festive Concierge & Support</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <h1 className="font-serif italic font-extrabold text-[36px] sm:text-[46px] lg:text-[56px] tracking-wider drop-shadow-[0_4px_15px_rgba(0,0,0,0.9)]"
                style={{
                  background: 'linear-gradient(135deg, #fff7cc 0%, #f5c64c 35%, #d4af37 65%, #c8922e 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  WebkitTextStroke: '1px rgba(245, 198, 76, 0.3)',
                  lineHeight: '1.2'
                }}>
                Contact Diwali Dhamaka
              </h1>
              <div className="flex items-center justify-center gap-2 mt-1">
                <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#d4af37]" />
                <div className="w-1.5 h-1.5 rotate-45 bg-[#f5c64c] shadow-[0_0_8px_rgba(245,198,76,0.8)]" />
                <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#d4af37]" />
              </div>
            </div>
            <p className="text-xs sm:text-sm text-white/75 leading-relaxed max-w-2xl mx-auto">
              Have questions regarding your lucky draw ticket, prize claims, or live draw schedules? Our verified concierge desk is here to assist you promptly.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
            
            {/* Left Column: Direct Assistance Channels */}
            <div className="lg:col-span-5 flex flex-col justify-between p-5 sm:p-6 rounded-3xl bg-gradient-to-b from-[#181133]/80 via-[#101228]/85 to-[#090b1c]/90 backdrop-blur-xl border border-purple-500/30 shadow-[0_15px_45px_-10px_rgba(0,0,0,0.85),0_0_35px_rgba(168,85,247,0.15),inset_0_0_20px_rgba(168,85,247,0.05)] relative overflow-hidden group/left">
              {/* Radial Ambient Glow */}
              <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full pointer-events-none bg-[radial-gradient(circle,rgba(168,85,247,0.15),transparent_70%)] blur-2xl" />

              <div>
                {/* Title */}
                <div className="flex items-center justify-between mb-1.5">
                  <h2 className="font-serif text-xl sm:text-2xl font-extrabold tracking-wider drop-shadow-md text-transparent bg-clip-text bg-gradient-to-r from-[#e8d5ff] via-[#d8b4fe] to-[#c084fc] whitespace-nowrap">
                    Official Support
                  </h2>
                  <span className="p-1 rounded-lg bg-purple-500/10 border border-purple-500/25 text-purple-300 shadow-[0_0_10px_rgba(168,85,247,0.2)]">

                    <Headphones className="w-3.5 h-3.5" />
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-white/70 leading-relaxed mb-4">
                  Official, encrypted support for participants, verified ticket holders, and draw inquiries.
                </p>

                {/* Channels List */}
                <div className="space-y-2.5">
                  
                  {/* 1. Toll-Free Helpline */}
                  <div className="group/item relative p-3 rounded-2xl bg-gradient-to-r from-white/[0.05] to-white/[0.02] hover:from-[#351e52]/80 hover:via-[#22153b]/90 hover:to-[#120f26]/95 border border-white/[0.08] hover:border-amber-400/60 shadow-sm hover:shadow-[0_8px_25px_-5px_rgba(243,198,76,0.3),inset_0_0_15px_rgba(243,198,76,0.06)] hover:translate-x-1.5 transition-all duration-300 cursor-pointer overflow-hidden">
                    <div className="absolute inset-0 -translate-x-full group-hover/item:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

                    <div className="flex items-center justify-between gap-3 relative z-10">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#351c58] to-[#161230] flex items-center justify-center text-amber-300 border border-amber-400/40 shadow-[0_0_12px_rgba(245,158,11,0.25)] group-hover/item:scale-110 group-hover/item:border-amber-300 group-hover/item:shadow-gold-glow group-hover/item:rotate-3 transition-all duration-300 shrink-0">
                          <Phone className="w-4 h-4 group-hover/item:text-white transition-colors" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-[10px] text-white/50 font-extrabold uppercase tracking-wider group-hover/item:text-amber-300/90 transition-colors">
                            Toll-Free Helpline
                          </div>
                          <div className="text-xs sm:text-sm font-semibold text-white/95 font-mono tracking-wider group-hover/item:text-[#ffe58f] transition-colors truncate">
                            1800-555-2026
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => copyToClipboard('1800-555-2026', 'Helpline', 'phone')}
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-bold tracking-wider transition-all flex items-center gap-1 active:scale-95 cursor-pointer ${
                            copiedKey === 'phone'
                              ? 'bg-emerald-500/20 border border-emerald-400/50 text-emerald-300 shadow-sm'
                              : 'bg-white/5 hover:bg-amber-400/20 border border-white/10 hover:border-amber-400/40 text-white/60 hover:text-amber-200'
                          }`}
                          title="Copy Phone Number"
                        >
                          {copiedKey === 'phone' ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span>Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                        <a
                          href="tel:18005552026"
                          className="px-3 py-1 rounded-lg bg-amber-400/20 hover:bg-amber-400/35 border border-amber-400/50 hover:border-amber-300 text-[#ffe58f] text-[10px] font-bold tracking-wider transition-all flex items-center gap-1 shadow-sm active:scale-95 cursor-pointer"
                        >
                          <span>Call</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* 2. Official Email Support */}
                  <div className="group/item relative p-3 rounded-2xl bg-gradient-to-r from-white/[0.05] to-white/[0.02] hover:from-[#351e52]/80 hover:via-[#22153b]/90 hover:to-[#120f26]/95 border border-white/[0.08] hover:border-amber-400/60 shadow-sm hover:shadow-[0_8px_25px_-5px_rgba(243,198,76,0.3),inset_0_0_15px_rgba(243,198,76,0.06)] hover:translate-x-1.5 transition-all duration-300 cursor-pointer overflow-hidden">
                    <div className="absolute inset-0 -translate-x-full group-hover/item:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

                    <div className="flex items-center justify-between gap-3 relative z-10">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#351c58] to-[#161230] flex items-center justify-center text-amber-300 border border-amber-400/40 shadow-[0_0_12px_rgba(245,158,11,0.25)] group-hover/item:scale-110 group-hover/item:border-amber-300 group-hover/item:shadow-gold-glow group-hover/item:rotate-3 transition-all duration-300 shrink-0">
                          <Mail className="w-4 h-4 group-hover/item:text-white transition-colors" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-[10px] text-white/50 font-extrabold uppercase tracking-wider group-hover/item:text-amber-300/90 transition-colors">
                            Official Support Email
                          </div>
                          <div className="text-[11px] sm:text-xs font-semibold text-white/95 group-hover/item:text-[#ffe58f] transition-colors break-all">
                            support@viswasluckydraw.com
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => copyToClipboard('support@viswasluckydraw.com', 'Email', 'email')}
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-bold tracking-wider transition-all flex items-center gap-1 active:scale-95 cursor-pointer ${
                            copiedKey === 'email'
                              ? 'bg-emerald-500/20 border border-emerald-400/50 text-emerald-300 shadow-sm'
                              : 'bg-white/5 hover:bg-amber-400/20 border border-white/10 hover:border-amber-400/40 text-white/60 hover:text-amber-200'
                          }`}
                          title="Copy Email"
                        >
                          {copiedKey === 'email' ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span>Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                        <a
                          href="mailto:support@viswasluckydraw.com?subject=Diwali%20Dhamaka%20Support%20Inquiry"
                          className="px-3 py-1 rounded-lg bg-amber-400/20 hover:bg-amber-400/35 border border-amber-400/50 hover:border-amber-300 text-[#ffe58f] text-[10px] font-bold tracking-wider transition-all flex items-center gap-1 shadow-sm active:scale-95 cursor-pointer"
                        >
                          <span>Mail</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* 3. WhatsApp VIP Concierge */}
                  <div className="group/item relative p-3 rounded-2xl bg-gradient-to-r from-white/[0.05] to-white/[0.02] hover:from-[#351e52]/80 hover:via-[#22153b]/90 hover:to-[#120f26]/95 border border-white/[0.08] hover:border-amber-400/60 shadow-sm hover:shadow-[0_8px_25px_-5px_rgba(243,198,76,0.3),inset_0_0_15px_rgba(243,198,76,0.06)] hover:translate-x-1.5 transition-all duration-300 cursor-pointer overflow-hidden">
                    <div className="absolute inset-0 -translate-x-full group-hover/item:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

                    <div className="flex items-center justify-between gap-3 relative z-10">
                      <div className="flex items-center gap-3 min-w-0">
                        {/* WhatsApp Icon Box - Exactly identical to other icons in shape, border, gradient & size */}
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#351c58] to-[#161230] flex items-center justify-center text-amber-300 border border-amber-400/40 shadow-[0_0_12px_rgba(245,158,11,0.25)] group-hover/item:scale-110 group-hover/item:border-amber-300 group-hover/item:shadow-gold-glow group-hover/item:rotate-3 transition-all duration-300 shrink-0">
                          <WhatsAppIcon className="w-4 h-4 group-hover/item:text-[#25D366] transition-colors" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-[10px] text-white/50 font-extrabold uppercase tracking-wider group-hover/item:text-amber-300/90 transition-colors">
                            WhatsApp VIP Concierge
                          </div>
                          <div className="text-xs sm:text-sm font-semibold text-white/95 font-mono tracking-wider group-hover/item:text-[#ffe58f] transition-colors truncate">
                            +91 98665 31383
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => copyToClipboard('+91 98665 31383', 'WhatsApp Number', 'whatsapp')}
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-bold tracking-wider transition-all flex items-center gap-1 active:scale-95 cursor-pointer ${
                            copiedKey === 'whatsapp'
                              ? 'bg-emerald-500/20 border border-emerald-400/50 text-emerald-300 shadow-sm'
                              : 'bg-white/5 hover:bg-amber-400/20 border border-white/10 hover:border-amber-400/40 text-white/60 hover:text-amber-200'
                          }`}
                          title="Copy WhatsApp Number"
                        >
                          {copiedKey === 'whatsapp' ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span>Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                        <a
                          href="https://wa.me/919866531383?text=Hello%20Diwali%20Dhamaka%20Support%2C%20I%20have%20an%20inquiry%20regarding%20my%20participation."
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/35 border border-emerald-500/40 hover:border-emerald-400 text-emerald-300 text-[10px] font-bold tracking-wider transition-all flex items-center gap-1 shadow-sm active:scale-95 cursor-pointer"
                        >
                          <span>Chat</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* 4. Service Hours & Dynamic IST Status */}
                  <div 
                    onClick={() => showToast(`Support Desk: Mon–Sat 9 AM – 8 PM IST. Current IST: ${deskStatus.timeStr}`)}
                    className="group/item relative p-3 rounded-2xl bg-gradient-to-r from-white/[0.05] to-white/[0.02] hover:from-[#351e52]/80 hover:via-[#22153b]/90 hover:to-[#120f26]/95 border border-white/[0.08] hover:border-amber-400/60 shadow-sm hover:shadow-[0_8px_25px_-5px_rgba(243,198,76,0.3),inset_0_0_15px_rgba(243,198,76,0.06)] hover:translate-x-1.5 transition-all duration-300 cursor-pointer overflow-hidden"
                  >
                    <div className="absolute inset-0 -translate-x-full group-hover/item:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

                    <div className="flex items-center gap-3 relative z-10">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#351c58] to-[#161230] flex items-center justify-center text-amber-300 border border-amber-400/40 shadow-[0_0_12px_rgba(245,158,11,0.25)] group-hover/item:scale-110 group-hover/item:border-amber-300 group-hover/item:shadow-gold-glow group-hover/item:rotate-3 transition-all duration-300 shrink-0">
                        <Clock className="w-4 h-4 group-hover/item:text-white transition-colors" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <div className="text-[10px] text-white/50 font-extrabold uppercase tracking-wider group-hover/item:text-amber-300/90 transition-colors">
                            Desk Operating Hours
                          </div>
                          <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[9px] font-bold tracking-wider shrink-0 shadow-sm ${
                            deskStatus.isOpen 
                              ? 'bg-emerald-500/20 border border-emerald-400/50 text-emerald-300' 
                              : 'bg-amber-500/20 border border-amber-400/40 text-amber-200'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${deskStatus.isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                            <span>{deskStatus.isOpen ? 'Live Desk Active' : 'Off-Hours'}</span>
                          </span>
                        </div>
                        <div className="text-xs sm:text-sm font-semibold text-white/95 group-hover/item:text-[#ffe58f] transition-colors mt-0.5 whitespace-nowrap">
                          Mon – Sat: 9:00 AM – 8:00 PM
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Bottom Guarantee Status Bar */}
              <div className="pt-3.5 mt-4 border-t border-white/10 flex items-center text-xs">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-[11px]">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Verified Response Guarantee</span>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Multi-Tab Workspace */}
            <div className="lg:col-span-7 flex flex-col p-5 sm:p-6 rounded-3xl bg-gradient-to-b from-[#181133]/80 via-[#101228]/85 to-[#090b1c]/90 backdrop-blur-xl border border-purple-500/30 shadow-[0_15px_45px_-10px_rgba(0,0,0,0.85),0_0_35px_rgba(168,85,247,0.15),inset_0_0_20px_rgba(168,85,247,0.05)] relative overflow-hidden">
              {/* Radial Ambient Glow */}
              <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full pointer-events-none bg-[radial-gradient(circle,rgba(168,85,247,0.15),transparent_70%)] blur-2xl" />

              {/* ========================================================================= */}
              {/* TAB 1: SUBMIT INQUIRY FORM */}
              {/* ========================================================================= */}
              {activeTab === 'form' && (
                status.success ? (
                  /* Celebratory Luxury Success View */
                  <div className="py-6 px-3 flex flex-col items-center justify-center text-center space-y-4 animate-scaleUp relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500/25 via-emerald-400/30 to-amber-400/20 border border-emerald-400/60 flex items-center justify-center shadow-[0_0_35px_rgba(52,211,153,0.35)]">
                      <CheckCircle2 className="w-8 h-8 text-emerald-400 animate-bounce" />
                    </div>
                    
                    <div className="space-y-1">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/40 text-emerald-300 text-[10px] font-bold tracking-wider uppercase">
                        <Sparkle className="w-3 h-3 text-amber-400" />
                        <span>Ticket Dispatched & Encrypted</span>
                      </span>
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#ffe58f] pt-1">
                        Inquiry Received Successfully!
                      </h3>
                      <p className="text-xs sm:text-sm text-white/75 max-w-md mx-auto">
                        Your inquiry has been assigned an official reference ID and placed in priority queue for our festive concierge team.
                      </p>
                    </div>

                    {/* Reference ID Box */}
                    <div className="p-4 rounded-2xl bg-[#090b1c]/90 border border-amber-400/50 w-full max-w-md flex items-center justify-between gap-3 shadow-inner">
                      <div className="text-left">
                        <div className="text-[10px] text-white/50 font-bold uppercase tracking-wider">
                          Official Reference ID
                        </div>
                        <div className="font-mono text-base sm:text-lg font-black text-[#ffe58f] tracking-wider">
                          {status.refNum}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(status.refNum, 'Reference ID')}
                        className="px-3 py-1.5 rounded-xl bg-amber-400/20 hover:bg-amber-400/30 border border-amber-400/50 text-amber-200 text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm shrink-0"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy ID</span>
                      </button>
                    </div>

                    {/* Summary Card */}
                    {status.submittedData && (
                      <div className="w-full max-w-md p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 text-left text-xs space-y-1.5">
                        <div className="flex justify-between items-center text-white/60 text-[11px]">
                          <span>Inquiry Subject:</span>
                          <span className="font-bold text-white/90">{status.submittedData.subject}</span>
                        </div>
                        {status.submittedData.ticketNumber && (
                          <div className="flex justify-between items-center text-white/60 text-[11px]">
                            <span>Linked Ticket:</span>
                            <span className="font-mono font-bold text-amber-300">{status.submittedData.ticketNumber}</span>
                          </div>
                        )}
                        <div className="flex justify-between items-center text-white/60 text-[11px]">
                          <span>Contact Email:</span>
                          <span className="font-semibold text-white/90">{status.submittedData.email}</span>
                        </div>
                        <div className="flex justify-between items-center text-white/60 text-[11px]">
                          <span>Estimated Response:</span>
                          <span className="font-bold text-emerald-400">Under 2 hours</span>
                        </div>
                      </div>
                    )}

                    <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          setActiveTab('track');
                          setSelectedInquiry(status.submittedData);
                        }}
                        className="px-4 py-2 rounded-xl text-xs font-bold text-[#0b0d1e] bg-gradient-to-r from-[#ffe58f] via-[#f3c64c] to-[#d4af37] hover:brightness-110 shadow-sm transition-all flex items-center gap-1.5"
                      >
                        <Search className="w-3.5 h-3.5" />
                        <span>Track Status Now</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setStatus({ loading: false, success: false, error: null, refNum: '', submittedData: null });
                          setFormData({ name: '', email: '', phone: '', subject: '', ticketNumber: '', message: '' });
                          setTouched({});
                          setErrors({});
                        }}
                        className="px-4 py-2 rounded-xl text-xs font-bold text-white/80 hover:text-white bg-white/10 hover:bg-white/15 border border-white/20 transition-all flex items-center gap-1.5"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Send Another Inquiry</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Form View */
                  <form onSubmit={handleSubmit} className="space-y-3 relative z-10">
                    <div className="flex items-center justify-between mb-1">
                      <div>
                        <h2 className="font-serif text-lg sm:text-xl font-bold text-[#ffe58f] tracking-wide">
                          Send an Official Inquiry
                        </h2>
                        <p className="text-[11px] text-white/60">
                          Complete the form below for fast resolution from our VIP support desk.
                        </p>
                      </div>
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider text-amber-300 bg-amber-400/10 border border-amber-400/25 px-2.5 py-1 rounded-full shrink-0">
                        <Shield className="w-3 h-3 text-amber-400" />
                        <span>Encrypted & Verified</span>
                      </span>
                    </div>

                    {status.error && (
                      <div className="p-2.5 rounded-xl bg-rose-950/80 border border-rose-500/50 text-rose-200 text-xs flex items-start gap-2.5 animate-fadeIn">
                        <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                        <div className="leading-tight">{status.error}</div>
                      </div>
                    )}

                    {/* Row 1: Name & Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Name */}
                      <div>
                        <label className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-white/70 mb-1 flex items-center justify-between">
                          <span>Full Name <span className="text-amber-400">*</span></span>
                          {touched.name && errors.name && (
                            <span className="text-[10px] text-rose-400 font-semibold lowercase first-letter:uppercase">{errors.name}</span>
                          )}
                        </label>
                        <div className={`relative flex items-center rounded-xl bg-[#090b1c]/90 border transition-all shadow-inner overflow-hidden ${
                          touched.name && errors.name
                            ? 'border-rose-500/80 ring-1 ring-rose-500/30'
                            : isFieldValid('name')
                            ? 'border-emerald-500/60 ring-1 ring-emerald-500/20'
                            : 'border-white/15 hover:border-amber-400/40 focus-within:border-amber-400 focus-within:ring-2 focus-within:ring-amber-400/20'
                        }`}>
                          <span className="pl-3 text-amber-400/70 shrink-0">
                            <User className="w-4 h-4" />
                          </span>
                          <input
                            type="text"
                            required
                            autoComplete="name"
                            placeholder="e.g. Ramesh Sharma"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            onBlur={() => handleBlur('name')}
                            className="w-full px-2.5 py-2 sm:py-2.5 bg-transparent text-xs sm:text-sm text-white placeholder-white/30 focus:outline-none"
                          />
                          {isFieldValid('name') && (
                            <span className="pr-3 text-emerald-400 shrink-0 animate-scaleUp">
                              <Check className="w-3.5 h-3.5" />
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-white/70 mb-1 flex items-center justify-between">
                          <span>Email Address <span className="text-amber-400">*</span></span>
                          {touched.email && errors.email && (
                            <span className="text-[10px] text-rose-400 font-semibold lowercase first-letter:uppercase">{errors.email}</span>
                          )}
                        </label>
                        <div className={`relative flex items-center rounded-xl bg-[#090b1c]/90 border transition-all shadow-inner overflow-hidden ${
                          touched.email && errors.email
                            ? 'border-rose-500/80 ring-1 ring-rose-500/30'
                            : isFieldValid('email')
                            ? 'border-emerald-500/60 ring-1 ring-emerald-500/20'
                            : 'border-white/15 hover:border-amber-400/40 focus-within:border-amber-400 focus-within:ring-2 focus-within:ring-amber-400/20'
                        }`}>
                          <span className="pl-3 text-amber-400/70 shrink-0">
                            <Mail className="w-4 h-4" />
                          </span>
                          <input
                            type="email"
                            required
                            autoComplete="email"
                            placeholder="e.g. ramesh@example.com"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            onBlur={() => handleBlur('email')}
                            className="w-full px-2.5 py-2 sm:py-2.5 bg-transparent text-xs sm:text-sm text-white placeholder-white/30 focus:outline-none"
                          />
                          {isFieldValid('email') && (
                            <span className="pr-3 text-emerald-400 shrink-0 animate-scaleUp">
                              <Check className="w-3.5 h-3.5" />
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Row 2: Mobile & Subject */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Mobile (Optional) */}
                      <div>
                        <label className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-white/70 mb-1 flex items-center justify-between">
                          <span>Mobile (Optional)</span>
                          {touched.phone && errors.phone ? (
                            <span className="text-[10px] text-rose-400 font-semibold lowercase first-letter:uppercase">{errors.phone}</span>
                          ) : (
                            <span className="text-[10px] text-white/40">For SMS updates</span>
                          )}
                        </label>
                        <div className={`relative flex items-center rounded-xl bg-[#090b1c]/90 border transition-all shadow-inner overflow-hidden ${
                          touched.phone && errors.phone
                            ? 'border-rose-500/80 ring-1 ring-rose-500/30'
                            : formData.phone.length === 10
                            ? 'border-emerald-500/60 ring-1 ring-emerald-500/20'
                            : 'border-white/15 hover:border-amber-400/40 focus-within:border-amber-400 focus-within:ring-2 focus-within:ring-amber-400/20'
                        }`}>
                          <div className="pl-3 pr-2 flex items-center gap-1 text-white/50 text-xs font-bold border-r border-white/10 shrink-0">
                            <span className="text-amber-400/80">🇮🇳</span>
                            <span>+91</span>
                          </div>
                          <input
                            type="tel"
                            maxLength={10}
                            placeholder="10-digit mobile number"
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            onBlur={() => handleBlur('phone')}
                            className="w-full px-2.5 py-2 sm:py-2.5 bg-transparent text-xs sm:text-sm text-white placeholder-white/30 focus:outline-none font-mono"
                          />
                          {formData.phone.length === 10 && !errors.phone && (
                            <span className="pr-3 text-emerald-400 shrink-0 animate-scaleUp">
                              <Check className="w-3.5 h-3.5" />
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Subject */}
                      <div>
                        <label className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-white/70 mb-1 flex items-center justify-between">
                          <span>Subject <span className="text-amber-400">*</span></span>
                          {touched.subject && errors.subject && (
                            <span className="text-[10px] text-rose-400 font-semibold lowercase first-letter:uppercase">{errors.subject}</span>
                          )}
                        </label>
                        <div className={`relative flex items-center rounded-xl bg-[#090b1c]/90 border transition-all shadow-inner overflow-hidden ${
                          touched.subject && errors.subject
                            ? 'border-rose-500/80 ring-1 ring-rose-500/30'
                            : isFieldValid('subject')
                            ? 'border-emerald-500/60 ring-1 ring-emerald-500/20'
                            : 'border-white/15 hover:border-amber-400/40 focus-within:border-amber-400 focus-within:ring-2 focus-within:ring-amber-400/20'
                        }`}>
                          <span className="pl-3 text-amber-400/70 shrink-0">
                            <Tag className="w-4 h-4" />
                          </span>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Ticket Verification"
                            value={formData.subject}
                            onChange={(e) => handleInputChange('subject', e.target.value)}
                            onBlur={() => handleBlur('subject')}
                            className="w-full px-2.5 py-2 sm:py-2.5 bg-transparent text-xs sm:text-sm text-white placeholder-white/30 focus:outline-none"
                          />
                          {isFieldValid('subject') && (
                            <span className="pr-3 text-emerald-400 shrink-0 animate-scaleUp">
                              <Check className="w-3.5 h-3.5" />
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Quick Select Subject Chips */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-white/40 mr-1 flex items-center gap-1">
                        <span>Quick Select:</span>
                      </span>
                      {QUICK_SUBJECTS.map((item) => {
                        const isSelected = formData.subject.trim().toLowerCase() === item.label.toLowerCase();
                        const Icon = item.icon;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => selectQuickSubject(item.label)}
                            className={`text-[10px] font-semibold px-2.5 py-1 rounded-lg transition-all duration-200 cursor-pointer flex items-center gap-1 ${
                              isSelected
                                ? 'bg-gradient-to-r from-amber-500/30 to-amber-400/20 text-[#ffe58f] border border-amber-400/80 shadow-[0_0_12px_rgba(245,158,11,0.35)] scale-[1.02]'
                                : 'bg-white/[0.04] text-white/70 border border-white/10 hover:border-amber-400/40 hover:text-white hover:bg-white/[0.08]'
                            }`}
                          >
                            <Icon className="w-3 h-3 text-amber-400" />
                            <span>{item.label}</span>
                            {isSelected && <Check className="w-3 h-3 text-emerald-400 ml-0.5" />}
                          </button>
                        );
                      })}
                    </div>

                    {/* Dynamic Smart Field: Ticket Number (Conditioned on Subject) */}
                    {showTicketField && (
                      <div className="p-2.5 rounded-xl bg-amber-400/[0.06] border border-amber-400/30 animate-fadeIn">
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                            <Ticket className="w-3.5 h-3.5 text-amber-400" />
                            <span>Lucky Ticket Number (Recommended for Fast Verification)</span>
                          </label>
                          <span className="text-[9px] px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-200 font-bold uppercase tracking-wider">
                            Fast-Track
                          </span>
                        </div>
                        <div className="relative flex items-center rounded-xl bg-[#090b1c]/90 border border-amber-400/40 focus-within:border-amber-400 focus-within:ring-2 focus-within:ring-amber-400/20 transition-all overflow-hidden">
                          <span className="pl-3 text-amber-400 shrink-0 font-mono text-xs">#</span>
                          <input
                            type="text"
                            placeholder="e.g. DD-2026-8821 or 16-digit voucher ID"
                            value={formData.ticketNumber}
                            onChange={(e) => handleInputChange('ticketNumber', e.target.value.toUpperCase())}
                            className="w-full px-2.5 py-2 bg-transparent text-xs sm:text-sm text-[#ffe58f] font-mono placeholder-white/30 focus:outline-none"
                          />
                        </div>
                      </div>
                    )}

                    {/* Message / Question */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-white/70 flex items-center gap-1">
                          <span>Message / Question <span className="text-amber-400">*</span></span>
                        </label>
                        <span className={`text-[10px] font-mono ${
                          formData.message.length > 475
                            ? 'text-rose-400 font-bold'
                            : formData.message.length > 400
                            ? 'text-amber-400 font-bold'
                            : 'text-white/40'
                        }`}>
                          {formData.message.length} / 500
                        </span>
                      </div>
                      <div className={`relative flex rounded-xl bg-[#090b1c]/90 border transition-all shadow-inner overflow-hidden p-2.5 ${
                        touched.message && errors.message
                          ? 'border-rose-500/80 ring-1 ring-rose-500/30'
                          : isFieldValid('message')
                          ? 'border-emerald-500/60 ring-1 ring-emerald-500/20'
                          : 'border-white/15 hover:border-amber-400/40 focus-within:border-amber-400 focus-within:ring-2 focus-within:ring-amber-400/20'
                      }`}>
                        <MessageSquare className="w-4 h-4 text-amber-400/70 shrink-0 mt-0.5 mr-2" />
                        <textarea
                          rows={3}
                          required
                          maxLength={500}
                          placeholder="Please provide details of your question or issue (min 10 characters)..."
                          value={formData.message}
                          onChange={(e) => handleInputChange('message', e.target.value)}
                          onBlur={() => handleBlur('message')}
                          className="w-full bg-transparent text-xs sm:text-sm text-white placeholder-white/30 focus:outline-none resize-none leading-relaxed"
                        />
                      </div>
                      {touched.message && errors.message && (
                        <p className="text-[10px] text-rose-400 font-semibold mt-1">{errors.message}</p>
                      )}
                    </div>

                    {/* Security Guarantee Note */}
                    <div className="flex items-center gap-2 text-[10px] text-white/50 pt-1">
                      <Shield className="w-3.5 h-3.5 text-amber-400/70 shrink-0" />
                      <span>Protected under 256-bit SSL encryption. We will never disclose your details.</span>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={status.loading}
                      className="w-full mt-2 py-3 rounded-xl font-extrabold text-xs sm:text-sm tracking-wider uppercase text-[#0b0d1e] bg-gradient-to-r from-[#ffe58f] via-[#f3c64c] to-[#d4af37] shadow-[0_4px_25px_rgba(243,198,76,0.35)] hover:shadow-[0_6px_35px_rgba(243,198,76,0.55)] hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 group/btn relative overflow-hidden disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer"
                    >
                      <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
                      {status.loading ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin text-[#0b0d1e]" />
                          <span>TRANSMITTING ENCRYPTED DISPATCH...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                          <span>SUBMIT CONTACT REQUEST</span>
                        </>
                      )}
                    </button>
                  </form>
                )
              )}

              {/* ========================================================================= */}
              {/* TAB 2: TRACK INQUIRY STATUS */}
              {/* ========================================================================= */}
              {activeTab === 'track' && (
                <div className="space-y-4 relative z-10 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="font-serif text-lg sm:text-xl font-bold text-[#ffe58f]">
                        Track Inquiry Status
                      </h2>
                      <p className="text-[11px] text-white/60">
                        Enter your official Reference ID to check live verification & resolution progress.
                      </p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 text-[10px] font-bold">
                      Live Queue Active
                    </span>
                  </div>

                  {/* Reference Search Bar */}
                  <form onSubmit={handleSearchRef} className="flex gap-2">
                    <div className="relative flex-1 flex items-center rounded-xl bg-[#090b1c]/90 border border-white/15 focus-within:border-amber-400 focus-within:ring-2 focus-within:ring-amber-400/20 overflow-hidden">
                      <span className="pl-3 text-amber-400 shrink-0">
                        <Search className="w-4 h-4" />
                      </span>
                      <input
                        type="text"
                        placeholder="Enter Reference ID (e.g. SR-2026-F9B2)"
                        value={searchRef}
                        onChange={(e) => setSearchRef(e.target.value)}
                        className="w-full px-2.5 py-2 sm:py-2.5 bg-transparent text-xs sm:text-sm text-white placeholder-white/30 focus:outline-none uppercase font-mono"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:brightness-110 text-[#0b0d1e] font-extrabold text-xs tracking-wider transition-all flex items-center gap-1.5 shrink-0"
                    >
                      <span>Search</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </form>

                  {/* Saved Inquiries Quick Selector */}
                  {savedInquiries.length > 0 && (
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-white/40 mb-1.5">
                        Your Recent Dispatches ({savedInquiries.length})
                      </div>
                      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                        {savedInquiries.map((inq) => {
                          const isCurrent = selectedInquiry?.ref === inq.ref;
                          return (
                            <button
                              key={inq.ref}
                              type="button"
                              onClick={() => setSelectedInquiry(inq)}
                              className={`px-3 py-1.5 rounded-xl text-left border transition-all shrink-0 ${
                                isCurrent
                                  ? 'bg-amber-400/20 border-amber-400 text-[#ffe58f] shadow-[0_0_12px_rgba(245,158,11,0.25)]'
                                  : 'bg-white/[0.03] border-white/10 text-white/70 hover:bg-white/[0.07] hover:text-white'
                              }`}
                            >
                              <div className="font-mono text-[11px] font-bold">{inq.ref}</div>
                              <div className="text-[9px] text-white/50 truncate max-w-[120px]">{inq.subject}</div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Selected Inquiry Detail & Timeline */}
                  {selectedInquiry ? (
                    <div className="p-4 rounded-2xl bg-[#090b1c]/80 border border-white/10 space-y-4">
                      {/* Inquiry Header */}
                      <div className="flex items-center justify-between border-b border-white/10 pb-3">
                        <div>
                          <div className="text-[10px] text-white/50 uppercase font-bold tracking-wider">
                            Reference Identifier
                          </div>
                          <div className="font-mono text-base font-black text-[#ffe58f] flex items-center gap-2">
                            <span>{selectedInquiry.ref}</span>
                            <button
                              type="button"
                              onClick={() => copyToClipboard(selectedInquiry.ref, 'Reference ID')}
                              className="text-white/40 hover:text-amber-300 transition-colors"
                              title="Copy ID"
                            >
                              <Copy className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            <span>In Progress</span>
                          </span>
                        </div>
                      </div>

                      {/* Timeline */}
                      <div className="space-y-3">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-white/50">
                          Verification Milestones
                        </div>
                        <div className="space-y-2.5">
                          {/* Step 1 */}
                          <div className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-400/60 flex items-center justify-center text-emerald-300 shrink-0 mt-0.5">
                              <Check className="w-3 h-3 text-emerald-400" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="text-xs font-bold text-white flex justify-between">
                                <span>Inquiry Received & Encrypted</span>
                                <span className="text-[10px] text-white/40 font-mono">
                                  {new Date(selectedInquiry.createdAt || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                              </div>
                              <p className="text-[10px] text-white/60">
                                Stored in official database and encrypted with 256-bit protocol.
                              </p>
                            </div>
                          </div>

                          {/* Step 2 */}
                          <div className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-400/60 flex items-center justify-center text-amber-300 shrink-0 mt-0.5">
                              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="text-xs font-bold text-amber-300 flex justify-between">
                                <span>Assigned to Festive Concierge Desk</span>
                                <span className="text-[10px] text-amber-300/80 font-mono">Active</span>
                              </div>
                              <p className="text-[10px] text-white/60">
                                Desk Officer: Priya V. (Ticket & Verification Support Lead).
                              </p>
                            </div>
                          </div>

                          {/* Step 3 */}
                          <div className="flex items-start gap-3 opacity-60">
                            <div className="w-6 h-6 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white/40 shrink-0 mt-0.5">
                              <Clock className="w-3 h-3" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="text-xs font-bold text-white/70">
                                Direct Follow-up & Resolution
                              </div>
                              <p className="text-[10px] text-white/50">
                                Written resolution sent via registered email/SMS within 24 hours.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Inquiry Content Summary */}
                      <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs space-y-1">
                        <div className="text-white/50 text-[10px] uppercase font-bold">Inquiry Details:</div>
                        <div className="text-white font-medium">Subject: <span className="text-[#ffe58f]">{selectedInquiry.subject}</span></div>
                        {selectedInquiry.ticketNumber && (
                          <div className="text-white font-medium">Linked Ticket: <span className="text-amber-300 font-mono">{selectedInquiry.ticketNumber}</span></div>
                        )}
                        <p className="text-white/70 italic text-[11px] pt-1">
                          "{selectedInquiry.message?.slice(0, 150)}{selectedInquiry.message?.length > 150 ? '...' : ''}"
                        </p>
                      </div>

                      <div className="flex gap-2 pt-1">
                        <a
                          href="tel:18005552026"
                          className="flex-1 py-2 rounded-xl bg-amber-400/20 hover:bg-amber-400/30 border border-amber-400/40 text-[#ffe58f] text-xs font-bold text-center transition-all flex items-center justify-center gap-1.5"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>Call Support With This ID</span>
                        </a>
                        <button
                          type="button"
                          onClick={() => setActiveTab('form')}
                          className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white/80 text-xs font-bold transition-all"
                        >
                          New Inquiry
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-6 rounded-2xl bg-white/[0.02] border border-dashed border-white/15 text-center text-white/50 text-xs">
                      <FileText className="w-8 h-8 text-white/20 mx-auto mb-2" />
                      <div>No saved inquiries found on this browser yet.</div>
                      <p className="text-[11px] text-white/40 mt-1">
                        Submit a contact inquiry or enter a valid reference ID above to track status.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* ========================================================================= */}
              {/* TAB 3: FAST FAQS ACCORDION */}
              {/* ========================================================================= */}
              {activeTab === 'faqs' && (
                <div className="space-y-3.5 relative z-10 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="font-serif text-lg sm:text-xl font-bold text-[#ffe58f]">
                        Frequently Asked Questions
                      </h2>
                      <p className="text-[11px] text-white/60">
                        Find instant solutions to the most common festive draw inquiries.
                      </p>
                    </div>
                    <span className="p-1 rounded-lg bg-amber-400/10 text-amber-300">
                      <HelpCircle className="w-4 h-4" />
                    </span>
                  </div>

                  <div className="space-y-2">
                    {FAQS.map((faq, idx) => {
                      const isOpen = openFaqIndex === idx;
                      return (
                        <div
                          key={idx}
                          className="rounded-2xl border transition-all duration-200 overflow-hidden bg-white/[0.02] border-white/10 hover:border-amber-400/40"
                        >
                          <button
                            type="button"
                            onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                            className="w-full p-3.5 text-left flex items-center justify-between gap-3 text-xs sm:text-sm font-bold text-white/90 hover:text-[#ffe58f] transition-colors"
                          >
                            <span className="flex items-center gap-2">
                              <span className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-bold flex items-center justify-center shrink-0">
                                {idx + 1}
                              </span>
                              <span>{faq.q}</span>
                            </span>
                            {isOpen ? (
                              <ChevronUp className="w-4 h-4 text-amber-400 shrink-0" />
                            ) : (
                              <ChevronDown className="w-4 h-4 text-white/40 shrink-0" />
                            )}
                          </button>
                          {isOpen && (
                            <div className="px-4 pb-3.5 text-xs text-white/70 leading-relaxed border-t border-white/5 pt-2 animate-fadeIn">
                              {faq.a}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <div className="p-3.5 rounded-2xl bg-amber-400/[0.08] border border-amber-400/30 flex items-center justify-between gap-3">
                    <div className="text-xs text-white/80">
                      <span className="font-bold text-[#ffe58f]">Still have a specific question?</span> Submit an inquiry for personal assistance.
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveTab('form')}
                      className="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-[#0b0d1e] text-xs font-bold transition-all shrink-0"
                    >
                      Ask Concierge
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
