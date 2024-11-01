import './App.css'
import { Routes, Route, useNavigate }
  from 'react-router-dom';
import { useState, createContext, useContext } from 'react'
import SearchPage from './components/LandingPage/SearchPage';
import PlayerProfile from './components/PlayerProfile/PlayerProfile';
import ComparePlayers from './components/ComparePlayer/ComparePlayers';
import { ReactNode } from 'react';
import { Player } from './components/Types/types';

export interface PlayerContextType {
  player: Player | null;
  setPlayer: (player: Player) => void;
}

export const PlayerContext = createContext<PlayerContextType | null>(null);

export const PlayerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [player, setPlayer] = useState<Player | null>(null);

  return <PlayerContext.Provider value={{ player, setPlayer }}>{children}</PlayerContext.Provider>;
};

function App() {
  const context = useContext(PlayerContext);
  const [playerPath, setPlayerPath] = useState<string>();
  const navigate = useNavigate();
  const showStats = () => {
    const urlPath = '/' + context?.player?.fullName.replace(/\s/g, '_');
    setPlayerPath(urlPath);
    navigate(urlPath);
  }

  return (
    <Routes>
      <Route path='/' element={<SearchPage onDataReceived={showStats} />} />
      <Route path={playerPath} element={<PlayerProfile />} />
      <Route path='/compare' element={<ComparePlayers />} />
    </Routes>

  )
}

export default App
