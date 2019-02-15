import React, { Component } from 'react';
import './App.css';
import Wrap from './view/Wrap';

import { Switch, Route } from 'react-router-dom';

import Menu from './pages/Menu';
import Cart from './pages/Cart';

class App extends Component {
  componentDidMount() {
    fetch(`${process.env.REACT_APP_BACKEND_URL}`, { credentials: 'include' }).then(() => {
      // force a call to the actual
      // TODO: the call to login will do this for us, can remove later
    });
  }

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
