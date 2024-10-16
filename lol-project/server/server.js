import express from 'express';
import axios from 'axios';
import config from '../config';

const app = express();
const port = config.port;

// Функция для конвертации tagLine в регион
const getRegionByTagLine = (tagLine) => {
  const regions = {
    EUW1: 'europe',
    EUN1: 'europe',
    NA1: 'americas',
    BR1: 'americas',
    JP1: 'asia',
    KR: 'asia',
    OC1: 'sea',
    TR1: 'europe',
    RU: 'europe',
    LA1: 'americas',
    LA2: 'americas',
  };

  return regions[tagLine] || 'europe'; // Если сервер неизвестен, используем Europe по умолчанию
};

// Универсальный обработчик для всех запросов Riot API
app.get('/riot/:tagLine/*', async (req, res) => {
  const { tagLine } = req.params; // Извлекаем tagLine (например, EUW1)
  const riotPath = req.params[0]; // Извлекаем оставшуюся часть пути после /riot/:tagLine/
  const region = getRegionByTagLine(tagLine); // Определяем регион по tagLine
  const apiKey = config.API_KEY; // Riot API ключ

  console.log(`Получен запрос: ${req.originalUrl}`);
  console.log(`tagLine: ${tagLine}, riotPath: ${riotPath}`);
  console.log(`Регион: ${region}`);

  try {
    // Формируем финальный URL для запроса к Riot API
    const riotApiUrl = `https://${region}.api.riotgames.com/riot/${riotPath}`;
    console.log(`URL запроса к Riot API: ${riotApiUrl}`); // Логируем URL для проверки

    // Отправляем запрос к Riot API
    const response = await axios.get(riotApiUrl, {
      headers: {
        'X-Riot-Token': apiKey, // Передаём Riot API ключ в заголовке
      },
    });

    // Возвращаем данные клиенту
    res.json(response.data);
  } catch (error) {
    // Логируем ошибку, если запрос не удался
    console.log('Ошибка запроса к Riot API:', error.response?.status || error.message);
    res.status(error.response?.status || 500).send(error.message);
  }
});

// Запускаем сервер на порту 3001
app.listen(port, () => {
  console.log(`Proxy server running on http://localhost:${port}`);
});
