import { BrowserRouter, Switch, Route } from "react-router-dom";
import * as React from "react";
import { Header } from "./Header";
import { TeamView } from "./TeamView";
import { LeagueView } from "./LeagueView";
import { LandingPage } from "./LandingPage";
import { DataStore } from "./DataStore";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Route path="/">
        <DataStore>
          <Header />
          <Switch>
            <Route path="/:leagueId/:teamId">
              <TeamView />
            </Route>
            <Route path="/:leagueId">
              <LeagueView />
            </Route>
            <Route exact path="/">
              <LandingPage />
            </Route>
          </Switch>
        </DataStore>
      </Route>
    </BrowserRouter>
  );
};
