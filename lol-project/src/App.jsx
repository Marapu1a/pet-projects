import { useState } from 'react';
import SummonerSearch from './components/SummonerSearch';

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
          <h2>PUUID: {puuid}</h2>
        </div>
      )}
    </div>
  );
};

export default App;
