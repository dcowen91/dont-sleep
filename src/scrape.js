const rp = require("request-promise-native");
const admin = require("firebase-admin");
const functions = require("firebase-functions");

admin.initializeApp(functions.config().firebase);

let db = admin.firestore();

// TODO support HALF-PPR, STANDARD
const Pages = {
  QB: "https://s3-us-west-1.amazonaws.com/fftiers/out/text_QB.txt",
  WRPPR: "https://s3-us-west-1.amazonaws.com/fftiers/out/text_WR-PPR.txt",
  TEPPR: "https://s3-us-west-1.amazonaws.com/fftiers/out/text_TE-PPR.txt",
  DST: "https://s3-us-west-1.amazonaws.com/fftiers/out/text_DST.txt",
  RBPPR: "https://s3-us-west-1.amazonaws.com/fftiers/out/text_RB-PPR.txt"
  // RB: "https://s3-us-west-1.amazonaws.com/fftiers/out/text_RB.txt",
  // "RB-HALF-PPR":"https://s3-us-west-1.amazonaws.com/fftiers/out/text_RB-HALF.txt"
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
  const data = await rp(Pages[position]);
  const players = [];
  const tiers = data.trim().split("\n");
  for (let i = 0; i < tiers.length; i++) {
    const currentTier = tiers[i].match(/Tier ([0-9]+)\:/)[1];
    const playersInTier = tiers[i].replace(/(Tier [0-9]+\:)/, "").split(",");

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
  return players;
}

async function getRankings() {
  const collection = {};
  for (const position of Object.keys(Pages)) {
    const players = await scrapePosition(position);
    collection[position] = players;
  }

  let docRef = db.collection("rankings").doc("tiers");

  docRef.set(collection);
}

getRankings();
