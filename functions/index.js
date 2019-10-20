const functions = require('firebase-functions');
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)
// console.log(functions.config())
const express = require('express');
const cors = require('cors')

const REGION = 'asia-northeast1';

const app = express();

app.use(cors())

const fireStore = admin.firestore()

const MOCK_COSMES = {
    base: [
      {
        id: '1',
        brand: 'CANMAKE',
        name: 'colorbase-pink',
        color: 'peeink',
        theme: []
      }
    ]
}


  const usersRef = fireStore.collection('users');
  usersRef.doc('MOCK_COSMES').set({
      base: [{
        id: '1',
        brand: 'CANMAKE',
        name: 'colorbase-pink',
        color: 'pink',
        theme: []
      }]
  })



app.get('/cosmes', async (req, res) => {
    const usersRef = fireStore.collection('users').doc('MOCK_COSMES')
    const data = await usersRef.get()
    console.log(data)
    console.log(data.data())
    res.json(data)
})

module.exports.api = functions
    .region(REGION)
    .https.onRequest(app);