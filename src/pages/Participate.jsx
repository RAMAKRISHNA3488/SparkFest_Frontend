import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Flame, ShieldCheck, Sparkles, CheckCircle2, AlertCircle, ArrowRight, ArrowLeft, Phone, Mail, User, CreditCard, Lock, RefreshCw, Ticket } from 'lucide-react';
import { api } from '../services/api';

export default function Participate() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const preselectedOffer = searchParams.get('offer') || 'ten_entry';

  // Wizard state: 1 = Details -> 2 = Payment
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: 'Mumbai',
    selectedOffer: preselectedOffer,
    termsAccepted: true
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [orderInfo, setOrderInfo] = useState(null);
  const [paymentConfig, setPaymentConfig] = useState(null);

  useEffect(() => {
    async function fetchConfig() {
      try {
        const res = await api.getPaymentConfig();
        if (res.success) {
          setPaymentConfig(res.data);
        }
      } catch (e) {}
    }
    fetchConfig();
  }, []);

  const getTierDetails = () => {
    switch (formData.selectedOffer) {
      case 'festival_special': return { amount: 30, tickets: 3, name: 'Festival Special', plan: '30rs Plan' };
      case 'early_bird': return { amount: 50, tickets: 5, name: 'Early Bird', plan: '50rs Plan' };
      case 'ten_entry':
      default: return { amount: 10, tickets: 1, name: 'Ticket Entry', plan: '10rs Plan' };
    }
  };
  
  const tierInfo = getTierDetails();

  // Helper to load Razorpay checkout script if not already present
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Step 1 -> Step 2: Proceed to Payment & Create Order
  const handleProceedToPayment = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await api.createPaymentOrder(formData);
      if (res.success || res.order_id || res.id) {
        setOrderInfo(res.data || res);
        setStep(2);
      } else {
        setError(res.message || 'Unable to initiate payment order.');
      }
    } catch (err) {
      setError(err.message || 'Failed to initialize payment.');
    } finally {
      setLoading(false);
    }
  };

  // Execute Razorpay Payment & Verify
  const handlePayWithRazorpay = async () => {
    setError(null);
    setLoading(true);

    try {
      // 1. Ensure order exists
      let currentOrder = orderInfo;
      if (!currentOrder) {
        const orderRes = await api.createPaymentOrder(formData);
        if (!orderRes.success && !orderRes.order_id) {
          throw new Error(orderRes.message || 'Could not create payment order');
        }
        currentOrder = orderRes.data || orderRes;
        setOrderInfo(currentOrder);
      }

      // 2. Ensure Razorpay script is loaded
      const isLoaded = await loadRazorpayScript();
      if (!isLoaded && !currentOrder.isMockMode) {
        throw new Error('Razorpay SDK failed to load. Please check your internet connection.');
      }

      // 3. If running in simulated mock mode without active Razorpay keys
      if (currentOrder.isMockMode && (!window.Razorpay || currentOrder.keyId === 'rzp_test_placeholder')) {
        // Run test verification flow directly
        await simulateTestPayment(currentOrder);
        return;
      }

      // 4. Open Razorpay Checkout Modal
      const razorpayKey = currentOrder.keyId || currentOrder.key_id || import.meta.env.VITE_RAZORPAY_KEY_ID;
      const orderId = currentOrder.order_id || currentOrder.orderId || currentOrder.id;

      const options = {
        key: razorpayKey,
        amount: currentOrder.amount,
        currency: currentOrder.currency || 'INR',
        name: 'Diwali Dhamaka Lucky Draw',
        description: `${tierInfo.name} - ${tierInfo.tickets} Lucky Draw Tickets`,
        order_id: orderId,
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.phone
        },
        theme: {
          color: '#e5b32f'
        },
        handler: async function (response) {
          // Cryptographic verification on backend
          try {
            setStep(3);
            setLoading(true);
            const verifyRes = await api.verifyPayment({
              ...formData,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            });

            if (verifyRes.success && verifyRes.data && verifyRes.data.ticket) {
              setTimeout(() => {
                navigate('/confirmation', {
                  state: {
                    ticket: verifyRes.data.ticket,
                    tickets: verifyRes.data.tickets,
                    participant: verifyRes.data.participant,
                    payment: verifyRes.data.payment,
                    whatsapp: verifyRes.data.whatsapp
                  }
                });
              }, 1200);
            } else if (verifyRes.success) {
              setTimeout(() => {
                navigate('/confirmation', {
                  state: {
                    ticket: verifyRes.data?.ticket,
                    tickets: verifyRes.data?.tickets,
                    participant: verifyRes.data?.participant || formData,
                    payment: verifyRes.data?.payment || {
                      paymentId: response.razorpay_payment_id,
                      orderId: response.razorpay_order_id,
                      status: 'SUCCESS'
                    }
                  }
                });
              }, 1200);
            } else {
              setStep(2);
              setError(verifyRes.message || 'Payment verification failed. No tickets generated.');
            }
          } catch (verifyErr) {
            setStep(2);
            setError(verifyErr.message || 'Payment verification failed. No tickets generated.');
          } finally {
            setLoading(false);
          }
        },
        modal: {
          ondismiss: function () {
            setError('Payment was cancelled by user. Lucky tickets were not generated.');
            setLoading(false);
          }
        }
      };

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.on('payment.failed', function (resp) {
        setError(`Payment failed: ${resp.error?.description || 'Transaction declined'}. Tickets were not generated.`);
        setLoading(false);
      });

      razorpayInstance.open();
    } catch (err) {
      setError(err.message || 'Payment failed to initiate.');
      setLoading(false);
    }
  };

  // Safe developer sandbox simulation for local environments without live Razorpay keys
  const simulateTestPayment = async (order) => {
    try {
      setStep(3);
      setLoading(true);
      const testPaymentId = `pay_mock_${Date.now()}`;
      const testSignature = `sig_valid_${Date.now()}_razorpay`;

      const verifyRes = await api.verifyPayment({
        ...formData,
        razorpay_order_id: order.orderId,
        razorpay_payment_id: testPaymentId,
        razorpay_signature: testSignature
      });

      if (verifyRes.success && verifyRes.data && verifyRes.data.ticket) {
        setTimeout(() => {
          navigate('/confirmation', {
            state: {
              ticket: verifyRes.data.ticket,
              tickets: verifyRes.data.tickets,
              participant: verifyRes.data.participant,
              payment: verifyRes.data.payment,
              whatsapp: verifyRes.data.whatsapp
            }
          });
        }, 1200);
      } else {
        setStep(2);
        setError(verifyRes.message || 'Payment verification failed. No tickets generated.');
      }
    } catch (err) {
      setStep(2);
      setError(err.message || 'Payment verification failed.');
    } finally {
      setLoading(false);
    }
  };

  const isStep1Valid = Boolean(
    formData.fullName.trim() &&
    formData.email.trim() &&
    formData.phone.trim().length === 10 &&
    formData.city.trim() &&
    formData.termsAccepted
  );

  return (
    <div className="pt-28 pb-20 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Back Button */}
      {step < 3 && (
        <button 
          onClick={() => {
            if (step > 1) {
              setStep(step - 1);
              setError(null);
            } else {
              navigate(-1);
            }
          }}
          className="mb-6 flex items-center gap-2 text-white/60 hover:text-[#ffe58f] transition-colors text-sm font-semibold group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back</span>
        </button>
      )}

      {/* Progress Bar */}
      <div className="mb-10">
        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider mb-2">
          <span className={step >= 1 ? 'text-[#ffe58f]' : 'text-white/40'}>1. Details</span>
          <span className={step >= 2 ? 'text-[#ffe58f]' : 'text-white/40'}>2. Payment</span>
          <span className={step >= 3 ? 'text-[#ffe58f]' : 'text-white/40'}>3. Generate Token</span>
        </div>
        <div className="w-full h-2 bg-[#141634] rounded-full overflow-hidden border border-white/5">
          <div
            className="h-full bg-gradient-to-r from-[#ffe58f] via-[#e5b32f] to-[#d4af37] transition-all duration-300"
            style={{ width: step === 1 ? '33.33%' : step === 2 ? '66.66%' : '100%' }}
          ></div>
        </div>
      </div>

      <div className="p-8 sm:p-10 rounded-3xl bg-[#141634]/60 backdrop-blur-2xl border border-[#e5b32f]/40 shadow-[0_0_40px_rgba(229,179,47,0.15)] relative overflow-hidden">
        {/* Festive Background Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#28114b]/40 rounded-full blur-3xl pointer-events-none"></div>

        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-950/60 border border-rose-500/40 text-rose-200 text-xs sm:text-sm flex items-start gap-3 animate-fadeIn">
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div className="flex-1 font-medium">{error}</div>
          </div>
        )}

        {/* STEP 1: Details */}
        {step === 1 && (
          <form onSubmit={handleProceedToPayment} className="space-y-6">
            <div className="flex flex-col items-center justify-center mb-8 sm:mb-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#201542] border border-[#e5b32f]/30 text-[#ffe58f] text-[10px] sm:text-xs font-semibold mb-5 sm:mb-6">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span>Quick 2-Minute Entry</span>
              </div>
              
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[#e5b32f]/20 to-transparent border border-[#e5b32f]/40 flex items-center justify-center mb-3 sm:mb-4 shadow-[0_0_15px_rgba(229,179,47,0.2)] transition-transform hover:scale-105 duration-300">
                <User className="w-6 h-6 sm:w-7 sm:h-7 text-[#ffe58f]" />
              </div>
              
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold gold-gradient-text italic tracking-wide text-center">
                Participant Details
              </h2>
              
              <div className="flex items-center gap-3 sm:gap-4 mt-4 sm:mt-5">
                <div className="w-12 sm:w-20 h-[1px] bg-gradient-to-r from-transparent to-[#e5b32f]/60"></div>
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rotate-45 bg-gradient-to-br from-[#ffe58f] to-[#d4af37] shadow-[0_0_10px_rgba(229,179,47,0.8)]"></div>
                <div className="w-12 sm:w-20 h-[1px] bg-gradient-to-l from-transparent to-[#e5b32f]/60"></div>
              </div>
              
              <p className="text-xs sm:text-sm text-white/70 mt-5 sm:mt-6 text-center max-w-md leading-relaxed">
                Join thousands of verified participants for a chance to win up to Premium Gold Coin gifts.
              </p>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-white/70 mb-2">
                  Full Name (As per Bank / ID) *
                </label>
                <div className="relative group">
                  <User className="w-4 h-4 sm:w-5 sm:h-5 text-white/40 absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 group-focus-within:text-[#e5b32f] transition-colors" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kiran Kumar"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full pl-10 sm:pl-12 pr-4 py-3.5 sm:py-4 rounded-xl bg-gradient-to-b from-[#141634]/50 to-[#090b1c]/80 backdrop-blur-md border border-[#e5b32f]/20 text-xs sm:text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#e5b32f]/80 focus:ring-1 focus:ring-[#e5b32f]/50 transition-all shadow-inner"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-white/70 mb-2">
                    Email Address *
                  </label>
                  <div className="relative group">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-white/40 absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 group-focus-within:text-[#e5b32f] transition-colors" />
                    <input
                      type="email"
                      required
                      placeholder="e.g. kiran@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-10 sm:pl-12 pr-4 py-3.5 sm:py-4 rounded-xl bg-gradient-to-b from-[#141634]/50 to-[#090b1c]/80 backdrop-blur-md border border-[#e5b32f]/20 text-xs sm:text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#e5b32f]/80 focus:ring-1 focus:ring-[#e5b32f]/50 transition-all shadow-inner"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-white/70 mb-2">
                    Mobile Number *
                  </label>
                  <div className="relative group">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-white/40 absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 group-focus-within:text-[#e5b32f] transition-colors" />
                    <input
                      type="tel"
                      required
                      placeholder="10-digit mobile number"
                      maxLength={10}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-10 sm:pl-12 pr-4 py-3.5 sm:py-4 rounded-xl bg-gradient-to-b from-[#141634]/50 to-[#090b1c]/80 backdrop-blur-md border border-[#e5b32f]/20 text-xs sm:text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#e5b32f]/80 focus:ring-1 focus:ring-[#e5b32f]/50 transition-all shadow-inner"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-white/70 mb-2">
                  City / State
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mumbai, Maharashtra"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-4 sm:px-5 py-3.5 sm:py-4 rounded-xl bg-gradient-to-b from-[#141634]/50 to-[#090b1c]/80 backdrop-blur-md border border-[#e5b32f]/20 text-xs sm:text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#e5b32f]/80 focus:ring-1 focus:ring-[#e5b32f]/50 transition-all shadow-inner"
                />
              </div>

              {/* Offer Selector */}
              <div className="pt-2">
                <label className="block text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-white/70 mb-3">
                  Select Entry Tier
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
                  {[
                    { id: 'ten_entry', title: 'Ticket Entry', desc: 'Standard Single Ticket', price: '₹10' },
                    { id: 'festival_special', title: 'Festival Special', desc: 'Bonus Entry Ticket', price: '₹30' },
                    { id: 'early_bird', title: 'Early Bird', desc: 'Priority Reward Tier', price: '₹50' }
                  ].map((tier) => {
                    const isActive = formData.selectedOffer === tier.id;
                    return (
                      <button
                        type="button"
                        key={tier.id}
                        onClick={() => setFormData({ ...formData, selectedOffer: tier.id })}
                        className={`relative p-3 sm:p-4 rounded-2xl border text-left transition-all duration-500 overflow-hidden group ${
                          isActive
                            ? 'border-[#e5b32f]/80 shadow-[0_0_20px_rgba(229,179,47,0.3)] scale-[1.02] -translate-y-1'
                            : 'border-[#e5b32f]/20 hover:border-[#e5b32f]/50 hover:-translate-y-1 hover:shadow-lg'
                        }`}
                      >
                        <div className={`absolute inset-0 transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'} bg-gradient-to-br from-[#1a1435]/90 via-[#130f26]/90 to-[#0a0710]/90 backdrop-blur-xl`}></div>
                        
                        {isActive && (
                          <div className="absolute inset-0 bg-gradient-to-br from-[#ffe58f]/10 to-transparent pointer-events-none"></div>
                        )}
                        
                        <div className="relative z-10 flex flex-col h-full justify-between gap-2">
                          <div>
                            <div className={`font-serif text-sm sm:text-base font-extrabold tracking-wide ${isActive ? 'gold-gradient-text' : 'text-white/80 group-hover:text-white transition-colors'}`}>
                              {tier.title}
                            </div>
                            <div className="text-[10px] sm:text-xs text-white/50 leading-tight mt-0.5">
                              {tier.desc}
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between mt-1">
                            <span className={`font-mono font-bold text-sm sm:text-base ${isActive ? 'text-[#ffe58f]' : 'text-white/40 group-hover:text-[#e5b32f]/80'}`}>
                              {tier.price}
                            </span>
                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all duration-300 ${isActive ? 'border-[#e5b32f] bg-[#e5b32f]/20' : 'border-white/20'}`}>
                              {isActive && <div className="w-2 h-2 rounded-full bg-[#ffe58f] shadow-[0_0_5px_#ffe58f]"></div>}
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Consent checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={formData.termsAccepted}
                    onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.checked })}
                    className="w-4 h-4 mt-0.5 rounded border-white/20 text-[#e5b32f] focus:ring-[#e5b32f]"
                  />
                  <span className="text-xs text-white/70">
                    I confirm I am 18 years or older and agree to the{' '}
                    <span className="text-[#ffe58f] underline">Terms & Conditions</span> and Lucky Draw Rules.
                  </span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !isStep1Valid}
              className={`w-full py-4 rounded-full font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 ${
                loading || !isStep1Valid
                  ? 'bg-[#141634] text-white/40 cursor-not-allowed border border-white/10'
                  : 'text-[#0b0d1e] bg-gradient-to-r from-[#ffe58f] via-[#e5b32f] to-[#d4af37] shadow-gold-glow hover:scale-[1.02] active:scale-95'
              }`}
            >
              <span>{loading ? 'CREATING ORDER...' : 'PROCEED TO PAYMENT'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* STEP 2: Payment & Ticket Issuance */}
        {step === 2 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col items-center justify-center mb-6">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[#e5b32f]/20 to-transparent border border-[#e5b32f]/40 flex items-center justify-center mb-3 sm:mb-4 shadow-[0_0_15px_rgba(229,179,47,0.2)]">
                <CreditCard className="w-6 h-6 sm:w-7 sm:h-7 text-[#ffe58f]" />
              </div>
              
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold gold-gradient-text italic tracking-wide text-center">
                Payment
              </h2>
              
              <div className="flex items-center gap-3 sm:gap-4 mt-3 sm:mt-4">
                <div className="w-12 sm:w-20 h-[1px] bg-gradient-to-r from-transparent to-[#e5b32f]/60"></div>
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rotate-45 bg-gradient-to-br from-[#ffe58f] to-[#d4af37] shadow-[0_0_10px_rgba(229,179,47,0.8)]"></div>
                <div className="w-12 sm:w-20 h-[1px] bg-gradient-to-l from-transparent to-[#e5b32f]/60"></div>
              </div>
              
              <p className="text-xs sm:text-sm text-white/70 mt-4 max-w-md mx-auto text-center leading-relaxed">
                Complete your payment. Your official lucky ticket will <strong className="text-[#ffe58f]">only be generated after successful payment</strong>.
              </p>

              {/* Real-time Gateway Status */}
              <div className="mt-3">
                {paymentConfig?.isConfigured ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-[11px] font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>Live Payment Gateway Active</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-500/40 text-amber-300 text-[11px] font-semibold">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                    <span>Secure Gateway Ready • Instant Verified Sandbox</span>
                  </span>
                )}
              </div>
            </div>

            {/* Order Summary Card */}
            <div className="p-6 bg-[#090b1c]/90 border border-[#e5b32f]/30 rounded-2xl mx-auto max-w-md shadow-inner space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
                <span className="text-white/60">Participant</span>
                <span className="font-semibold text-white">{formData.fullName}</span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
                <span className="text-white/60">Mobile Number</span>
                <span className="font-mono text-white/90">{formData.phone}</span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
                <span className="text-white/60">Selected Tier</span>
                <span className="font-semibold text-[#ffe58f]">{tierInfo.name}</span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
                <span className="text-white/60">Tickets Allocated on Success</span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#e5b32f]/20 border border-[#e5b32f]/40 font-bold text-[#ffe58f]">
                  {tierInfo.tickets} {tierInfo.tickets > 1 ? 'Tickets' : 'Ticket'}
                </span>
              </div>

              {/* Total Payable */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-sm font-semibold text-white">Total Payable</span>
                <span className="text-[#e5b32f] font-bold text-3xl font-serif">₹{tierInfo.amount}</span>
              </div>

              {/* Payment Security Badges */}
              <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-white/50">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                <span>100% Secure Payment • UPI, Cards, NetBanking, Wallets</span>
              </div>
            </div>

            {/* Pay Now Button */}
            <div className="space-y-3">
              <button
                type="button"
                onClick={handlePayWithRazorpay}
                disabled={loading}
                className="w-full py-4 rounded-full font-bold text-xs sm:text-sm text-[#0b0d1e] bg-gradient-to-r from-[#ffe58f] via-[#e5b32f] to-[#d4af37] shadow-gold-glow hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>VERIFYING PAYMENT & GENERATING TICKET...</span>
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4" />
                    <span>PAY ₹{tierInfo.amount}</span>
                  </>
                )}
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    setError(null);
                  }}
                  className="text-[11px] text-white/50 hover:text-white underline"
                >
                  ← Edit Participant Details or Change Plan
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Generate Token */}
        {step === 3 && (
          <div className="py-12 sm:py-16 flex flex-col items-center justify-center text-center space-y-6 animate-fadeIn">
            <div className="relative">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-[#ffe58f]/20 via-[#e5b32f]/10 to-transparent border-2 border-[#e5b32f]/60 flex items-center justify-center shadow-[0_0_30px_rgba(229,179,47,0.3)]">
                <Ticket className="w-10 h-10 sm:w-12 sm:h-12 text-[#ffe58f] animate-pulse" />
              </div>
              <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-gradient-to-br from-[#ffe58f] to-[#e5b32f] flex items-center justify-center shadow-lg">
                <Sparkles className="w-4 h-4 text-[#0b0d1e] animate-spin" />
              </div>
            </div>

            <div className="space-y-2 max-w-md mx-auto">
              <h2 className="font-serif text-2xl sm:text-3xl font-extrabold gold-gradient-text tracking-wide">
                Generating Your Token...
              </h2>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                Payment verified successfully! Securely issuing and registering your official lucky draw token ID.
              </p>
            </div>

            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#090b1c]/90 border border-[#e5b32f]/40 text-[#ffe58f] text-xs font-mono shadow-inner">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#e5b32f]" />
              <span>Allocating unique lucky draw tokens...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
