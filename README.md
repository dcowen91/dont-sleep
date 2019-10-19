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

## instructions

how to get team/league id:
mobile app -> "Team" -> Share -> copy to clipboard
