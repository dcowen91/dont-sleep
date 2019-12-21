import { Pane, IconButton, Button, IconName } from "evergreen-ui";
import * as React from "react";
import { Link } from "react-router-dom";
import { useLeageDetails, useTeams } from "./DataStore";
import { useRoutes } from "../util/Hooks";

const HeaderButton = (props: {
  iconName: IconName;
  text: string;
  route: string;
}) => {
  return (
    <Link to={props.route} style={{ textDecoration: "unset" }}>
      <Button
        appearance="minimal"
        iconBefore={props.iconName}
        style={{ color: "#234361" }}
        paddingLeft={8}
        paddingRight={8}
        height="40"
      >
        {props.text}
      </Button>
    </Link>
  );
};

export const Header = () => {
  const { leagueId, teamId } = useRoutes();
  const leagueDetails = useLeageDetails();
  const teams = useTeams();
  const team = teams.find(team => team.user_id === teamId);

  return (
    <Pane
      display={"flex"}
      height={"56px"}
      justifyContent="space-between"
      alignItems={"center"}
      paddingLeft={"16px"}
      paddingRight={"16px"}
      borderBottom
    >
      <Pane display="flex" justifyContent="center" alignItems="center">
        <HeaderButton iconName="eye-open" text="Don't sleep" route="/" />
        {leagueId && (
          <HeaderButton
            iconName="slash"
            text={leagueDetails?.name ?? leagueId}
            route={`/${leagueId}`}
          />
        )}
        {teamId && (
          <HeaderButton
            iconName="slash"
            text={team?.display_name ?? teamId}
            route={`/${leagueId}/${teamId}`}
          />
        )}
      </Pane>
      <Pane>
        <IconButton
          is="a"
          href="https://github.com/dcowen91/dont-sleep"
          icon="code"
          appearance="minimal"
          target="_blank"
        />
      </Pane>
    </Pane>
  );
};
