import * as React from "react";

interface ILeagueDetails {
  scoring_settings: { rec: number };
  roster_positions: string[];
  name: string;
  league_id: string;
  avatar: string;
}

interface ILeagueDetailsContext {
  details: ILeagueDetails;
  setDetails: (details: ILeagueDetails) => void;
}

const EmptyLeagueDetailsContext: ILeagueDetailsContext = {
  details: {
    avatar: "",
    league_id: "",
    name: "",
    roster_positions: [],
    scoring_settings: { rec: 0 }
  },
  setDetails: () => {}
};

const LeagueDetailsContext = React.createContext<ILeagueDetailsContext>(
  EmptyLeagueDetailsContext
);

export const LeagueDetailsProvider = ({
  children
}: React.PropsWithChildren<{}>) => {
  const [leagueDetails, setLeagueDetails] = React.useState<ILeagueDetails>(
    EmptyLeagueDetailsContext.details
  );

  return (
    <LeagueDetailsContext.Provider
      value={{
        details: leagueDetails,
        setDetails: setLeagueDetails
      }}
    >
      {children}
    </LeagueDetailsContext.Provider>
  );
};

export const useLeagueDetails: (leagueId?: string) => ILeagueDetails = (
  leagueId?: string
) => {
  const context = React.useContext(LeagueDetailsContext);

  React.useEffect(() => {
    if (leagueId) {
      const url = `https://api.sleeper.app/v1/league/${leagueId}`;
      fetch(url)
        .then(res => res.json())
        .then(data => context.setDetails(data));
    }
  }, [leagueId]);

  return context.details;
};
