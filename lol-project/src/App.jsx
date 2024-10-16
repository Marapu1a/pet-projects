import { useState } from 'react';
import SummonerSearch from './components/SummonerSearch';
import MatchHistory from './components/MatchHistory';

const App = () => {
  const [puuid, setPuuid] = useState(null);

  const handleSummonerFound = (foundPuuid) => {
    setPuuid(foundPuuid);
  };

  return (
    <div>
      <h1>League of Legends Match History</h1>
      <SummonerSearch onSummonerFound={handleSummonerFound} />

      {/* Если PUUID найден, отображаем его */}
      {puuid && (
        <div>
          <MatchHistory puuid={puuid} />
        </div>
      )}
    </div>
  );
};

export default App;
