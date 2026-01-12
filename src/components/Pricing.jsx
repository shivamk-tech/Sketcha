import React from 'react'
import { Check } from 'lucide-react'

const Pricing = ({ openLog, handlePayment }) => {
  return (
     <div id="pricing" className="w-full max-w-7xl mx-auto px-10 py-24">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Simple Pricing</h2>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        Choose the plan that fits your needs. <span onClick={openLog} className="text-purple-400 font-medium cursor-pointer hover:underline">Free access for 2 days.</span>
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                    {/* Weekly Plan */}
                    <div className="p-8 rounded-2xl bg-slate-900/50 border border-white/10 flex flex-col hover:border-purple-500/50 transition-all relative group">
                        <h3 className="text-xl font-semibold text-white mb-2">Weekly</h3>
                        <div className="flex items-baseline gap-1 mb-4">
                            <span className="text-4xl font-bold text-white">₹50</span>
                            <span className="text-slate-400">/week</span>
                        </div>
                        <p className="text-slate-400 mb-6 text-sm">Perfect for short sprints.</p>
                        <ul className="space-y-3 mb-8 flex-1">
                            <li className="flex items-center gap-3 text-slate-300 text-sm"><Check size={16} className="text-purple-400" /> All Pro features</li>
                            <li className="flex items-center gap-3 text-slate-300 text-sm"><Check size={16} className="text-purple-400" /> Unlimited boards</li>
                        </ul>
                        <button onClick={() => handlePayment('Weekly', 50)} className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold transition-all">Get Started</button>
                    </div>

                    {/* Monthly Plan */}
                    <div className="p-8 rounded-2xl bg-slate-900/80 border border-purple-500 flex flex-col relative transform md:-translate-y-4 shadow-2xl shadow-purple-500/20">
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-4 py-1 rounded-full text-sm font-medium whitespace-nowrap">Most Popular</div>
                        <h3 className="text-xl font-semibold text-white mb-2">Monthly</h3>
                        <div className="flex items-baseline gap-1 mb-4">
                            <span className="text-4xl font-bold text-white">₹100</span>
                            <span className="text-slate-400">/month</span>
                        </div>
                        <p className="text-slate-400 mb-6 text-sm">Ideal for ongoing projects.</p>
                        <ul className="space-y-3 mb-8 flex-1">
                            <li className="flex items-center gap-3 text-slate-300 text-sm"><Check size={16} className="text-purple-400" /> Everything in Weekly</li>
                            <li className="flex items-center gap-3 text-slate-300 text-sm"><Check size={16} className="text-purple-400" /> Team collaboration</li>
                        </ul>
                        <button onClick={() => handlePayment('Monthly', 100)} className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold hover:from-purple-400 hover:to-indigo-400 shadow-lg shadow-purple-500/25 transition-all">Get Started</button>
                    </div>

                    {/* Yearly Plan */}
                    <div className="p-8 rounded-2xl bg-slate-900/50 border border-white/10 flex flex-col hover:border-purple-500/50 transition-all relative group">
                        <h3 className="text-xl font-semibold text-white mb-2">Yearly</h3>
                        <div className="flex items-baseline gap-1 mb-4">
                            <span className="text-4xl font-bold text-white">₹300</span>
                            <span className="text-slate-400">/year</span>
                        </div>
                        <p className="text-slate-400 mb-6 text-sm">Best value for long-term.</p>
                        <ul className="space-y-3 mb-8 flex-1">
                            <li className="flex items-center gap-3 text-slate-300 text-sm"><Check size={16} className="text-purple-400" /> Everything in Monthly</li>
                            <li className="flex items-center gap-3 text-slate-300 text-sm"><Check size={16} className="text-purple-400" /> Priority support</li>
                        </ul>
                        <button onClick={() => handlePayment('Yearly', 300)} className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold transition-all">Get Started</button>
                    </div>
                </div>
            </div>
  )
}

export default Pricing
