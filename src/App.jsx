import React, { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Background from './components/background'
import Navbar from './components/Navbar'
import Landingpage from './components/Landingpage'
import Board from './components/board'
import HomeBoard from './components/HomeBoard'
import LogPop from './components/LogPop'
import SignPop from './components/SignPop'

const App = () => {
  const location = useLocation();
  const [log, setLog] = useState(false);
  const [sign, setSign] = useState(false);

  return (
    <div className='text-shadow-white min-h-screen'>
      <Background >
        {location.pathname !== '/board' && <Navbar openLog={() => setLog(true)} openSign={() => setSign(true)} />}
        <Routes>
          <Route path="/" element={<Landingpage openLog={() => setLog(true)} />} />
          <Route path="/home" element={<HomeBoard />} />
          <Route path="/board" element={<Board />} />
        </Routes>
        <LogPop Log={log} setLog={setLog} />
        <SignPop Sign={sign} setSign={setSign} />
      </Background>
    </div>



  )
}



export default App
