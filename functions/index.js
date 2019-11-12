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

  const makeupbaseRef = db
    .collection("users")
    .doc(uid)
    .collection("cosmes")
    .doc("makeupbase");
  const makeupbaseOrderList = await makeupbaseRef.get();
  const makeupbasedatalist = await makeupbaseRef.collection("data").get();
  const foundationRef = db
    .collection("users")
    .doc(uid)
    .collection("cosmes")
    .doc("foundation");
  const foundationOrderList = await foundationRef.get();
  const foundationdatalist = await foundationRef.collection("data").get();
  const facepowderRef = db
    .collection("users")
    .doc(uid)
    .collection("cosmes")
    .doc("facepowder");
  const facepowderOrderList = await facepowderRef.get();
  const facepowderdatalist = await facepowderRef.collection("data").get();
  const eyeshadowRef = db
    .collection("users")
    .doc(uid)
    .collection("cosmes")
    .doc("eyeshadow");
  const eyeshadowOrderList = await eyeshadowRef.get();
  const eyeshadowdatalist = await eyeshadowRef.collection("data").get();
  const eyelinerRef = db
    .collection("users")
    .doc(uid)
    .collection("cosmes")
    .doc("eyeliner");
  const eyelinerOrderList = await eyelinerRef.get();
  const eyelinerdatalist = await eyelinerRef.collection("data").get();
  const mascaraRef = db
    .collection("users")
    .doc(uid)
    .collection("cosmes")
    .doc("mascara");
  const mascaraOrderList = await mascaraRef.get();
  const mascaradatalist = await mascaraRef.collection("data").get();
  const eyebrowRef = db
    .collection("users")
    .doc(uid)
    .collection("cosmes")
    .doc("eyebrow");
  const eyebrowOrderList = await eyebrowRef.get();
  const eyebrowdatalist = await eyebrowRef.collection("data").get();
  const cheekRef = db
    .collection("users")
    .doc(uid)
    .collection("cosmes")
    .doc("cheek");
  const cheekOrderList = await cheekRef.get();
  const cheekdatalist = await cheekRef.collection("data").get();
  const lipstickRef = db
    .collection("users")
    .doc(uid)
    .collection("cosmes")
    .doc("lipstick");
  const lipstickOrderList = await lipstickRef.get();
  const lipstickdatalist = await lipstickRef.collection("data").get();
  const lipglossRef = db
    .collection("users")
    .doc(uid)
    .collection("cosmes")
    .doc("lipgloss");
  const lipglossOrderList = await lipglossRef.get();
  const lipglossdatalist = await lipglossRef.collection("data").get();

  if (makeupbaseOrderList.data() !== undefined) {
    for (var i = 0; i <= makeupbaseOrderList.data().order.length; i++) {
      makeupbasedatalist.forEach(v => {
        if (makeupbaseOrderList.data().order[i] === v.id) {
          cosmes.makeupbase.push({ id: v.id, ...v.data() });
        }
      });
    }
  }
  if (foundationOrderList.data() !== undefined) {
    for (i = 0; i <= foundationOrderList.data().order.length; i++) {
      foundationdatalist.forEach(v => {
        if (foundationOrderList.data().order[i] === v.id) {
          cosmes.foundation.push({ id: v.id, ...v.data() });
        }
      });
    }
  }
  if (facepowderOrderList.data() !== undefined) {
    for (i = 0; i <= facepowderOrderList.data().order.length; i++) {
      facepowderdatalist.forEach(v => {
        if (facepowderOrderList.data().order[i] === v.id) {
          cosmes.facepowder.push({ id: v.id, ...v.data() });
        }
      });
    }
  }
  if (eyeshadowOrderList.data() !== undefined) {
    for (i = 0; i <= eyeshadowOrderList.data().order.length; i++) {
      eyeshadowdatalist.forEach(v => {
        if (eyeshadowOrderList.data().order[i] === v.id) {
          cosmes.eyeshadow.push({ id: v.id, ...v.data() });
        }
      });
    }
  }
  if (eyelinerOrderList.data() !== undefined) {
    for (i = 0; i <= eyelinerOrderList.data().order.length; i++) {
      eyelinerdatalist.forEach(v => {
        if (eyelinerOrderList.data().order[i] === v.id) {
          cosmes.eyeliner.push({ id: v.id, ...v.data() });
        }
      });
    }
  }
  if (mascaraOrderList.data() !== undefined) {
    for (i = 0; i <= mascaraOrderList.data().order.length; i++) {
      mascaradatalist.forEach(v => {
        if (mascaraOrderList.data().order[i] === v.id) {
          cosmes.mascara.push({ id: v.id, ...v.data() });
        }
      });
    }
  }
  if (eyebrowOrderList.data() !== undefined) {
    for (i = 0; i <= eyebrowOrderList.data().order.length; i++) {
      eyebrowdatalist.forEach(v => {
        if (eyebrowOrderList.data().order[i] === v.id) {
          cosmes.eyebrow.push({ id: v.id, ...v.data() });
        }
      });
    }
  }
  if (cheekOrderList.data() !== undefined) {
    for (i = 0; i <= cheekOrderList.data().order.length; i++) {
      cheekdatalist.forEach(v => {
        if (cheekOrderList.data().order[i] === v.id) {
          cosmes.cheek.push({ id: v.id, ...v.data() });
        }
      });
    }
  }
  if (lipstickOrderList.data() !== undefined) {
    for (i = 0; i <= lipstickOrderList.data().order.length; i++) {
      lipstickdatalist.forEach(v => {
        if (lipstickOrderList.data().order[i] === v.id) {
          cosmes.lipstick.push({ id: v.id, ...v.data() });
        }
      });
    }
  }
  if (lipglossOrderList.data() !== undefined) {
    for (i = 0; i <= lipglossOrderList.data().order.length; i++) {
      lipglossdatalist.forEach(v => {
        if (lipglossOrderList.data().order[i] === v.id) {
          cosmes.lipgloss.push({ id: v.id, ...v.data() });
        }
      });
    }
  }

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
  const addReq = await usersRef.add(req.body.info);
  res.json({
    status: "ok!",
    id: addReq.id
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
