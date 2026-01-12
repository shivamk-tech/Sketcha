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
import { Link } from 'react-router-dom'
import PaymentModal from './PaymentModal'
import About from '../components/About'
import Pricing from '../components/Pricing'

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
        <div className='w-full min-h-screen'>
            <div className='pr-10 pl-3 sm:pl-10 pt-32 md:pt-40 flex flex-col lg:flex-row w-full'>
            <div className=" text-white p-2  sm:p-10 w-full lg:max-w-2xl">
                <div>
                    <p className="uppercase tracking-widest text-purple-400 font-medium text-sm">Your Digital Whiteboard Tool</p>
                    <div className="mt-4 space-y-2">
                        <p className="text-7xl sm:text-8xl font-bold leading-tight">Sketch</p>
                        <p className="text-7xl sm:text-8xl font-bold leading-tight">Ideas</p>
                        <p className="text-7xl sm:text-8xl font-bold leading-tight bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">Faster</p>
                    </div>
                    <p className="mt-6 max-w-lg text-base text-slate-400 leading-relaxed">Sketcha helps you turn thoughts into visuals with a simple, fast, and flexible whiteboard—perfect for brainstorming, planning, and collaboration.</p>
                </div>
                <Link to="/home" className=" mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold text-base hover:from-purple-400 hover:to-indigo-400 active:scale-95 shadow-lg shadow-purple-500/30 transition-all duration-200">Get Started<span className="text-lg">→</span></Link>
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
            <About/>

            {/* Pricing Section */}
            <Pricing openLog={openLog} handlePayment={handlePayment} />

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
