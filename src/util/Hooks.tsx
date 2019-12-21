import { useRouteMatch } from "react-router-dom";

export const useRoutes: () => {leagueId?: string, teamId?: string} = () => {
    const leagueMatch = useRouteMatch<{
        leagueId?: string;
      }>("/:leagueId");
    
      const teamMatch = useRouteMatch<{
        leagueId?: string;
        teamId?: string;
      }>("/:leagueId/:teamId");
    
      const leagueId = leagueMatch?.params.leagueId ?? "";
      const teamId = teamMatch?.params.teamId ?? "";

      return {leagueId, teamId}
}