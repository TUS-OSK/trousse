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
  const cosmeOrder = [];
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

  const makeupRef = db
    .collection("users")
    .doc(uid)
    .collection("cosmes");
  const makeupdatalist = await makeupRef.get();

  const makeupbaseRef = db
    .collection("users")
    .doc(uid)
    .collection("cosmes")
    .doc("makeupbase")
    .collection("data");
  const makeupbasedatalist = await makeupbaseRef.get();
  const foundationRef = db
    .collection("users")
    .doc(uid)
    .collection("cosmes")
    .doc("foundation")
    .collection("data");
  const foundationdatalist = await foundationRef.get();
  const facepowderRef = db
    .collection("users")
    .doc(uid)
    .collection("cosmes")
    .doc("facepowder")
    .collection("data");
  const facepowderdatalist = await facepowderRef.get();
  const eyeshadowRef = db
    .collection("users")
    .doc(uid)
    .collection("cosmes")
    .doc("eyeshadow")
    .collection("data");
  const eyeshadowdatalist = await eyeshadowRef.get();
  const eyelinerRef = db
    .collection("users")
    .doc(uid)
    .collection("cosmes")
    .doc("eyeliner")
    .collection("data");
  const eyelinerdatalist = await eyelinerRef.get();
  const mascaraRef = db
    .collection("users")
    .doc(uid)
    .collection("cosmes")
    .doc("mascara")
    .collection("data");
  const mascaradatalist = await mascaraRef.get();
  const eyebrowRef = db
    .collection("users")
    .doc(uid)
    .collection("cosmes")
    .doc("eyebrow")
    .collection("data");
  const eyebrowdatalist = await eyebrowRef.get();
  const cheekRef = db
    .collection("users")
    .doc(uid)
    .collection("cosmes")
    .doc("cheek")
    .collection("data");
  const cheekdatalist = await cheekRef.get();
  const lipstickRef = db
    .collection("users")
    .doc(uid)
    .collection("cosmes")
    .doc("lipstick")
    .collection("data");
  const lipstickdatalist = await lipstickRef.get();
  const lipglossRef = db
    .collection("users")
    .doc(uid)
    .collection("cosmes")
    .doc("lipgloss")
    .collection("data");
  const lipglossdatalist = await lipglossRef.get();

  makeupdatalist.forEach(v => {
    cosmeOrder.push(v.data().order);
  });
  console.log(cosmeOrder);

  for (var t = 0; t < cosmeOrder.length; t++) {
    for (var j = 0; j <= cosmeOrder[t].length; j++) {
      makeupbasedatalist.forEach(v => {
        const i = v.id;
        if (cosmeOrder[t][j] === i) {
          cosmes.makeupbase.push({ id: i, ...v.data() });
        }
      });
    }
    for (j = 0; j <= cosmeOrder[t].length; j++) {
      foundationdatalist.forEach(v => {
        const i = v.id;
        if (cosmeOrder[t][j] === i) {
          cosmes.foundation.push({ id: i, ...v.data() });
        }
      });
    }
    for (j = 0; j <= cosmeOrder[t].length; j++) {
      facepowderdatalist.forEach(v => {
        const i = v.id;
        if (cosmeOrder[t][j] === i) {
          cosmes.facepowder.push({ id: i, ...v.data() });
        }
      });
    }
    for (j = 0; j <= cosmeOrder[t].length; j++) {
      eyeshadowdatalist.forEach(v => {
        const i = v.id;
        if (cosmeOrder[t][j] === i) {
          cosmes.eyeshadow.push({ id: i, ...v.data() });
        }
      });
    }
    for (j = 0; j <= cosmeOrder[t].length; j++) {
      eyelinerdatalist.forEach(v => {
        const i = v.id;
        if (cosmeOrder[t][j] === i) {
          cosmes.eyeliner.push({ id: i, ...v.data() });
        }
      });
    }
    for (j = 0; j <= cosmeOrder[t].length; j++) {
      mascaradatalist.forEach(v => {
        const i = v.id;
        if (cosmeOrder[t][j] === i) {
          cosmes.mascara.push({ id: i, ...v.data() });
        }
      });
    }
    for (j = 0; j <= cosmeOrder[t].length; j++) {
      eyebrowdatalist.forEach(v => {
        const i = v.id;
        if (cosmeOrder[t][j] === i) {
          cosmes.eyebrow.push({ id: i, ...v.data() });
        }
      });
    }
    for (j = 0; j <= cosmeOrder[t].length; j++) {
      cheekdatalist.forEach(v => {
        const i = v.id;
        if (cosmeOrder[t][j] === i) {
          cosmes.cheek.push({ id: i, ...v.data() });
        }
      });
    }
    for (j = 0; j <= cosmeOrder[t].length; j++) {
      lipstickdatalist.forEach(v => {
        const i = v.id;
        if (cosmeOrder[t][j] === i) {
          cosmes.lipstick.push({ id: i, ...v.data() });
        }
      });
    }
    for (j = 0; j <= cosmeOrder[t].length; j++) {
      lipglossdatalist.forEach(v => {
        const i = v.id;
        if (cosmeOrder[t][j] === i) {
          cosmes.lipgloss.push({ id: i, ...v.data() });
        }
      });
    }
  }
  console.log(cosmes.makeupbase);
  console.log(cosmes.lipgloss);

  // makeupbasedatalist.forEach(v => {
  //   cosmes.makeupbase.push({ id: v.id, ...v.data() });
  // });
  // foundationdatalist.forEach(v => {
  //   cosmes.foundation.push({ id: v.id, ...v.data() });
  // });
  // facepowderdatalist.forEach(v => {
  //   cosmes.facepowder.push({ id: v.id, ...v.data() });
  // });
  // eyeshadowdatalist.forEach(v => {
  //   cosmes.eyeshadow.push({ id: v.id, ...v.data() });
  // });
  // eyelinerdatalist.forEach(v => {
  //   cosmes.eyeliner.push({ id: v.id, ...v.data() });
  // });
  // mascaradatalist.forEach(v => {
  //   cosmes.mascara.push({ id: v.id, ...v.data() });
  // });
  // eyebrowdatalist.forEach(v => {
  //   cosmes.eyebrow.push({ id: v.id, ...v.data() });
  // });
  // cheekdatalist.forEach(v => {
  //   cosmes.cheek.push({ id: v.id, ...v.data() });
  // });
  // lipstickdatalist.forEach(v => {
  //   cosmes.lipstick.push({ id: v.id, ...v.data() });
  // });
  // lipglossdatalist.forEach(v => {
  //   cosmes.lipgloss.push({ id: v.id, ...v.data() });
  // });

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
