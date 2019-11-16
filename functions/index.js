const functions = require("firebase-functions");
require("firebase/firestore");
const admin = require("firebase-admin");
admin.initializeApp();
const express = require("express");
const bearerToken = require("express-bearer-token");
const cors = require("cors");
const bodyParser = require("body-parser");

const REGION = "asia-northeast1";

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bearerToken());

const db = admin.firestore();

async function isAuthenticated(token) {
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    return decodedToken;
  } catch (e) {
    return null;
  }
}
app.get("/cosmes", async (req, res) => {
  const decodedToken = await isAuthenticated(req.token);
  if (decodedToken === null) {
    res.json({
      error: "認証ERROR"
    });
    return;
  }
  const uid = decodedToken.uid;
  const cosmes = {
    makeupbase: [],
    foundation: [],
    facepowder: [],
    eyeshadow: [],
    eyeliner: [],
    mascara: [],
    eyebrow: [],
    cheek: [],
    lipstick: [],
    lipgloss: []
  };
  var cosmeType = [];

  const cosmeTypeRef = db
    .collection("users")
    .doc(uid)
    .collection("cosmes");
  const cosmeTypeList = await cosmeTypeRef.get();
  cosmeTypeList.forEach(doc => {
    cosmeType.push(doc.id);
  });
  console.log(cosmeType);

  await Promise.all(
    cosmeType.map(async currentCosmeType => {
      const databaseRef = db
        .collection("users")
        .doc(uid)
        .collection("cosmes")
        .doc(currentCosmeType);
      const databaseOederList = await databaseRef.get();
      const databasedatalist = await databaseRef.collection("data").get();
      if (databaseOederList.data() !== undefined) {
        for (var i = 0; i <= databaseOederList.data().order.length; i++) {
          databasedatalist.forEach(v => {
            if (databaseOederList.data().order[i] === v.id) {
              cosmes[currentCosmeType].push({ id: v.id, ...v.data() });
            }
          });
        }
      } else {
        databaseOederList.forEach(v => {
          cosmes[currentCosmeType].push({ id: v.id, ...v.data() });
        });
      }
    })
  );

  res.json(cosmes);
});

app.post("/cosmes", async (req, res) => {
  const decodedToken = await isAuthenticated(req.token);
  if (decodedToken === null) {
    res.json({
      error: "認証ERROR"
    });
    return;
  }
  const uid = decodedToken.uid;
  if (
    req.body.type !== "makeupbase" &&
    req.body.type !== "foundation" &&
    req.body.type !== "facepowder" &&
    req.body.type !== "eyeshadow" &&
    req.body.type !== "eyeliner" &&
    req.body.type !== "mascara" &&
    req.body.type !== "eyebrow" &&
    req.body.type !== "cheek" &&
    req.body.type !== "lipstick" &&
    req.body.type !== "lipgloss"
  ) {
    res.json({
      error: "コスメのTYPEが見つかりませんでした"
    });
  }
  const usersRef = db
    .collection("users")
    .doc(uid)
    .collection("cosmes")
    .doc(req.body.type)
    .collection("data");
  const addRef = await usersRef.add(req.body.info);
  res.json({
    status: "ok!",
    id: addRef.id
  });
});

app.patch("/cosmes", async (req, res) => {
  const decodedToken = await isAuthenticated(req.token);
  if (decodedToken === null) {
    res.json({
      error: "認証ERROR"
    });
    return;
  }
  const uid = decodedToken.uid;
  if (
    req.body.type !== "makeupbase" &&
    req.body.type !== "foundation" &&
    req.body.type !== "facepowder" &&
    req.body.type !== "eyeshadow" &&
    req.body.type !== "eyeliner" &&
    req.body.type !== "mascara" &&
    req.body.type !== "eyebrow" &&
    req.body.type !== "cheek" &&
    req.body.type !== "lipstick" &&
    req.body.type !== "lipgloss"
  ) {
    res.json({
      error: "コスメのTYPEが見つかりませんでした"
    });
  }
  const usersRef = db
    .collection("users")
    .doc(uid)
    .collection("cosmes")
    .doc(req.body.type)
    .collection("data")
    .doc(req.body.info.id);
  const changeRef = await usersRef.set(req.body.info);
  res.json({
    status: "ok!",
    id: changeRef.id
  });
});

app.patch("/cosmes/order", async (req, res) => {
  const decodedToken = await isAuthenticated(req.token);
  const uid = decodedToken.uid;
  const orderRef = db
    .collection("users")
    .doc(uid)
    .collection("cosmes")
    .doc(req.body.type);
  await orderRef.set({ order: req.body.array });
  res.json({
    status: "ok!"
  });
});

app.delete("/cosmes", async (req, res) => {
  const decodedToken = await isAuthenticated(req.token);
  if (decodedToken === null) {
    res.json({
      error: "認証ERROR"
    });
    return;
  }
  const uid = decodedToken.uid;
  if (
    req.body.type !== "makeupbase" &&
    req.body.type !== "foundation" &&
    req.body.type !== "facepowder" &&
    req.body.type !== "eyeshadow" &&
    req.body.type !== "eyeliner" &&
    req.body.type !== "mascara" &&
    req.body.type !== "eyebrow" &&
    req.body.type !== "cheek" &&
    req.body.type !== "lipstick" &&
    req.body.type !== "lipgloss"
  ) {
    res.json({
      error: "コスメのTYPEが見つかりませんでした"
    });
  }
  const usersRef = db
    .collection("users")
    .doc(uid)
    .collection("cosmes")
    .doc(req.body.type)
    .collection("data")
    .doc(req.body.id);
  const deleteRef = await usersRef.delete();
  res.json({
    status: "ok!"
  });
});

module.exports.api = functions.region(REGION).https.onRequest(app);

process.on("unhandledRejection", console.dir);
