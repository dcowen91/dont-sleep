import * as React from "react";
import { Pane, Text, Heading, Strong, Table } from "evergreen-ui";
import { useParams } from "react-router-dom";
import firebase from "./../util/firebase";

const OrderedPostions = ["QB", "RBPPR", "WRPPR", "TEPPR", "DST"];

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

interface SleeperTiers {
  QB: Position;
  RBPPR: Position;
  WRPPR: Position;
  TEPPR: Position;
  DST: Position;
  fetchedOn: string;
}

const TimeStamp = (props: { timeStamp: string }) => {
  const formattedTimeStamp = new Date(props.timeStamp).toLocaleString();
  return (
    <Pane
      marginTop={30}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Text size={300} color="muted">
        {`data last refreshed: ${formattedTimeStamp}`}
      </Text>
    </Pane>
  );
};

export const TeamView = () => {
  const { leagueId, teamId } = useParams();
  const [playerData, setPlayerData] = React.useState<
    SleeperTiers | undefined
  >();

  React.useEffect(() => {
    var getRosterInfo = firebase.functions().httpsCallable("getRosterInfo");

    getRosterInfo({
      leagueId: leagueId,
      userId: teamId
    }).then(result => {
      setPlayerData(result.data);
    });
  }, [leagueId, teamId]);

  return (
    <>
      <Pane
        display="flex"
        alignItems="flex-start"
        justifyContent="center"
        flexWrap="wrap"
      >
        {playerData &&
          OrderedPostions.map(position =>
            renderPositionCard(position as keyof SleeperTiers, playerData)
          )}
      </Pane>
      {playerData && <TimeStamp timeStamp={playerData.fetchedOn} />}
    </>
  );
};

function renderPositionCard(
  position: keyof SleeperTiers,
  playerData: SleeperTiers
): JSX.Element {
  const positionData = playerData[position] as Position;
  // handle user having no ranked players at a given position
  const lowestOwnedRank =
    positionData.owned.length > 0
      ? positionData.owned[positionData.owned.length - 1].rank
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
      {renderTableSection("Your Players", positionData.owned)}
      {renderTableSection(
        "Available Players",
        positionData.unowned,
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
          <Table.TextHeaderCell flexBasis={120}>Name</Table.TextHeaderCell>
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
