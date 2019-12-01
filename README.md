# dont-sleep

find highly rated available players for your sleeper.app league, using data from borischen.co

## Architecture plan

firebase webapp
-> pull borischen data from firestore
-> get sleeper league info from user
-> call cloud function to get sleeper league data (team rosters and lineup/scoring settings)
-> calculate best availalble players, optimal lineup by merging borischen/sleeper data

firestore
-> store borischen data

cloud function 1
-> write borischen data to firestore
-> trigger every x hours https://firebase.google.com/docs/functions/schedule-functions
cloud function 2
-> given user input (leagueid, team id), call sleeper API
-> get league data (team rosters, lineup/scoring settings)
-> call from app https://firebase.google.com/docs/functions/callable

## questions?

store sleeper data in firestore?
compute sleeper/borischen merge in cloud function?
how exactly to correlate players from two sources?

## old manual steps:

1. npm run get-tiers
2. npm run get-players
3. npm run fetch-rosters
4. npm run merge-players

## firebase info:

1. scrapePlayersSchedule (cloud function) runs every 12 hours to pull latest tiers into firestore
2. manual npm run get-players to pull nfl db into firebase- don't do that often
3.

## instructions

how to get team/league id:
mobile app -> "Team" -> Share -> copy to clipboard

## TODO

1. add typescript to scripts?
2. add more styling to app (player section)
3. add lastModifiedTime
4. add github link
5. add info on how to use
6. add error handling (league/userId)
