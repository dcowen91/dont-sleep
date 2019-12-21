import * as React from "react";
import {
  Pane,
  Text,
  Heading,
  TextInputField,
  Button,
  Icon,
  Paragraph,
  Link,
  Strong
} from "evergreen-ui";
import { useHistory } from "react-router-dom";

export const LandingPage = () => {
  const [leagueId, setLeagueId] = React.useState("");
  let history = useHistory();

  return (
    <Pane
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      marginTop={60}
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
      <Text size={500}>Power up your fantasy football team!</Text>
      <Paragraph marginTop={50} maxWidth={"300px"}>
        Built using the official sleeper API and data from{" "}
        <Link color="neutral" target="_blank" href="http://www.borischen.co">
          borischen.co
        </Link>
        . Provide your <Strong>Sleeper league id</Strong> below to get started.
      </Paragraph>
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
