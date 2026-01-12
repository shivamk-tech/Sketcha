import React, { useState } from 'react'
import { Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SignPop = ({ Sign, setSign }) => {
    const [eye, seteye] = useState(false);
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [confirm, setconfirm] = useState('');
    const navigate = useNavigate();

    const submitForm = (e) => {
        e.preventDefault()
        if (!email || !password || !confirm) {
            alert("Please fill all fields");
            return;
        }
        if (password !== confirm) {
            alert("Passwords do not match");
            return;
        }

        const users = JSON.parse(localStorage.getItem('sketcha_users') || '[]');
        const userExists = users.find(u => u.email === email);

        if (userExists) {
            alert("User already exists");
            return;
        }

        const newUser = { email, password };
        users.push(newUser);
        localStorage.setItem('sketcha_users', JSON.stringify(users));
        localStorage.setItem('sketcha_current_user', JSON.stringify({ email }));

        setconfirm('');
        setemail('');
        setpassword('');
        setSign(false);
        navigate('/home');
    }

    return (
        <div className={`text-white h-full w-full inset-0 bg-black/50  fixed z-[100000] flex items-center justify-center transition-opacity duration-300 ${Sign ? 'opacity-100' : 'opacity-0 pointer-events-none'} `} onClick={() => setSign(false)}>
            <div className={`h-120 w-85 sm:w-100 bg-[#0f0f1a] relative flex flex-col items-center rounded-2xl transition-all duration-300 ease-in-out ${Sign ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-0 translate-y-2'} `} onClick={(e) => e.stopPropagation()}>
                <div className=' w-full pt-2 pl-75 sm:pl-90'>
                    <button className='w-7 h-7 flex items-center justify-center text-lg  text-gray-300 pb-1 hover:cursor-pointer' onClick={() => {
                        setemail('');
                        setpassword('');
                        setSign(false);
                    }}>✕</button>
                </div>
                <div className='flex flex-col w-full gap-5 justify-center items-center'>
                    <div className='flex flex-col justify-center items-center'>
                        <div>
                            <h1 className='text-2xl font-bold'>Join Sketcha</h1>
                        </div>
                        <p className='text-gray-400'>Turn your ideas into visuals, instantly.</p>
                    </div>
                    <form
                        onSubmit={(e) => { submitForm(e) }}
                        className='w-9/10 flex flex-col gap-3'>
                        <div className=' flex flex-col gap-1'>
                            <div className='pl-2'>User Email :</div>
                            <input
                                value={email}
                                onChange={(e => { setemail(e.target.value) })}
                                type="email"
                                placeholder="Email address"
                                className="w-full rounded-lg bg-slate-900/80 border border-white/10 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all duration-200" />
                        </div>
                        <div className=' flex flex-col gap-1'>
                            <div className='pl-2'>Password :</div>

                            <input
                                value={password}
                                onChange={(e) => { setpassword(e.target.value) }}
                                type={eye ? 'text' : 'password'}
                                placeholder='Password'
                                className="w-full rounded-lg bg-slate-900/80 border border-white/10 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all duration-200" />

                            <button type="button" className={`${eye ? 'text-blue-500' : 'text-white'} absolute left-70 sm:left-85 top-60.5 cursor-pointer`} onClick={() => seteye(!eye)}><Eye /></button>
                        </div>
                        <div className=' flex flex-col gap-1'>
                            <div className='pl-2'>Confirm Password :</div>

                            <input
                                value={confirm}
                                onChange={(e) => { setconfirm(e.target.value) }}
                                type={eye ? 'text' : 'password'}
                                placeholder='Confirm Password'
                                className="w-full rounded-lg bg-slate-900/80 border border-white/10 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all duration-200" />

                        </div>
                        <button type='submit' className="w-full mt-4 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold hover:from-purple-400 hover:to-indigo-400 active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-200">Sign Up</button>
                    </form>
                </div>
            </div>
        </div >
    )
}

export default SignPop
