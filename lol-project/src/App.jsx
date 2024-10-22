import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import SummonerSearch from './components/SummonerSearch';
import MatchHistory from './components/MatchHistory';
import MatchDetails from './components/MatchDetails';

const App = () => {
  const [puuid, setPuuid] = useState(null);

  const handleSummonerFound = (foundPuuid) => {
    setPuuid(foundPuuid);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <SummonerSearch onSummonerFound={handleSummonerFound} />
              {puuid && <MatchHistory puuid={puuid} />}
            </div>
          }
        />
        <Route
          path="/match/:matchId"
          element={
            <MatchDetails puuid={'09iPiKG63rKuloRwcEX1oM78rJF51Ybj9cwBFMMlXvxtFpePKKjxHrY2lkRyRR2DVTJIJFHLdvVoLQ'} />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;