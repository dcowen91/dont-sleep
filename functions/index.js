const functions = require("firebase-functions");
const admin = require("firebase-admin");
const rp = require("request-promise-native");

admin.initializeApp();

let db = admin.firestore();

// TODO support HALF-PPR, STANDARD
const Pages = {
  QB: "https://s3-us-west-1.amazonaws.com/fftiers/out/text_QB.txt",
  WRPPR: "https://s3-us-west-1.amazonaws.com/fftiers/out/text_WR-PPR.txt",
  TEPPR: "https://s3-us-west-1.amazonaws.com/fftiers/out/text_TE-PPR.txt",
  DST: "https://s3-us-west-1.amazonaws.com/fftiers/out/text_DST.txt",
  RBPPR: "https://s3-us-west-1.amazonaws.com/fftiers/out/text_RB-PPR.txt"
};

/**
 * Strip out all non-letters
 */
function getSeachName(name) {
  return name.replace(/['.-\s]/g, "");
}

/**
 * Given "New England Patriots", return "Patriots"
 */
function getTeamName(name) {
  const words = name.split(" ");
  return words[words.length - 1];
}

async function scrapePosition(position) {
  console.log("REQUESTING " + position);
  const data = await rp(Pages[position]);
  console.log("PARSING" + position);
  const players = [];
  const tiers = data.trim().split("\n");
  for (let i = 0; i < tiers.length; i++) {
    const currentTier = tiers[i].match(/Tier ([0-9]+):/)[1];
    const playersInTier = tiers[i].replace(/(Tier [0-9]+:)/, "").split(",");

    for (let j = 0; j < playersInTier.length; j++) {
      const name = playersInTier[j].trim();
      players.push({
        tier: currentTier,
        rank: players.length + 1,
        name: name,
        searchName: position === "DST" ? getTeamName(name) : getSeachName(name)
      });
    }
  }

  console.log("RETURNING " + players.length + "for " + position);
  return players;
}

async function getRankings() {
  console.log("STARTING");
  const collection = {};
  for (const position of Object.keys(Pages)) {
    console.log("FETCHING " + position);
    const players = await scrapePosition(position);
    collection[position] = players;
    console.log(`WROTE:  ${position} (${players.length} count)`);
  }

  console.log("WRITING TIMESTAMP");
  collection["fetchedOn"] = new Date().toString();

  console.log("SETTING THE VALUE");

  let docRef = db.collection("rankings").doc("tiers");
  return docRef.set(collection).then(response => {
    console.log("WROTE TO DB");
    console.dir(response);

    return "SUCCESSFUL OPERATION";
  });
}

exports.scrapePlayersSchedule = functions.pubsub
  .schedule("every 12 hours")
  .onRun(context => {
    console.log("STARTING TO RUN");
    console.log("CONTEXT:");
    console.dir(context);
    return getRankings()
      .then(res => {
        console.log("SUCCESSFULLY RAN");
        return console.log(res);
      })
      .catch(err => {
        console.log("ERROR CAUGHT");
        return console.error(err);
      });
  });
