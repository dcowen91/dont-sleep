import * as React from "react";
import firebase from "../util/firebase";
import { useRoutes } from "../util/Hooks";

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

interface ISleeperTiers {
  QB: Position;
  RBPPR: Position;
  WRPPR: Position;
  TEPPR: Position;
  DST: Position;
  fetchedOn: string;
}

interface ITeam {
  user_id: string;
  league_id: string;
  display_name: string;
  avatar: string | null;
  metadata: {
    team_name?: string;
  };
}

interface ILeagueDetails {
  scoring_settings: { rec: number };
  roster_positions: string[];
  name: string;
  league_id: string;
  avatar: string;
}

interface IDataStoreContext {
  teams: ITeam[];
  rankings?: ISleeperTiers;
  leagueDetails?: ILeagueDetails;
}

const DataStoreContext = React.createContext<IDataStoreContext>({
  teams: []
});

export const DataStore = ({ children }: React.PropsWithChildren<{}>) => {
  const { leagueId, teamId } = useRoutes();

  const [teams, setTeams] = React.useState<ITeam[]>([]);
  const [rankings, setRankings] = React.useState<ISleeperTiers | undefined>();
  const [leagueDetails, setLeagueDetails] = React.useState<
    ILeagueDetails | undefined
  >();

  React.useEffect(() => {
    if (teamId) {
      var getRosterInfo = firebase.functions().httpsCallable("getRosterInfo");

      getRosterInfo({
        leagueId: leagueId,
        userId: teamId
      }).then(result => {
        setRankings(result.data);
      });
    }
  }, [leagueId, teamId]);

  React.useEffect(() => {
    if (leagueId) {
      const url = `https://api.sleeper.app/v1/league/${leagueId}/users`;
      fetch(url)
        .then(res => res.json())
        .then(data => setTeams(data));
    }
  }, [leagueId]);

  React.useEffect(() => {
    if (leagueId) {
      const url = `https://api.sleeper.app/v1/league/${leagueId}`;
      fetch(url)
        .then(res => res.json())
        .then(data => setLeagueDetails(data));
    }
  }, [leagueId]);

  return (
    <DataStoreContext.Provider
      value={{ teams: teams, leagueDetails: leagueDetails, rankings: rankings }}
    >
      {children}
    </DataStoreContext.Provider>
  );
};

export const useLeageDetails: () => ILeagueDetails | undefined = () => {
  const context = React.useContext(DataStoreContext);
  return context.leagueDetails;
};

export const useRankings: () => ISleeperTiers | undefined = () => {
  const context = React.useContext(DataStoreContext);
  return context.rankings;
};

export const useTeams: () => ITeam[] = () => {
  const context = React.useContext(DataStoreContext);
  return context.teams;
};
