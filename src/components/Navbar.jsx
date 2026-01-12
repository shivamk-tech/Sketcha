import React from 'react'
import logo from '../assets/image.png'
import { useNavigate } from 'react-router-dom'

const Navbar = ({ openLog, openSign }) => {
    const navigate = useNavigate();

    return (
        <>
        <div className=' w-full pt-2 pb-2 pr-2 m-0 md:pt-2 md:pb-2 md:pl-2 md:pr-7 text-white flex justify-between sm:gap-3 items-center fixed bg-slate-900/80 backdrop-blur-md z-10000 border-b border-white/10'>
            <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
                <img className='object-contain' height={80} width={80} src={logo} alt="Logo" />
                <span className="hidden sm:block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 font-semibold text-3xl tracking-tight">
                    Sketcha
                </span>
            </div>

            <div className='flex  gap-3 sm:text-xl font-light sm:gap-10 md:text-xl font-sans font-bold'>
                <h1 className='hover:opacity-50 transition-opacity active:-translate-y-1 transition-transform cursor-pointer'><a href="/#about">About</a></h1>
                <h1 className='hover:opacity-50 transition-opacity active:-translate-y-1 transition-transform cursor-pointer'><a href="/#features">Features</a></h1>
                <h1 className='hover:opacity-50 transition-opacity active:-translate-y-1 transition-transform cursor-pointer'><a href="/#pricing">Pricing</a></h1>
            </div>
            
            <div className='flex items-center gap-3'>
                <button onClick={openLog} className="px-4 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-all duration-200">Log In</button>
                <button onClick={openSign} className="px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-500 hover:to-indigo-500 shadow-lg shadow-purple-500/25 active:scale-95 transition-all duration-200">Sign Up</button>
            </div>
        </div>
        </>
    )
}

export default Navbar
