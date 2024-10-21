import { useState } from 'react';
import { getSummonerPUUID } from '../api/riotApi';

// eslint-disable-next-line react/prop-types
const SummonerSearch = ({ onSummonerFound }) => {
  const [gameName, setGameName] = useState('');
  const [tagLine, setTagLine] = useState('EUW1');
  const [error, setError] = useState(null);

  const handleSearch = () => {
    if (!gameName) {
      console.log("Введите имя суммонера");
      return;
    }

    console.log(`Поиск суммонера: ${gameName} на сервере ${tagLine}`);

    getSummonerPUUID(gameName, tagLine)
      .then(response => {
        const puuid = response.puuid;
        onSummonerFound(puuid);  // Передаем PUUID в родительский компонент
        setError(null);
      })
      .catch(error => {
        console.error('Ошибка при запросе:', error);
        setError('Не удалось получить информацию. Попробуйте снова.');
      });
  };

  return (
    <div>
      <h1>League of Legends Match History</h1>

      <input
        type="text"
        value={gameName}
        onChange={(e) => setGameName(e.target.value)}
        placeholder="Enter summoner name"
      />
      <select value={tagLine} onChange={(e) => setTagLine(e.target.value)}>
        <option value="EUW1">EU West (EUW1)</option>
        <option value="NA1">North America (NA1)</option>
        <option value="EUN1">Europe Nordic & East (EUN1)</option>
        <option value="KR">Korea (KR)</option>
        <option value="JP1">Japan (JP1)</option>
        <option value="RU">Russia (RU)</option>
        <option value="BR1">Brazil (BR1)</option>
        <option value="OC1">Oceania (OC1)</option>
        <option value="TR1">Turkey (TR1)</option>
        <option value="LA1">Latin America North (LA1)</option>
        <option value="LA2">Latin America South (LA2)</option>
      </select>
      <button type="button" onClick={handleSearch}>Search</button>

      {error && <p>{error}</p>}
    </div>
  );
};

export default SummonerSearch;