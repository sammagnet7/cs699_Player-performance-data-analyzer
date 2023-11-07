import './App.css'
import { BrowserRouter as Router, Routes, Route, useNavigate }
  from 'react-router-dom';
import { Player } from './components/Searchbar'
import { useState } from 'react'
import SearchPage from './components/SearchPage';
import PlayerProfile from './components/PlayerProfile';
function App() {
  const [playerData, setPlayerData] = useState<Player>();
  const [playerPath, setPlayerPath] = useState<string>();
  const navigate = useNavigate();
  const handlePlayerData = (data: Player) => {
    setPlayerData(data);
    // replace whitespaces with underscores
    const urlPath = '/' + data.fullName.replace(/\s/g, '_');
    setPlayerPath(urlPath);
    navigate(urlPath);
  }

  return (

    <Routes>
      <Route path='/' element={<SearchPage onDataReceived={handlePlayerData} />} />
      <Route path={playerPath} element={<PlayerProfile />} />
    </Routes>
  )
}

export default App
