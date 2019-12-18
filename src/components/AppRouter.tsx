import { BrowserRouter, Switch, Route } from "react-router-dom";
import * as React from "react";
import { Header } from "./Header";
import { TeamView } from "./TeamView";
import { LeagueView } from "./LeagueView";
import { LandingPage } from "./LandingPage";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/:leagueId/:teamId">
          <Header />
          <TeamView />
        </Route>
        <Route path="/:leagueId">
          <Header />
          <LeagueView />
        </Route>
        <Route path="/">
          <Header />
          <LandingPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};
