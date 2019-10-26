// TODO integrate w. fetch-sleeper.js
var rp = require("request-promise-native");
const league_id = "469392385332211712";
const owner_id = "470018338567745536";

rp(`https://api.sleeper.app/v1/league/${league_id}/rosters`).then(data => {
  var teams = JSON.parse(data);

  const userOwnedPlayers = teams.find(team => team.owner_id === owner_id)
    .players;

  const allOwnedPlayers = teams.map(team => team.players);
  var merged = [].concat.apply([], allOwnedPlayers).sort();

  const output = { userOwnedPlayers: userOwnedPlayers, ownedPlayers: merged };
  console.log(JSON.stringify(output));
});
