import { useEffect, useState } from "react";
import { getMatchHistory } from "../api/riotApi";

// eslint-disable-next-line react/prop-types
const MatchHistory = ({ puuid }) => {
    // Создаём состояние для хранения истории матчей
    const [matches, setMatches] = useState([]);

    // Выполняем запрос к API, как только компонент смонтирован
    useEffect(() => {
        // Запрашиваем историю матчей и обновляем состояние
        getMatchHistory(puuid)
            .then(data => {
                setMatches(data); // Сохраняем данные в состоянии
            })
            .catch(error => {
                console.error("Ошибка при загрузке матчей:", error);
            });
    }, [puuid]); // Зависимость: если puuid изменится, запрос выполнится заново

    // Рендерим список матчей
    return (
        <ul>
            {matches.length > 0 ? (
                matches.map((matchId, index) => (
                    <li key={index}>{matchId}</li> // Рендерим каждый матч
                ))
            ) : (
                <li>Загрузка матчей...</li> // Если матчей нет или они загружаются
            )}
        </ul>
    );
};

export default MatchHistory;