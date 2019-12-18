import * as React from "react";
import { Pane, Text, Heading, TextInputField, Button } from "evergreen-ui";
import { Redirect } from "react-router-dom";

// TODO pull in content from Hello.tsx
export const LandingPage = () => {
  const [leagueId, setLeagueId] = React.useState(""); // 469392385332211712
  const [shouldRedirect, setShouldRedirect] = React.useState(false);

  return (
    <Pane
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      marginTop={60}
      //   height={"calc(100vh - 72px)"}
    >
      {shouldRedirect && <Redirect push to={"/" + leagueId} />}
      <Heading size={900}>Don't sleep</Heading>
      <Text marginBottom={30}>
        A tool to help power up your fantasy football teams
      </Text>
      <Pane
        display="flex"
        alignItems="center"
        justifyContent="center"
        margin={15}
      >
        <TextInputField
          marginRight={15}
          label="league id"
          value={leagueId}
          onChange={(e: any) => {
            setLeagueId(e.target.value);
          }}
        />
        <Button
          appearance="primary"
          onClick={() => {
            setShouldRedirect(true);
            // const url = `https://api.sleeper.app/v1/league/${leagueId}/users`;
            // fetch(url)
            //   .then(res => res.json())
            //   .then(data => console.log(data));
            // TODO set user data
            // TODO render Redirect to /leagueId on go
            // TODO orchestrate data better
          }}
        >
          Go!
        </Button>
      </Pane>
    </Pane>
  );
};