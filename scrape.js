const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({ headless: false, slowMo: 250 });
  const page = await browser.newPage();

  // TODO fetch other positions
  await page.goto("https://s3-us-west-1.amazonaws.com/fftiers/out/text_QB.txt");

  const results = await page.evaluate(() => {
    const players = [];

    var allData = document.getElementsByTagName("pre")[0].innerText;
    var tiers = allData.trim().split("\n");

    for (let i = 0; i < tiers.length; i++) {
      const currentTier = tiers[i].match(/Tier ([0-9])\:/)[1];
      const playersInTier = tiers[i].replace(/(Tier [0-9]\:)/, "").split(",");

      for (let j = 0; j < playersInTier.length; j++) {
        players.push({
          tier: currentTier,
          rank: players.length + 1,
          name: playersInTier[j].trim()
        });
      }
    }

    return players;
  });

  console.log(JSON.stringify({ results: results }));

  // TODO save to file
  // TODO firebase

  await browser.close();
})();
