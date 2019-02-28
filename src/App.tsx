import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
import GuestRoute from './components/auth/GuestRoute';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Menu from './pages/Menu';
import Order from './pages/Order';
import Orders from './pages/Orders';
import Signup from './pages/Signup';
import Wrap from './view/Wrap';

class App extends Component {
  render() {
    return (
      <Wrap>
        <Switch>

          <GuestRoute exact path="/login" component={Login} />
          <GuestRoute exact path="/signup" component={Signup} />

          <ProtectedRoute exact path="/" component={Menu} />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <ProtectedRoute exact path="/orders" component={Orders} />
          <ProtectedRoute
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
