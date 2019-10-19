var rp = require("request-promise-native");

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

async function scrapePosition(position) {
  const data = await rp(Pages[position]);
  const players = [];
  const tiers = data.trim().split("\n");
  for (let i = 0; i < tiers.length; i++) {
    const currentTier = tiers[i].match(/Tier ([0-9]+)\:/)[1];
    const playersInTier = tiers[i].replace(/(Tier [0-9]+\:)/, "").split(",");

    for (let j = 0; j < playersInTier.length; j++) {
      players.push({
        tier: currentTier,
        rank: players.length + 1,
        name: playersInTier[j].trim()
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

  console.log(JSON.stringify(collection));
}

getRankings();

// TODO save to file
// TODO firebase
