import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Adopt from './Containers/Adopt';
import Home from './Containers/Home';


function App() {
  return (
    <Router>
      <Switch>
        <Route path="/adopt" component={Adopt} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  )
}

export default App
