import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Host from "./pages/Host";
import Play from "./pages/Play";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/host">Host</Link>
            </li>
            <li>
              <Link to="/play">Play</Link>
            </li>
          </ul>
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
        </Switch>
      </div>
    </Router>
  );
}

export default App;
