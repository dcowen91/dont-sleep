import { BrowserRouter, Switch, Route } from "react-router-dom";
import * as React from "react";
import { Header } from "./Header";
import { TeamView } from "./TeamView";
import { LeagueView } from "./LeagueView";
import { LandingPage } from "./LandingPage";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/:leagueId/:teamId">
          <TeamView />
        </Route>
        <Route path="/:leagueId">
          <LeagueView />
        </Route>
        <Route path="/">
          <LandingPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};
