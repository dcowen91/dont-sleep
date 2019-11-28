const admin = require("firebase-admin");

let serviceAccount = require("../dist/dont-sleep-92c89-a39a2b742252.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

//test file to check firebase/firestore functionality in node

let db = admin.firestore();

const docRef = db.collection("sleeperData");
const positionFriendlyName = "WR";
const searchName = "mikewilliams";

return docRef
  .where("search_full_name", "==", searchName)
  .where("position", "==", positionFriendlyName)
  .get()
  .then(snapshot => {
    if (snapshot.size !== 1) {
      console.log(
        `${snapshot.size} MATCHES ${positionFriendlyName}:${searchName}`
      );
      for (let i = 0; i < snapshot.size; i++) {
        console.log(snapshot.docs[i].data());
      }
    } else {
      console.log(`FOUND MATCH ${positionFriendlyName}:${searchName}`);
      console.log(snapshot.docs[0].data());
    }
  });
