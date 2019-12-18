import { Pane, IconButton, Button, IconName } from "evergreen-ui";
import * as React from "react";

const HeaderButton = (props: { iconName: IconName; text: string }) => {
  return (
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
  );
};

export const Header = () => {
  // TODO render slashes and league /user name from route
  // TODO add Link to={} functionality to each section
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
        <HeaderButton iconName="eye-open" text="Don't sleep" />
        {/* <HeaderButton iconName="slash" text="LeagueName" /> */}
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
