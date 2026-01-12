import React, { useState } from 'react'
import preview from '../assets/image.png'
import sidebar from '../assets/sidebar.png'
import theme from '../assets/theme.png'
import saved from '../assets/saved.png'
import tool1 from '../assets/tool1.png'
import tool2 from '../assets/tool2.png'
import tool3 from '../assets/tool3.png'
import tool8 from '../assets/tool8.png'
import { Github, Twitter, Linkedin, Mail, Zap, Layout, Share2, Palette, Layers, Download, Check } from 'lucide-react'
import PaymentModal from './PaymentModal'

const Landingpage = ({ openLog }) => {
    const [paymentModal, setPaymentModal] = useState({ open: false, plan: '', amount: 0 });

    const handlePayment = (plan, amount) => {
        setPaymentModal({ open: true, plan, amount });
    };

    const handlePaymentComplete = () => {
        setPaymentModal({ ...paymentModal, open: false });
        openLog();
    };

    return (
        <div className='w-full h-full'>
            <div className='pr-10 pl-10 pt-38 flex flex-col lg:flex-row w-full'>
            <div className=" text-white p-2  md:p-10 w-full lg:max-w-2xl">
                <div>
                    <p className="uppercase tracking-widest text-purple-400 font-medium text-sm">Your Digital Whiteboard Tool</p>
                    <div className="mt-4 space-y-2">
                        <p className="text-8xl font-bold leading-tight">Sketch</p>
                        <p className="text-8xl font-bold leading-tight">Ideas</p>
                        <p className="text-8xl font-bold leading-tight bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">Faster</p>
                    </div>
                    <p className="mt-6 max-w-lg text-base text-slate-400 leading-relaxed">Sketcha helps you turn thoughts into visuals with a simple, fast, and flexible whiteboard—perfect for brainstorming, planning, and collaboration.</p>
                </div>
                <a href="/#pricing" className=" mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold text-base hover:from-purple-400 hover:to-indigo-400 active:scale-95 shadow-lg shadow-purple-500/30 transition-all duration-200">Get Started<span className="text-lg">→</span></a>
            </div>

            <div className='w-full lg:w-2/3 grid grid-cols-3 gap-2 auto-rows-[135px]'>
                <div className='overflow-hidden col-span-2 row-span-2 rounded-2xl border border-white/10 relative group'>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className="text-white font-medium">Infinite Canvas</p>
                    </div>
                    <img className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-110' src={preview} alt="Main Board" />
                </div>
                <div className='overflow-hidden row-span-3 rounded-2xl border border-white/10 relative group'>
                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className="text-white font-medium">Different Themes</p>
                    </div>
                    <img className='h-full w-full object-contain transition-transform duration-500 group-hover:scale-110' src={theme} alt="Mobile" />
                </div>
                <div className='overflow-hidden col-span-2 rounded-2xl border border-white/10 relative group'>
                    <img className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-110' src={saved} alt="Tools" />
                </div>
                <div className='overflow-hidden row-span-2 rounded-2xl border border-white/10 relative group'>
                    <img className='h-full w-full object-contain transition-transform duration-500 group-hover:scale-110' src={tool8} alt="Sketching" />
                </div>
                <div className='overflow-hidden rounded-2xl border border-white/10 relative group'>
                    <img className='h-full w-full object-contain transition-transform duration-500 group-hover:scale-110' src={tool3} alt="Colors" />
                </div>
                <div className='overflow-hidden rounded-2xl border border-white/10 relative group'>
                    <img className='h-full w-full object-contain transition-transform duration-500 group-hover:scale-110' src={tool2} alt="Ideas" />
                </div>
                <div className='overflow-hidden col-span-2 rounded-2xl border border-white/10 relative group'>
                    <img className='h-full w-full object-contain transition-transform duration-500 group-hover:scale-110 ' src={tool1} alt="Team" />
                </div>
            </div>
            </div>

            {/* Features Section */}
            <div id="features" className="w-full max-w-7xl mx-auto px-10 py-24">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Everything you need to create</h2>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        Powerful tools designed to help you bring your ideas to life, from rough sketches to polished diagrams.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Feature 1 */}
                    <div className="p-6 rounded-2xl bg-slate-900/50 border border-white/10 hover:border-purple-500/50 transition-all group">
                        <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400 mb-4 group-hover:scale-110 transition-transform">
                            <Zap size={24} />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">Lightning Fast</h3>
                        <p className="text-slate-400">Optimized for performance with a responsive canvas that keeps up with your creativity.</p>
                    </div>

                    {/* Feature 2 */}
                    <div className="p-6 rounded-2xl bg-slate-900/50 border border-white/10 hover:border-purple-500/50 transition-all group">
                        <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 mb-4 group-hover:scale-110 transition-transform">
                            <Palette size={24} />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">Custom Themes</h3>
                        <p className="text-slate-400">Switch between Light, Dark, Gradient, and Grid themes to match your mood and workflow.</p>
                    </div>

                    {/* Feature 3 */}
                    <div className="p-6 rounded-2xl bg-slate-900/50 border border-white/10 hover:border-purple-500/50 transition-all group">
                        <div className="w-12 h-12 rounded-lg bg-pink-500/20 flex items-center justify-center text-pink-400 mb-4 group-hover:scale-110 transition-transform">
                            <Layout size={24} />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">Infinite Canvas</h3>
                        <p className="text-slate-400">Never run out of space. Our infinite canvas grows with your ideas, no matter how big.</p>
                    </div>

                    {/* Feature 4 */}
                    <div className="p-6 rounded-2xl bg-slate-900/50 border border-white/10 hover:border-purple-500/50 transition-all group">
                        <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center text-green-400 mb-4 group-hover:scale-110 transition-transform">
                            <Layers size={24} />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">Smart Layers</h3>
                        <p className="text-slate-400">Organize your work with intelligent layering for shapes, text, and images.</p>
                    </div>

                    {/* Feature 5 */}
                    <div className="p-6 rounded-2xl bg-slate-900/50 border border-white/10 hover:border-purple-500/50 transition-all group">
                        <div className="w-12 h-12 rounded-lg bg-orange-500/20 flex items-center justify-center text-orange-400 mb-4 group-hover:scale-110 transition-transform">
                            <Download size={24} />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">Easy Export</h3>
                        <p className="text-slate-400">Export your boards as high-quality images to share with your team or include in presentations.</p>
                    </div>

                    {/* Feature 6 */}
                    <div className="p-6 rounded-2xl bg-slate-900/50 border border-white/10 hover:border-purple-500/50 transition-all group">
                        <div className="w-12 h-12 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-110 transition-transform">
                            <Share2 size={24} />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">Project Management</h3>
                        <p className="text-slate-400">Create, save, and manage multiple projects from a simple, intuitive dashboard.</p>
                    </div>
                </div>
            </div>

            {/* About Section */}
            <div id="about" className="w-full max-w-7xl mx-auto px-10 py-24 border-t border-white/10">
                <div className="flex flex-col md:flex-row gap-16 items-center">
                    <div className="flex-1">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">About Sketcha</h2>
                        <p className="text-slate-400 text-lg leading-relaxed mb-6">
                            We believe that great ideas start with a simple sketch. Sketcha is designed to remove the friction between your thoughts and the screen.
                        </p>
                        <p className="text-slate-400 text-lg leading-relaxed">
                            Our mission is to provide a collaborative, infinite workspace where creativity knows no bounds. From solo brainstorming sessions to team workshops, Sketcha adapts to your workflow.
                        </p>
                    </div>
                    <div className="flex-1 grid grid-cols-2 gap-4">
                        <div className="p-6 rounded-2xl bg-slate-900/50 border border-white/10 text-center hover:border-purple-500/50 transition-colors">
                            <h3 className="text-3xl font-bold text-purple-400 mb-2">Fast</h3>
                            <p className="text-slate-500 text-sm">Performance First</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-slate-900/50 border border-white/10 text-center hover:border-blue-500/50 transition-colors">
                            <h3 className="text-3xl font-bold text-blue-400 mb-2">Secure</h3>
                            <p className="text-slate-500 text-sm">Enterprise Grade</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-slate-900/50 border border-white/10 text-center hover:border-pink-500/50 transition-colors">
                            <h3 className="text-3xl font-bold text-pink-400 mb-2">Open</h3>
                            <p className="text-slate-500 text-sm">For Everyone</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-slate-900/50 border border-white/10 text-center hover:border-green-500/50 transition-colors">
                            <h3 className="text-3xl font-bold text-green-400 mb-2">Free</h3>
                            <p className="text-slate-500 text-sm">To Start</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Pricing Section */}
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

            <footer className="w-full border-t border-white/10 bg-black/20 backdrop-blur-sm mt-20 text-white">
                <div className="max-w-7xl mx-auto px-10 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                        <div className="col-span-1 md:col-span-1">
                            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent mb-4">Sketcha</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Empowering creators to visualize ideas instantly. The whiteboard for everyone.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Product</h4>
                            <ul className="space-y-2 text-sm text-slate-400">
                                <li><a href="#" className="hover:text-purple-400 transition-colors">Features</a></li>
                                <li><a href="#" className="hover:text-purple-400 transition-colors">Pricing</a></li>
                                <li><a href="#" className="hover:text-purple-400 transition-colors">Integrations</a></li>
                                <li><a href="#" className="hover:text-purple-400 transition-colors">Changelog</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Resources</h4>
                            <ul className="space-y-2 text-sm text-slate-400">
                                <li><a href="#" className="hover:text-purple-400 transition-colors">Documentation</a></li>
                                <li><a href="#" className="hover:text-purple-400 transition-colors">API Reference</a></li>
                                <li><a href="#" className="hover:text-purple-400 transition-colors">Community</a></li>
                                <li><a href="#" className="hover:text-purple-400 transition-colors">Blog</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Legal</h4>
                            <ul className="space-y-2 text-sm text-slate-400">
                                <li><a href="#" className="hover:text-purple-400 transition-colors">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-purple-400 transition-colors">Terms of Service</a></li>
                                <li><a href="#" className="hover:text-purple-400 transition-colors">Cookie Policy</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-slate-500 text-sm">© 2024 Sketcha Inc. All rights reserved.</p>
                        <div className="flex gap-4">
                            <a href="#" className="text-slate-400 hover:text-white transition-colors"><Github size={20} /></a>
                            <a href="#" className="text-slate-400 hover:text-white transition-colors"><Twitter size={20} /></a>
                            <a href="#" className="text-slate-400 hover:text-white transition-colors"><Linkedin size={20} /></a>
                            <a href="#" className="text-slate-400 hover:text-white transition-colors"><Mail size={20} /></a>
                        </div>
                    </div>
                </div>
            </footer>

            {paymentModal.open && (
                <PaymentModal 
                    plan={paymentModal.plan} 
                    amount={paymentModal.amount} 
                    onClose={() => setPaymentModal({ ...paymentModal, open: false })}
                    onComplete={handlePaymentComplete}
                />
            )}
        </div>
        
    )
}

export default Landingpage
