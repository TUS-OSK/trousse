console.log("User/yoshidaruna/Downloads", process.env.GOOGLE_APPLICATION_CREDENTIALS)

const functions = require('firebase-functions');
require("firebase/firestore")
const admin = require('firebase-admin')
admin.initializeApp()
// admin.initializeApp({
//   credential: admin.credential.applicationDefault(),
//   databaseURL: 'https://oskweb-trousse.firebaseio.com'
// });
// console.log(functions.config())
const express = require('express');
const cors = require('cors')

const REGION = 'asia-northeast1';

const app = express();

app.use(cors())

const db = admin.firestore()

// const usersRef = db.collection('users');
// usersRef.doc('MOCK_COSMES').set({
//   base: [{
//     id: '1',
//     brand: 'CANMAKE',
//     name: 'colorbase-pink',
//     color: 'pink',
//     theme: []
//   }]
// })


app.get('/cosmes', async (req, res) => {
  const usersRef = db.collection('users').doc('MOCK_COSMES')
  const data = await usersRef.get()
  res.json(data.data())
})

module.exports.api = functions
    .region(REGION)
    .https.onRequest(app);

    process.on('unhandledRejection', console.dir);