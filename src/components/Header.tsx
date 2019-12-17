import { Pane, Heading, Icon, IconButton } from "evergreen-ui";
import * as React from "react";

export const Header = () => {
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
        <Icon marginRight={2} icon="dashboard" color="#234361" />
        <Heading>Don't sleep</Heading>
        <Icon marginRight={10} icon="slash" color="#234361" />
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
