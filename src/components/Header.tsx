import { Pane, IconButton, Button, IconName } from "evergreen-ui";
import * as React from "react";
import { useParams, Link } from "react-router-dom";

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
  // TODO render league name instead of league id
  const { leagueId, teamId } = useParams();
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
            text={leagueId}
            route={`/${leagueId}`}
          />
        )}
        {teamId && (
          <HeaderButton
            iconName="slash"
            text={teamId}
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
