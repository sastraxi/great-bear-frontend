import React, { Component } from 'react';
import './App.css';
import Wrap from './view/Wrap';

import { Switch, Route } from 'react-router-dom';

import Menu from './pages/Menu';
import Cart from './pages/Cart';

class App extends Component {
  render() {
    return (
      <Wrap>
        <Switch>
          <Route exact path="/" component={Menu} />
          <Route exact path="/cart" component={Cart} />
        </Switch>
      </Wrap>
    );
  }
}

export default App;
