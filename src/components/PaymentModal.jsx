import React, { useState } from 'react'
import { X, CreditCard, Lock, CheckCircle, Loader2 } from 'lucide-react'

const PaymentModal = ({ plan, amount, onClose, onComplete }) => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handlePaymentSubmit = (e) => {
        if (e) e.preventDefault();
        setLoading(true);

        // ⚠️ THIS IS A SIMULATION
        // In a real application, you would make an API call to your backend here.
        // The money would be sent to your connected Merchant Account (e.g., Stripe, Razorpay).
        console.log(`Processing payment of ₹${amount} for ${plan} plan...`);
        
        // Simulate payment processing delay
        setTimeout(() => {
            setLoading(false);
            setSuccess(true);
            setTimeout(() => {
                onComplete();
            }, 1500);
        }, 2000);
    }

    if (success) {
        return (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100000] flex items-center justify-center p-4 animate-fade-in">
                <div className="bg-slate-900 border border-green-500/30 p-8 rounded-2xl flex flex-col items-center max-w-sm w-full shadow-2xl shadow-green-500/10">
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center text-green-500 mb-4">
                        <CheckCircle size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Payment Successful!</h3>
                    <p className="text-slate-400 text-center">You now have access to the {plan} plan.</p>
                </div>
            </div>
        )
    }

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100000] flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-slate-900 border border-white/10 p-6 md:p-8 rounded-2xl w-full max-w-md relative shadow-2xl">
                <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors">
                    <X size={20} />
                </button>
                
                <div className="mb-6">
                    <h3 className="text-2xl font-bold text-white mb-1">Secure Payment</h3>
                    <p className="text-slate-400 text-sm flex items-center gap-2">
                        <Lock size={12} /> 256-bit SSL Encrypted
                    </p>
                </div>

                <div className="bg-slate-800/50 rounded-xl p-4 mb-8 flex justify-between items-center border border-white/5">
                    <div>
                        <p className="text-slate-400 text-xs uppercase tracking-wider">Plan</p>
                        <p className="text-white font-semibold">{plan}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-slate-400 text-xs uppercase tracking-wider">Total</p>
                        <p className="text-2xl font-bold text-white">₹{amount}</p>
                    </div>
                </div>

                <form onSubmit={handlePaymentSubmit} className="space-y-4">
                    <div>
                        <label className="block text-slate-400 text-xs uppercase tracking-wider mb-2">Card Number</label>
                        <div className="relative">
                            <input required type="text" placeholder="0000 0000 0000 0000" className="w-full bg-slate-950 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-purple-500 transition-colors" />
                            <CreditCard className="absolute left-3 top-3.5 text-slate-500" size={18} />
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-slate-400 text-xs uppercase tracking-wider mb-2">Expiry</label>
                            <input required type="text" placeholder="MM/YY" className="w-full bg-slate-950 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-purple-500 transition-colors" />
                        </div>
                        <div>
                            <label className="block text-slate-400 text-xs uppercase tracking-wider mb-2">CVC</label>
                            <input required type="text" placeholder="123" className="w-full bg-slate-950 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-purple-500 transition-colors" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-slate-400 text-xs uppercase tracking-wider mb-2">Cardholder Name</label>
                        <input required type="text" placeholder="John Doe" className="w-full bg-slate-950 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-purple-500 transition-colors" />
                    </div>

                    <button disabled={loading} type="submit" className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 rounded-xl hover:from-purple-500 hover:to-indigo-500 transition-all shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
                        {loading ? <Loader2 className="animate-spin" size={20} /> : 'Pay with Card'}
                    </button>
                </form>

                {/* Divider */}
                <div className="flex items-center my-6">
                    <div className="flex-grow border-t border-white/10"></div>
                    <span className="flex-shrink mx-4 text-slate-500 text-xs uppercase">Or</span>
                    <div className="flex-grow border-t border-white/10"></div>
                </div>

                {/* UPI Options */}
                <div className="space-y-4">
                    <p className="text-slate-400 text-xs uppercase tracking-wider text-center">Pay with UPI</p>
                    <div className="grid grid-cols-3 gap-3">
                        <button onClick={() => handlePaymentSubmit()} disabled={loading} className="py-2 px-3 bg-slate-800/50 border border-white/10 rounded-lg text-white font-semibold text-sm hover:bg-slate-800 transition-colors disabled:opacity-50">GPay</button>
                        <button onClick={() => handlePaymentSubmit()} disabled={loading} className="py-2 px-3 bg-slate-800/50 border border-white/10 rounded-lg text-white font-semibold text-sm hover:bg-slate-800 transition-colors disabled:opacity-50">PhonePe</button>
                        <button onClick={() => handlePaymentSubmit()} disabled={loading} className="py-2 px-3 bg-slate-800/50 border border-white/10 rounded-lg text-white font-semibold text-sm hover:bg-slate-800 transition-colors disabled:opacity-50">Paytm</button>
                    </div>
                    <form onSubmit={handlePaymentSubmit}>
                        <div className="flex gap-2">
                            <input 
                                required 
                                type="text" 
                                placeholder="your-upi-id@okhdfcbank" 
                                className="flex-1 w-full bg-slate-950 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-purple-500 transition-colors text-sm" 
                            />
                            <button disabled={loading} type="submit" className="px-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-xl hover:from-purple-500 hover:to-indigo-500 transition-all shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed text-sm">
                                {loading ? <Loader2 className="animate-spin" size={18} /> : 'Pay'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default PaymentModal