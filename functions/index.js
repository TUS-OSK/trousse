const functions = require('firebase-functions');
require("firebase/firestore")
const admin = require('firebase-admin')
admin.initializeApp()
const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')

const REGION = 'asia-northeast1';

const app = express();

app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


const db = admin.firestore()

app.get('/cosmes', async (req, res) => {
  const baseRef = db.collection('users').doc('MOCK_COSMES').collection('cosmes').doc('base').collection('data');
  const basedatalist = await baseRef.get()
  const cheekRef = db.collection('users').doc('MOCK_COSMES').collection('cosmes').doc('cheek').collection('data');
  const cheekdatalist = await cheekRef.get()
  const lipRef = db.collection('users').doc('MOCK_COSMES').collection('cosmes').doc('lip').collection('data');
  const lipdatalist = await lipRef.get()
  const cosmes ={
    base:[],
    cheek:[],
    lip:[]
  }
  basedatalist.forEach(v=>
    {cosmes.base.push({id:v.id,...v.data()})})
  cheekdatalist.forEach(v=>
    {cosmes.cheek.push({id:v.id,...v.data()})})
  lipdatalist.forEach(v=>
    {cosmes.lip.push({id:v.id,...v.data()})})
  res.json(cosmes)
})


app.post('/cosmes', async (req, res) => {
  if(req.body.type!== "base" && req.body.type!=="cheek" && req.body.type!=="lip"){
    res.json({
      error: "hugo"
    })
  }
  const usersRef = db.collection('users').doc('MOCK_COSMES').collection('cosmes').doc(req.body.type).collection('data');
  const addReq = await usersRef.add(req.body.info)
  res.json({
    status: "ok!",
    id:addReq.id
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

process.on('unhandledRejection', console.dir);