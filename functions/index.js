const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors')

const REGION = 'asia-northeast1';

const app = express();

app.use(cors())

const MOCK_COSMES = {
    base: [
      {
        id: '1',
        brand: 'CANMAKE',
        name: 'colorbase-pink',
        color: 'pink',
        theme: []
      }
    ]
}

app.get('/cosmes', (req, res) => {
    const data = MOCK_COSMES
    res.json(data)
})

module.exports.api = functions
    .region(REGION)
    .https.onRequest(app);