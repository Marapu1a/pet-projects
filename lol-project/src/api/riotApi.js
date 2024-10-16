import axios from 'axios';

// Функция для получения PUUID по gameName и tagLine
export const getSummonerPUUID = (gameName, tagLine) => {
    return axios.get(`/api/rito/riot/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`)
        .then(response => {
            console.log(response.data.puuid)
            return response.data; // Возвращаем данные, включая PUUID
        })
        .catch(error => {
            console.error('Ошибка при запросе PUUID:', error);
            throw error; // Пробрасываем ошибку для обработки на уровне компонента
        });
};

export const getMatchHistory = (puuid) => {
    return axios.get(`/api/rito/lol/lol/match/v5/matches/by-puuid/${puuid}/ids`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error('Ошибка при запросе матчей', error);
            throw error;
        });
};
