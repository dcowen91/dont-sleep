const admin = require("firebase-admin");

let serviceAccount = require("../dist/dont-sleep-92c89-a39a2b742252.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

let db = admin.firestore();

const docRef = db.collection("sleeperData");
const positionFriendlyName = "DST";
const searchName = "Patriots";

return docRef
  .where("last_name", "==", searchName)
  .get()
  .then(snapshot => {
    if (snapshot.empty) {
      console.log(`NO MATCH ${positionFriendlyName}:${searchName}`);
      return null;
    } else if (snapshot.size !== 1) {
      console.log(
        `${snapshot.size} MATCHES ${positionFriendlyName}:${searchName}`
      );
    } else {
      console.log(`FOUND MATCH ${positionFriendlyName}:${searchName}`);
      console.log(snapshot.docs[0].data());
    }
  });
