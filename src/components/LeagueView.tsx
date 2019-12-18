import * as React from "react";
import { Pane, Text } from "evergreen-ui";
import { useParams } from "react-router-dom";

export const LeagueView = () => {
  const { leagueId } = useParams();
  return (
    <Pane>
      <Text>{leagueId}</Text>
    </Pane>
  );
};
