import * as React from "react";
import { Pane, Text, Heading, Card, Image, Avatar } from "evergreen-ui";
import { useParams } from "react-router-dom";

interface ITeam {
  user_id: string;
  league_id: string;
  display_name: string;
  avatar?: string;
  metadata: {
    team_name: string;
  };
}

export const LeagueView = () => {
  const { leagueId } = useParams();
  const [teams, setTeamsData] = React.useState<ITeam[]>([]);

  React.useEffect(() => {
    const url = `https://api.sleeper.app/v1/league/${leagueId}/users`;
    fetch(url)
      .then(res => res.json())
      .then(data => setTeamsData(data));
  }, [leagueId]);

  // TODO fix how this renders
  return (
    <Pane
      marginTop={30}
      display="flex"
      alignItems="flex-start"
      justifyContent="center"
      flexWrap="wrap"
    >
      {teams.map(team => {
        return (
          <Card
            key={team.user_id}
            display="flex"
            justifyContent="start"
            alignItems="start"
            flexDirection="column"
            padding={8}
            margin={8}
            flexWrap="wrap"
            background="tint2"
            borderRadius={5}
            border
            elevation={1}
            width={200}
            minHeight={100}
          >
            <Heading>{team.display_name}</Heading>
            <Text>{team.metadata.team_name}</Text>
            {team.avatar ? (
              <Image
                height={30}
                width={30}
                borderRadius="50%"
                backgroundSize="contain"
                src={`https://sleepercdn.com/avatars/thumbs/${team.avatar}`}
              />
            ) : (
              <Avatar
                isSolid
                name={team.display_name}
                color="purple"
                size={30}
              />
            )}
          </Card>
        );
      })}
    </Pane>
  );
};
