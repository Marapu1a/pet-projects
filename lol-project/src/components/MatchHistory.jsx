import { useEffect, useState } from 'react';
import { getMatchHistory } from '../api/riotApi';

// eslint-disable-next-line react/prop-types
const MatchHistory = ({ puuid }) => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (puuid) {
      getMatchHistory(puuid)
        .then(data => {
          setMatches(data);
          setLoading(false);
          setError(null);
        })
        .catch(err => {
          console.error('Ошибка при загрузке матчей:', err);
          setError('Не удалось загрузить матчи.');
          setLoading(false);
        });
    }
  }, [puuid]);

  if (loading) return <p>Загрузка матчей...</p>;
  if (error) return <p>{error}</p>;

  return (
    <ul>
      {matches.length > 0 ? (
        matches.map((matchId) => (
          <li key={matchId}>
            <a href={`/match/${matchId}`} target="_blank" rel="noopener noreferrer">
              Открыть статистику матча {matchId}
            </a>
          </li>
        ))
      ) : (
        <p>Матчи не найдены</p>
      )}
    </ul>
  );
};

export default MatchHistory;