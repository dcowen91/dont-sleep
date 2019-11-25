var rp = require("request-promise-native");
const admin = require("firebase-admin");

let serviceAccount = require("../dist/dont-sleep-92c89-a39a2b742252.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

let db = admin.firestore();

const ValidPositions = ["QB", "RB", "TE", "WR", "DEF"];

// TODO this will be passed in as user input from the app
// const league_id = "469392385332211712";
// TODO get this from "All users" call
// const user_id = "";

// get all players in NFL (call infrequently, store in firebase)
console.log("FETCHING");
rp(`https://api.sleeper.app/v1/players/nfl`).then(data => {
  const playerData = JSON.parse(data);
  const playerIds = Object.keys(playerData);
  const validPlayerIds = playerIds.filter(playerId => {
    return ValidPositions.includes(playerData[playerId].position);
  });

  console.log("VALID PLAYERS: " + validPlayerIds.length);

  const collection = db.collection("sleeperData");

  validPlayerIds.forEach(playerId => {
    const docRef = collection.doc(playerId);

    docRef.set(playerData[playerId]).then(res => {
      console.log("WROTE " + playerId);
    });
  });
});
