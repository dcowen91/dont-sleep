import * as React from "react";
import { Pane, Text, Heading, Card, Image, Avatar } from "evergreen-ui";
import { useParams, Link } from "react-router-dom";

interface ITeam {
  user_id: string;
  league_id: string;
  display_name: string;
  avatar: string | null;
  metadata: {
    team_name?: string;
  };
}

const TeamImage = (props: { imageUrl: string | null; teamName: string }) => {
  return props.imageUrl ? (
    <Image
      height={30}
      width={30}
      marginRight={16}
      borderRadius="50%"
      backgroundSize="contain"
      src={`https://sleepercdn.com/avatars/thumbs/${props.imageUrl}`}
    />
  ) : (
    <Avatar
      isSolid
      marginRight={16}
      name={props.teamName}
      color="purple"
      size={30}
    />
  );
};

export const LeagueView = () => {
  const { leagueId } = useParams();
  const [teams, setTeamsData] = React.useState<ITeam[]>([]);

  React.useEffect(() => {
    const url = `https://api.sleeper.app/v1/league/${leagueId}/users`;
    fetch(url)
      .then(res => res.json())
      .then(data => setTeamsData(data));
  }, [leagueId]);

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
          <Link
            key={team.user_id}
            to={`/${leagueId}/${team.user_id}`}
            style={{ textDecoration: "unset" }}
          >
            <Card
              display="flex"
              justifyContent="start"
              alignItems="center"
              flexDirection="row"
              padding={8}
              margin={8}
              borderRadius={5}
              border
              elevation={1}
              width={200}
              minHeight={80}
            >
              <TeamImage teamName={team.display_name} imageUrl={team.avatar} />
              <Pane>
                <Heading>{team.display_name}</Heading>
                <Text size={300}>{team.metadata.team_name}</Text>
              </Pane>
            </Card>
          </Link>
        );
      })}
    </Pane>
  );
};
