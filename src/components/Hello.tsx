import * as React from "react";
import {
  TextInputField,
  Pane,
  Heading,
  Text,
  Button,
  Strong,
  Table,
  IconButton
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

// TODO fix this to add fetchedOn
type SleeperData = { [pos: string]: Position };

const OrderedPostions = ["QB", "RBPPR", "WRPPR", "TEPPR", "DST"];

// const testData = require("../../dist/testdata.json");

export const Hello = () => {
  const [leagueId, setLeagueId] = React.useState(""); // 469392385332211712
  const [userId, setuserId] = React.useState(""); //  6;
  const [playerData, setPlayerData] = React.useState<SleeperData>({});
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
        <IconButton
          is="a"
          href="https://github.com/dcowen91/dont-sleep"
          icon="code"
          appearance="minimal"
        />
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
          label="roster id"
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
      <Pane
        display="flex"
        alignItems="flex-start"
        justifyContent="center"
        flexWrap="wrap"
      >
        {Object.keys(playerData).length > 1 &&
          OrderedPostions.map(position =>
            renderPositionCard(position, playerData)
          )}
        {playerData && playerData.fetchedOn && (
          <Text marginTop={10}>
            {"data last refreshed: " +
              new Date((playerData as any).fetchedOn).toLocaleString()}
          </Text>
        )}
      </Pane>
    </>
  );
};

function renderPositionCard(
  position: string,
  playerData: SleeperData
): JSX.Element {
  // handle user having no ranked players at a given position
  const lowestOwnedRank =
    playerData[position].owned.length > 0
      ? playerData[position].owned[playerData[position].owned.length - 1].rank
      : 99;
  return (
    <Pane
      display="flex"
      justifyContent="center"
      flexDirection="column"
      padding={8}
      margin={8}
      flexWrap="wrap"
      borderRadius={5}
      border
      elevation={1}
      flexBasis={250}
    >
      <Heading alignSelf={"center"}>{position.replace("PPR", "")}</Heading>
      {renderTableSection("Your Players", playerData[position].owned)}
      {renderTableSection(
        "Available Players",
        playerData[position].unowned,
        lowestOwnedRank
      )}
    </Pane>
  );
}

function renderTableSection(
  title: string,
  players: Player[],
  lowestOwnedRank?: number
): JSX.Element {
  return (
    <>
      <Strong marginTop={10} marginBottom={5}>
        {title}
      </Strong>
      <Table>
        <Table.Head>
          <Table.TextHeaderCell flexBasis={120}>{title}</Table.TextHeaderCell>
          <Table.TextHeaderCell>Rank</Table.TextHeaderCell>
          <Table.TextHeaderCell>Tier</Table.TextHeaderCell>
        </Table.Head>
        <Table.Body>
          {players.map(player => renderPlayer(player, lowestOwnedRank))}
        </Table.Body>
      </Table>
    </>
  );
}

function renderPlayer(player: Player, lowestOwnedRank?: number): JSX.Element {
  const intent =
    !!lowestOwnedRank && lowestOwnedRank > player.rank ? "success" : "none";

  return (
    <Table.Row intent={intent}>
      <Table.TextCell flexBasis={120}>{player.name}</Table.TextCell>
      <Table.TextCell>{player.rank}</Table.TextCell>
      <Table.TextCell>{player.tier}</Table.TextCell>
    </Table.Row>
  );
}
