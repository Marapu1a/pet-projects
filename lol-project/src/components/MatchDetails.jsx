import { useParams } from 'react-router-dom';

const MatchDetails = () => {
    const { matchId } = useParams(); // Получаем ID матча из URL

    return (
        <div>
            <h1>Детали матча {matchId}</h1>
            {/* Здесь будут отображаться подробности матча */}
            <p>Подробная статистика и карта перемещений игрока.</p>
        </div>
    );
};

export default MatchDetails;