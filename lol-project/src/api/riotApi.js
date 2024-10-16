import axios from 'axios';

// Функция для получения PUUID по gameName и tagLine
export const getSummonerPUUID = (gameName, tagLine) => {
    return axios.get(`/api/riot/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`)
        .then(response => {
            return response.data; // Возвращаем данные, включая PUUID
        })
        .catch(error => {
            console.error('Ошибка при запросе PUUID:', error);
            throw error; // Пробрасываем ошибку для обработки на уровне компонента
        });
};
