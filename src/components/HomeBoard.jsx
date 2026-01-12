import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Trash2, Plus, Layout, LogOut, User, Menu, X } from 'lucide-react'

const HomeBoard = () => {
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState('');
    const [projects, setProjects] = useState([]);
    const [selectedTheme, setSelectedTheme] = useState('light');
    const [currentUser, setCurrentUser] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const loadedProjects = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith('sketcha_board_')) {
                loadedProjects.push(key.replace('sketcha_board_', ''));
            }
        }
        setProjects(loadedProjects);

        const user = JSON.parse(localStorage.getItem('sketcha_current_user'));
        if (user) setCurrentUser(user);
    }, []);

    const handleCreate = () => {
        if (name.trim()) {
            navigate('/board', { state: { projectName: name, theme: selectedTheme } });
        }
    };

    const handleDelete = (e, projectName) => {
        e.stopPropagation();
        localStorage.removeItem(`sketcha_board_${projectName}`);
        setProjects(projects.filter(p => p !== projectName));
    };

    const handleThemeSelect = (color) => {
        setSelectedTheme(color);
        setShowModal(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('sketcha_current_user');
        navigate('/');
    };

    const handleDeleteAccount = () => {
        if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
            const users = JSON.parse(localStorage.getItem('sketcha_users') || '[]');
            const newUsers = users.filter(u => u.email !== currentUser.email);
            localStorage.setItem('sketcha_users', JSON.stringify(newUsers));
            localStorage.removeItem('sketcha_current_user');
            navigate('/');
        }
    };

    return (
        <div className='flex h-screen w-full text-white overflow-hidden animate-fade-in pt-28'>
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fadeIn 0.5s ease-out forwards;
                }
            `}</style>
            
            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black/60 z-30 md:hidden backdrop-blur-sm transition-opacity"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar - Themes */}
            <div className={`
                fixed inset-y-0 left-0 z-40 w-72 md:w-80 bg-slate-900 md:bg-slate-900/50 backdrop-blur-xl border-r border-white/10 p-6 flex flex-col gap-6 h-full shrink-0 transition-transform duration-300 ease-in-out md:relative md:translate-x-0 pt-28 md:pt-6
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className='flex items-center justify-between mb-2'>
                    <div className='flex items-center gap-3 text-purple-400'>
                        <Layout size={28} />
                        <h1 className='text-2xl font-bold text-white tracking-tight'>Themes</h1>
                    </div>
                    <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-slate-400 hover:text-white">
                        <X size={24} />
                    </button>
                </div>
                
                <div className='flex flex-col gap-4 overflow-y-auto pr-2 scrollbar-none flex-1'>
                    <div className='group cursor-pointer' onClick={() => handleThemeSelect('light')}>
                        <div className='h-32 w-full rounded-xl bg-white border-2 border-transparent group-hover:border-purple-500 transition-all shadow-lg relative overflow-hidden'></div>
                        <p className='mt-2 text-sm font-medium text-slate-400 group-hover:text-white transition-colors'>Light Canvas</p>
                    </div>

                    <div className='group cursor-pointer' onClick={() => handleThemeSelect('dark')}>
                        <div className='h-32 w-full rounded-xl bg-slate-800 border-2 border-transparent group-hover:border-purple-500 transition-all shadow-lg relative overflow-hidden'></div>
                        <p className='mt-2 text-sm font-medium text-slate-400 group-hover:text-white transition-colors'>Dark Canvas</p>
                    </div>

                    <div className='group cursor-pointer' onClick={() => handleThemeSelect('gradient')}>
                        <div className='h-32 w-full rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 border-2 border-transparent group-hover:border-purple-500 transition-all shadow-lg relative overflow-hidden'></div>
                        <p className='mt-2 text-sm font-medium text-slate-400 group-hover:text-white transition-colors'>Gradient</p>
                    </div>

                    <div className='group cursor-pointer' onClick={() => handleThemeSelect('grid')}>
                        <div className='h-32 w-full rounded-xl bg-[#f0f0f0] border-2 border-transparent group-hover:border-purple-500 transition-all shadow-lg relative overflow-hidden' style={{backgroundImage: 'radial-gradient(#ccc 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>
                        <p className='mt-2 text-sm font-medium text-slate-400 group-hover:text-white transition-colors'>Dot Grid</p>
                    </div>
                </div>

                {/* User Section */}
                {currentUser && (
                    <div className="mt-auto pt-6 border-t border-white/10">
                        <div className="flex items-center gap-3 mb-4 text-slate-300">
                            <div className="p-2 bg-slate-800 rounded-full">
                                <User size={20} />
                            </div>
                            <span className="text-sm font-medium truncate">{currentUser.email}</span>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={handleLogout} className="flex-1 flex items-center justify-center gap-2 p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm transition-colors">
                                <LogOut size={16} /> Logout
                            </button>
                            <button onClick={handleDeleteAccount} className="flex items-center justify-center p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors" title="Delete Account">
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Main Content - Projects */}
            <div className='flex-1 flex flex-col h-full p-4 md:p-8 lg:p-12 overflow-hidden w-full'>
                <div className="flex items-center gap-4 mb-6 md:mb-8 shrink-0">
                    <button 
                        onClick={() => setIsSidebarOpen(true)}
                        className="md:hidden p-2 bg-slate-800 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                    >
                        <Menu size={24} />
                    </button>
                    <h1 className='text-3xl md:text-4xl font-bold tracking-tight'>My Boards</h1>
                </div>
                
                <div className='flex-1 min-h-0 overflow-y-auto pb-20 pr-2'>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6'>
                    <button 
                        onClick={() => { setSelectedTheme('light'); setShowModal(true); }} 
                        className='aspect-[4/3] rounded-xl border-2 border-dashed border-slate-700 hover:border-purple-500 hover:bg-slate-800/50 transition-all flex flex-col items-center justify-center gap-3 group'
                    >
                        <div className='p-4 rounded-full bg-slate-800 group-hover:bg-purple-500/20 group-hover:text-purple-400 transition-colors text-slate-400'>
                            <Plus size={32} />
                        </div>
                        <span className='font-medium text-slate-400 group-hover:text-white transition-colors'>Create New Board</span>
                    </button>
                    
                    {projects.map((project) => (
                        <div key={project} onClick={() => navigate('/board', { state: { projectName: project } })} className='aspect-[4/3] bg-slate-800 rounded-xl border border-slate-700 hover:border-purple-500/50 transition-all cursor-pointer relative group overflow-hidden flex flex-col shadow-lg hover:shadow-purple-500/10'>
                            <div className='flex-1 bg-slate-900/50 w-full flex items-center justify-center'>
                                <span className='text-4xl font-bold text-slate-700 select-none'>{project.charAt(0).toUpperCase()}</span>
                            </div>
                            <div className='p-4 bg-slate-900 border-t border-slate-700 flex justify-between items-center'>
                                <span className="truncate font-medium text-slate-200">{project}</span>
                                <button onClick={(e) => handleDelete(e, project)} className='p-2 hover:bg-red-500/20 text-slate-500 hover:text-red-400 rounded-lg transition-colors'><Trash2 size={16} /></button>
                            </div>
                        </div>
                    ))}
                    </div>
                </div>
            </div>

            {/* Name Project Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm">
                    <div className="bg-slate-900 p-6 rounded-xl border border-white/20 w-96 flex flex-col gap-4 shadow-2xl">
                        <h2 className="text-xl text-white font-bold">Name your project</h2>
                        <input 
                            type="text" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter project name..."
                            className="w-full p-3 rounded-lg bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-purple-500 transition-colors"
                            autoFocus
                            onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
                        />
                        <div className="flex justify-end gap-3 mt-2">
                            <button 
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 text-slate-300 hover:text-white transition-colors"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={handleCreate}
                                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-500 hover:to-indigo-500 transition-all font-medium"
                            >
                                Create Board
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default HomeBoard
