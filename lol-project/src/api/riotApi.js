import axios from 'axios';

const pref = '/api/rito/'

// Функция для получения PUUID по gameName и tagLine
export const getSummonerPUUID = (gameName, tagLine) => {
    return axios.get(`${pref}riot/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`)
        .then(response => {
            console.log(response.data.puuid)
            return response.data; // Возвращаем данные, включая PUUID
        })
        .catch(error => {
            console.error('Ошибка при запросе PUUID:', error);
            throw error; // Пробрасываем ошибку для обработки на уровне компонента
        });
};

// Функция для получения списка из 20 matchId
export const getMatchHistory = (puuid) => {
    return axios.get(`${pref}lol/lol/match/v5/matches/by-puuid/${puuid}/ids`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error('Ошибка при запросе матчей', error);
            throw error;
        });
};

// Функция для получения подробной статистики матча по matchId
export const getMatchDetails = (matchId) => {
    return axios.get(`${pref}lol/lol/match/v5/matches/${matchId}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error('Ошибка при запросе деталей матча', error);
            throw error;
        });
};