import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Check from "./pages/Check";
import Host from "./pages/Host";
import Play from "./pages/Play";
import Home from "./pages/Home";
import "./index.scss";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/host">Host</Link>
          <Link to="/play">Play</Link>
        </nav>
        <Switch>
          <Route path="/host/:gameId/check">
            <Check />
          </Route>
          <Route path="/host/:gameId">
            <Host />
          </Route>
          <Route path="/host">
            <Host />
          </Route>
          <Route path="/play/:playerId">
            <Play />
          </Route>
          <Route path="/play">
            <Play />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
