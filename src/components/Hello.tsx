import * as React from "react";
import {
  TextInputField,
  Pane,
  Heading,
  Text,
  Button,
  Card
} from "evergreen-ui";

interface Player {
  rank: number;
  playerId: string;
  searchName: string;
  tier: string;
  name: string;
}

interface Position {
  owned: Player[];
  unowned: Player[];
}

type SleeperData = { [pos: string]: Position };

export const Hello = () => {
  const [leagueId, setLeagueId] = React.useState(""); // 469392385332211712
  const [userId, setuserId] = React.useState(""); //  470018338567745536;
  const [playerData, setPlayerData] = React.useState<SleeperData>({});
  // setPlayerData(require("../../dist/testdata.json"))
  return (
    <>
      <Pane
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <Heading>Don't sleep</Heading>
        <Text>A tool to help power up your fantasy football teams</Text>
      </Pane>
      <Pane
        display="flex"
        alignItems="center"
        justifyContent="center"
        margin={15}
      >
        <TextInputField
          marginRight={15}
          label="league id"
          value={leagueId}
          onChange={(e: any) => {
            setLeagueId(e.target.value);
          }}
        />
        <TextInputField
          marginRight={15}
          label="user id"
          value={userId}
          onChange={(e: any) => {
            setuserId(e.target.value);
          }}
        />
        <Button
          appearance="primary"
          onClick={() => {
            console.log("CLICKED");
            if (leagueId && userId) {
              const url = `https://us-central1-dont-sleep-92c89.cloudfunctions.net/fetchRosters?leagueId=${leagueId}&userId=${userId}`;
              fetch(url)
                .then(res => res.json())
                .then(data => setPlayerData(data));
            }
          }}
        >
          Go!
        </Button>
      </Pane>
      {Object.keys(playerData).length > 1 && (
        <Card>
          <Heading>Tiers</Heading>
          {Object.keys(playerData).map(position => {
            return (
              <>
                <Heading>{position}</Heading>
                <Text>Your Players</Text>
                {playerData[position].owned.map(renderPlayer)}
                <Text>Available Players</Text>
                {playerData[position].unowned.map(renderPlayer)}
              </>
            );
          })}
        </Card>
      )}
    </>
  );
};

function renderPlayer(player: Player): JSX.Element {
  return (
    <Card>
      <Text>{player.name}</Text>
      <Text>{"Rank: " + player.rank}</Text>
      <Text>{"Tier: " + player.tier}</Text>
    </Card>
  );
}
