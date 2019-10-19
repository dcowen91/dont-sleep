var rp = require("request-promise-native");

// TODO this will be passed in as user input from the app
const league_id = "469392385332211712";
// TODO get this from "All users" call
const user_id = "";

// get league settings (rosters and scoring)
// rp(`https://api.sleeper.app/v1/league/${league_id}`).then(data => {
//   console.log(data);
// });

// get all team rosters
// rp(`https://api.sleeper.app/v1/league/${league_id}/rosters`).then(console.log);

// get all user details
//rp(`https://api.sleeper.app/v1/league/${league_id}/users`).then(console.log);

// get specifc user details
// rp(` https://api.sleeper.app/v1/user/${user_id}`).then(console.log);

// get all players in NFL (call infrequently, store in firebase)
// p(`https://api.sleeper.app/v1/players/nfl`).then(console.log);
