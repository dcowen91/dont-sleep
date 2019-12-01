import * as React from "react";
import { TextInputField, Pane, Heading, Text, Button } from "evergreen-ui";

export const Hello = () => {
  const [leagueId, setLeagueId] = React.useState("");
  const [userId, setuserId] = React.useState("");

  return (
    <>
      <Pane
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <Heading>Don't Sleep</Heading>
        <Text>A tool to help power up your fantasy football teams</Text>
      </Pane>
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
        <TextInputField
          marginRight={15}
          label="user id"
          value={userId}
          onChange={(e: any) => {
            setuserId(e.target.value);
          }}
        />
        <Button
          appearance="primary"
          onClick={() => {
            console.log("CLICKED");
            if (leagueId && userId) {
              const url = `https://us-central1-dont-sleep-92c89.cloudfunctions.net/fetchRosters?leagueId=${leagueId}&userId=${userId}`;
              fetch(url).then(res => console.log(res));
            }
          }}
        >
          Go!
        </Button>
      </Pane>
    </>
  );
};
