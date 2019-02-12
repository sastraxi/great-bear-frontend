import React, { Component } from 'react';
import './App.css';
import Wrap from './view/Wrap';

import { Switch, Route } from 'react-router-dom';

import Menu from './components/Menu';

class App extends Component {
  render() {
    return (
      <Wrap>
        <Switch>
          <Route exact path="/" component={Menu} />
        </Switch>
      </Wrap>
    );
  }
}

export default App;
