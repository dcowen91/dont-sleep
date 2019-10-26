// TODO these will both be in DB
const tiers = require("../dist/tiers");
const playerIds = require("../dist/players");
const rosterData = require("../dist/roster-data");

const playerIdArray = Object.values(playerIds);

for (let position in tiers) {
  const players = tiers[position];

  players.forEach((player, index) => {
    const playerMatch = playerIdArray.find(searchPlayer => {
      if (!!searchPlayer.search_full_name) {
        return (
          searchPlayer.search_full_name.toLowerCase() ===
          player.searchName.toLowerCase()
        );
      }
      return (
        searchPlayer.last_name.toLowerCase() === player.searchName.toLowerCase()
      );
    });

    if (playerMatch) {
      tiers[position][index].playerId = playerMatch.player_id;
      if (rosterData.userOwnedPlayers.includes(playerMatch.player_id)) {
        tiers[position][index].ownership = "USER";
      } else if (rosterData.ownedPlayers.includes(playerMatch.player_id)) {
        tiers[position][index].ownership = "OWNED";
      } else {
        tiers[position][index].ownership = "UNOWNED";
      }
    } else {
      tiers[position][index].playerId = "MISS";
    }
  });
}

console.log(JSON.stringify(tiers));
