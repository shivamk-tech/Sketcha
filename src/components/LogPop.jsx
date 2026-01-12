import React, { useState, useEffect} from 'react'
import { Combine, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LogPop = ({ Log, setLog }) => {
    const [eye, seteye] = useState(false);
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        const users = JSON.parse(localStorage.getItem('sketcha_users') || '[]');
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            localStorage.setItem('sketcha_current_user', JSON.stringify({ email }));
            setemail('');
            setpassword('');
            setLog(false);
            navigate('/home');
        } else {
            alert("Invalid email or password");
        }
    }

    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    console.log(width);

    return (
        <div className={`text-white h-full w-full inset-0 bg-black/50 fixed z-[1000000] flex items-center justify-center transition-opacity duration-300 ${Log ? 'opacity-100' : 'opacity-0 pointer-events-none'} `} onClick={() => setLog(false)}>
            <div className={`h-120 w-85 sm:w-100 bg-[#0f0f1a] relative flex flex-col items-center rounded-2xl transition-all duration-300 ease-in-out ${Log ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-0 translate-y-2'}`} onClick={(e) => e.stopPropagation()}>
                <div className=' w-full pt-2 pl-75 sm:pl-90'>
                    <button className='w-7 h-7 flex items-center justify-center text-lg  text-gray-300 pb-1 hover:cursor-pointer' onClick={() => {
                        setemail('');
                        setpassword('');
                        setLog(false);
                    }}>✕</button>
                </div>
                <div className='flex flex-col w-full gap-15 justify-center items-center'>
                    <div className='flex flex-col justify-center items-center'>
                        <div>
                            <h1 className='text-2xl font-bold'>Welcome Back</h1>
                        </div>
                        <p className='text-gray-400'>Login to your account to continue</p>
                    </div>
                    <form onSubmit={submitHandler} className='w-9/10 flex flex-col gap-3'>
                        <div className=' flex flex-col gap-3'>
                            <div className='pl-2'>Username :</div>
                            <input value={email} onChange={(e) => setemail(e.target.value)} type="email" placeholder="Email address" className="w-full rounded-lg bg-slate-900/80 border border-white/10 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all duration-200" />
                        </div>
                        <div className=' flex flex-col gap-3'>
                            <div className='pl-2'>Password :</div>
                            <input value={password} onChange={(e) => setpassword(e.target.value)} type={eye ? 'text' : 'password'} placeholder="Password" className="w-full rounded-lg bg-slate-900/80 border border-white/10 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all duration-200" />
                            <p className='text-sm text-gray-600 pl-45 sm:pl-58 hover:text-gray-400'><a href="">Forget Password?</a></p>
                            <button type="button" className={`${eye ? 'text-blue-500' : 'text-white'} absolute left-70 sm:left-85 top-74.5 cursor-pointer`} onClick={() => seteye(!eye)}><Eye /></button>
                        </div>
                        <button type='submit' className="w-full mt-4 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold hover:from-purple-400 hover:to-indigo-400 active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-200">Login</button>

                    </form>
                </div>

            </div>
        </div >
    )
}

export default LogPop
