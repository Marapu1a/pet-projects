import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getMatchDetails } from '../api/riotApi';

// eslint-disable-next-line react/prop-types
const MatchDetails = ({ puuid }) => {
    const { matchId } = useParams(); // Получаем ID матча из URL
    const [matchData, setMatchData] = useState(null);
    const [error, setError] = useState(null);

    // Функция для загрузки данных о матче
    const loadMatchDetails = async (matchId, puuid) => {
        try {
            const data = await getMatchDetails(matchId);
            const playerData = data.info.participants.find(player => player.puuid === puuid);
            setMatchData(playerData);
        } catch (err) {
            console.error("Ошибка при загрузке данных матча: ", err);
            setError("Не удалось загрузить данные о матче");
        }
    };

    useEffect(() => {
        if (puuid) {
            loadMatchDetails(matchId, puuid);
        } else {
            console.warn("Puuid отсутствует, не могу загрузить данные о матче.");
        }
    }, [matchId, puuid]);

    if (error) {
        return <p>{error}</p>;
    }

    if (!matchData) {
        return <p>Загрузка данных...</p>;
    }

    return (
        <div className="match-details">
            <div className="left-side">
                <div className="champion-icon">
                    <img
                        src={`https://ddragon.leagueoflegends.com/cdn/14.20.1/img/champion/${matchData.championName}.png`}
                        alt={matchData.championName}
                    />
                </div>
                <div className="player-stats">
                    <p>Убийства: {matchData.kills}</p>
                    <p>Смерти: {matchData.deaths}</p>
                    <p>Ассисты: {matchData.assists}</p>
                    <p>Время игры: {matchData.timePlayed} секунд</p>
                    <p>Время в состоянии смерти: {matchData.totalTimeSpentDead} секунд</p>
                    <p>KPI: {((matchData.kills + matchData.assists) / (matchData.deaths || 1)).toFixed(2)}</p>
                    <p>Продвинутый DPM: {(matchData.totalDamageDealtToChampions / matchData.timePlayed).toFixed(2)}</p>
                </div>
            </div>
            <div className="right-side">
                <p>Здесь будет карта перемещений</p>
                {/* Заглушка для карты перемещений */}
            </div>
        </div>
    );
};

export default MatchDetails;