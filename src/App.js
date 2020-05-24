import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Host from "./pages/Host";
import Play from "./pages/Play";
import Home from "./pages/Home";
import "./index.css";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/host">Host</Link>
          <Link to="/play">Play</Link>
        </nav>
        <Switch>
          <Route path="/host">
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
