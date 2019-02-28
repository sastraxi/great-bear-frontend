import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Menu from './pages/Menu';
import Order from './pages/Order';
import Orders from './pages/Orders';
import Signup from './pages/Signup';
import Wrap from './view/Wrap';

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

          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />

          <Route exact path="/" component={Menu} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/orders" component={Orders} />
          <Route
            exact
            path="/orders/:id"
            render={({ match }) => <Order orderId={+match.params.id} />}
          />

        </Switch>
      </Wrap>
    );
  }
}

export default App;
