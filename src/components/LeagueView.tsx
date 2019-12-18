import * as React from "react";
import { Pane, Text, Heading } from "evergreen-ui";
import { useParams } from "react-router-dom";

interface ITeam {
  user_id: string;
  league_id: string;
  display_name: string;
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

  return (
    <Pane>
      {teams.map(team => {
        return (
          <Pane>
            <Heading>{team.metadata.team_name}</Heading>
            <Text>{team.display_name}</Text>
          </Pane>
        );
      })}
    </Pane>
  );
};
