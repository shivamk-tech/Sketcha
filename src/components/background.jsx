const Background = ({ children }) => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-950 to-black">
      <div className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-purple-700 rounded-full blur-[220px] opacity-25"></div>
      <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-purple-600 rounded-full blur-[160px] opacity-35 mix-blend-screen animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="relative z-10">{children}</div>
    </div>
  )
}

export default Background
