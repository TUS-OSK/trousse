const functions = require('firebase-functions');
const express = require('express');

const REGION = 'asia-northeast1';


// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

// exports.helloWorld = functions
//   .region(REGION)
//   .https.onRequest((request, response) => {
//     response.send("Hello from Firebase!");
//   });



  const app = express();

  var cors = require('cors')

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

app.use(cors())