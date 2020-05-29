import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Host from "./pages/Host";
import Play from "./pages/Play";
import Home from "./pages/Home";
import "./index.scss";

function App() {
  const gameId = Math.floor(Math.random() * 10000 + 1);
  return (
    <Router>
      <div>
        <nav>
          <Link to={`/host/${gameId}`}>Host</Link>
          <Link to="/play">Play</Link>
        </nav>
        <Switch>
          <Route path="/host/:gameId">
            <Host />
          </Route>
          <Route path="/play/:gameId">
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
