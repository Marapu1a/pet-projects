import express from 'express';
import axios from 'axios';

const app = express();
const port = 3001;

app.get('/riot/account/v1/accounts/by-riot-id/:gameName/:tagLine', async (req, res) => {
  const { gameName, tagLine } = req.params;
  const apiKey = 'RGAPI-54e37433-13fc-40ec-be31-44716b6f6ec2'; // Замени на свой Riot API ключ

  try {
    const response = await axios.get(`https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`, {
      headers: {
        'X-Riot-Token': apiKey,
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Proxy server running on http://localhost:${port}`);
});
