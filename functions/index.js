const functions = require("firebase-functions");
const admin = require("firebase-admin");
const rp = require("request-promise-native");
const cors = require("cors")({ origin: true });

admin.initializeApp();
let db = admin.firestore();

// TODO support STANDARD
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
  return name.replace(/['.-\s]/g, "").toLowerCase();
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
  const isDEF = position === "DST";
  const positionFriendlyName = isDEF ? "DEF" : position.replace("PPR", "");

  const docRef = db.collection("sleeperData");
  console.log("SCRAPING " + positionFriendlyName);

  for (let i = 0; i < tiers.length; i++) {
    const currentTier = tiers[i].match(/Tier ([0-9]+):/)[1];
    const playersInTier = tiers[i].replace(/(Tier [0-9]+:)/, "").split(",");

    for (let j = 0; j < playersInTier.length; j++) {
      const name = playersInTier[j].trim();

      const searchName = isDEF ? getTeamName(name) : getSeachName(name);
      const searchField = isDEF ? "last_name" : "search_full_name";
      const queryResult = await docRef
        .where(searchField, "==", searchName)
        .where("position", "==", positionFriendlyName)
        .get()
        .then(snapshot => {
          if (snapshot.size !== 1) {
            console.log(
              `ERROR: ${snapshot.size} MATCHES ${positionFriendlyName}:${searchName}`
            );
            return null;
          } else {
            return snapshot.docs[0].data();
          }
        });

      const playerId = queryResult ? queryResult.player_id : "-1";

      players.push({
        tier: currentTier,
        rank: players.length + 1,
        name: name,
        searchName: searchName,
        playerId: playerId
      });
    }
  }

  return players;
}

async function getRankings() {
  console.log("STARTING GETRANKINGS");
  const collection = {};
  for (const position of Object.keys(Pages)) {
    const players = await scrapePosition(position);
    collection[position] = players;
    console.log(`WROTE:  ${position} (${players.length} count)`);
  }
  collection["fetchedOn"] = new Date().toString();

  console.log("WRITING TO DB");

  let docRef = db.collection("rankings").doc("tiers");
  return docRef.set(collection).then(() => {
    return console.log("WROTE TO DB");
  });
}

async function getRosterInfo(leagueId, userId) {
  const data = await rp(
    `https://api.sleeper.app/v1/league/${leagueId}/rosters`
  );
  var teams = JSON.parse(data);

  const userOwnedPlayers = teams.find(team => team.roster_id === Number(userId))
    .players;

  const allOwnedPlayers = teams.map(team => team.players);
  var merged = [].concat.apply([], allOwnedPlayers).sort();

  console.log("reading tiers from db");

  const tiers = await db
    .collection("rankings")
    .doc("tiers")
    .get()
    .then(snapshot => snapshot.data());

  const output = {};

  for (const position of Object.keys(Pages)) {
    const players = tiers[position];
    console.log(`filtering: ${position} ( ${players.length} length)`);
    const owned = players.filter(player =>
      userOwnedPlayers.includes(player.playerId)
    );
    // TODO add unranked but owned players

    const unowned = players.filter(player => !merged.includes(player.playerId));

    output[position] = { owned, unowned };
  }

  // second pass- add any players who are unranked
  // for (const player of userOwnedPlayers) {
  // }

  output["fetchedOn"] = tiers.fetchedOn;

  return output;
}

exports.scrapePlayersSchedule = functions.pubsub
  .schedule("every 12 hours")
  .onRun(_context => {
    console.log("STARTING TO RUN");
    return getRankings()
      .then(() => {
        return console.log("SUCCESSFULLY RAN");
      })
      .catch(err => {
        console.log("ERROR CAUGHT");
        return console.error(err);
      });
  });

exports.fetchRosters = functions.https.onRequest(async (req, res) => {
  // https://us-central1-dont-sleep-92c89.cloudfunctions.net/fetchRosters?leagueId=469392385332211712&userId=470018338567745536
  return cors(req, res, async () => {
    const leagueId = req.query.leagueId;
    const userId = req.query.userId;

    console.log(`FETCHROSTERS got request for: ${leagueId}.${userId}`);

    const response = await getRosterInfo(leagueId, userId);

    res.status(200).send(response);
  });
});
