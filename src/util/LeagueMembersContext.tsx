import * as React from "react";

interface ITeam {
  user_id: string;
  league_id: string;
  display_name: string;
  avatar: string | null;
  metadata: {
    team_name?: string;
  };
}

interface ILeagueMembersContext {
  teams: ITeam[];
  setTeams: (teams: ITeam[]) => void;
}

const EmptyLeagueMembersContext: ILeagueMembersContext = {
  teams: [],
  setTeams: () => {}
};

const LeagueMembersContext = React.createContext(EmptyLeagueMembersContext);

export const LeagueMembersProvider = ({
  children
}: React.PropsWithChildren<{}>) => {
  // TODO fix double request issue - move this higher?
  const [teams, setTeams] = React.useState<ITeam[]>([]);

  return (
    <LeagueMembersContext.Provider
      value={{
        teams: teams,
        setTeams: setTeams
      }}
    >
      {children}
    </LeagueMembersContext.Provider>
  );
};

export const useLeagueMembers: (leagueId?: string) => ITeam[] = (
  leagueId?: string
) => {
  const context = React.useContext(LeagueMembersContext);

  React.useEffect(() => {
    if (leagueId) {
      const url = `https://api.sleeper.app/v1/league/${leagueId}/users`;
      fetch(url)
        .then(res => res.json())
        .then(data => context.setTeams(data));
    }
  }, [leagueId]);

  return context.teams;
};
