import React from 'react'

const About = () => {
  return (
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
  )
}

export default About
