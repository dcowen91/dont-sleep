// TODO these will both be in DB
const tiers = require("../dist/tiers");
const playerIds = require("../dist/players");

const playerIdArray = Object.values(playerIds);

const output = {};

for (let position in tiers) {
  //   console.log(position);
  const players = tiers[position];

  // TODO clean this up and fix for DST
  players.forEach(player => {
    const playerMatch = playerIdArray.find(
      searchPlayer =>
        searchPlayer.search_full_name.toLowerCase() ===
        player.searchName.toLowerCase()
    );

    console.log(
      `${player.searchName}: ${playerMatch && playerMatch.player_id}`
    );
  });
}
