const express = require('express');
const app = express();

app.use(express.json());
// app.disable('etag');

const axios = require('axios');

const faceitUri = 'https://open.faceit.com/data/v4/players/';
const FACEIT_SECRET_KEY = {
  headers: { Authorization: process.env.FACEIT_SECRET_KEY }
};

app.get('/', (req, res) => {
  let playersArr = null;
  axios
    .get(`http://santamaa.com:3003/api/players/`)
    .then(response => (playersArr = response.data))
    .finally(() => res.json(playersArr));
});

app.get('/faceit', (req, res) => {
  const id = req.query.id;

  if (!id) {
    res.status(400).send('ID missing!');
  } else if (id) {
    axios
      .get(`${faceitUri}${id}`, FACEIT_SECRET_KEY)
      .then(response => {
        const { avatar } = response.data;
        const { skill_level: level } = response.data.games.csgo;
        res.json({ avatar, level });
      })
      .catch(err => res.send({ error: err }));
  }
});

app.get('/matches', (req, res) => {
  const id = req.query.id;

  if (!id) {
    res.status(400).send('ID missing!');
  } else if (id) {
    axios
      .get(`http://santamaa.com:3003/api/matches/?guid=${id}&limit=100`)
      .then(response => res.json(response.data))
      .catch(err => res.send({ error: err }));
  }
});

app.get('/elo', (req, res) => {
  const id = req.query.id;

  if (!id) {
    res.status(400).send('ID missing!');
  } else if (id) {
    axios
      .get(`http://santamaa.com:3003/api/elo/?guid=${id}&limit=1`)
      .then(response => {
        const { elo } = response.data[0];
        res.json(elo);
      })
      .catch(err => res.send({ error: err }));
  }
});

module.exports = {
  path: '/api',
  handler: app
};
