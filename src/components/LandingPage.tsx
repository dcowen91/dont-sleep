import * as React from "react";
import {
  Pane,
  Text,
  Heading,
  TextInputField,
  Button,
  Icon
} from "evergreen-ui";
import { useHistory } from "react-router-dom";

export const LandingPage = () => {
  const [leagueId, setLeagueId] = React.useState(""); // 469392385332211712
  let history = useHistory();

  return (
    <Pane
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      marginTop={60}
      //   height={"calc(100vh - 72px)"}
    >
      <Pane display="flex" alignItems="center" marginBottom={16}>
        <Icon
          size={36}
          marginRight={16}
          marginTop={4}
          icon="eye-open"
          color="#234361"
        />
        <Heading size={900}>Don't sleep</Heading>
      </Pane>
      <Text>A tool to help power up your fantasy football team</Text>
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
            history.push(`/${leagueId}`);
          }}
        >
          Go!
        </Button>
      </Pane>
    </Pane>
  );
};
