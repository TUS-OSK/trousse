console.log("Users/yoshidaruna/Downloads", process.env.GOOGLE_APPLICATION_CREDENTIALS)

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

const usersRef = db.collection('users').doc('MOCK_COSMES');
usersRef.set({
    base:[{
      id: '1',
  brand: 'CANMAKE',
  name: 'colorbase-pink',
  color: 'pink',
  theme: []
    }]
})
//base array

app.get('/cosmes', async (req, res) => {
  const usersRef = db.collection('users').doc('MOCK_COSMES')
  const data = await usersRef.get()
  res.json(data.data())
})


// // Atomically add a new region to the "regions" array field.
// let arrUnion = washingtonRef.update({
//   regions: admin.firestore.FieldValue.arrayUnion('greater_virginia')
// });
// // Atomically remove a region from the "regions" array field.
// let arrRm = washingtonRef.update({
//   regions: admin.firestore.FieldValue.arrayRemove('east_coast')
// });


app.post('/cosmes', async (req, res) => {
  const usersRef = db.collection('users').doc('MOCK_COSMES');
  const data = await usersRef.set({
  }
    )
    .catch(_err => {
      res.json({
        error: "hoge"
      })
    })
  res.json({
    status: "ok!"
  })
})

const ALLOWED_METHODS = [
  'GET',
  'POST',
  'PUT',
  'PATCH',
  'DELETE',
  'HEAD',
  'OPTIONS'
];

const ALLOWED_ORIGINS = [
  // 'http://localhost:5000',
  'http://localhost:8080'
];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if(ALLOWED_ORIGINS.indexOf(req.headers.origin) > -1) {
      sess.cookie.secure = true;
      res.cookie('example', Math.random().toString(), {maxAge: 86400, httpOnly: true});
      res.setHeader('Access-Control-Allow-Origin', origin);
      res.setHeader('Access-Control-Allow-Methods', ALLOWED_METHODS.join(','));
      res.setHeader('Access-Control-Allow-Headers', 'Content-type,Accept,X-Custom-Header');
  }

  next();
});

module.exports.api = functions
    .region(REGION)
    .https.onRequest(app);

    // process.on('unhandledRejection', console.dir);