// TODO this is temp, will be replaced by app. just a POC of output
const data = require("../dist/merged");

// TODO add chalk
for (let position in data) {
  console.log(position);

  const players = data[position];
  const owned = players.filter(player => player.ownership === "USER");
  const unowned = players.filter(player => player.ownership === "UNOWNED");

  console.log("You own:");
  owned.forEach(player => {
    console.log(`Tier: ${player.tier}, Rank ${player.rank}: ${player.name}`);
  });

  console.log("Available:");
  unowned.forEach(player => {
    console.log(`Tier: ${player.tier}, Rank ${player.rank}: ${player.name}`);
  });

  // const players = tiers[position];
}
