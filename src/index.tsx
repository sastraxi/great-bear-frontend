import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { split } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { getMainDefinition } from 'apollo-utilities';
import { BrowserRouter } from 'react-router-dom';
import { StripeProvider } from 'react-stripe-elements';

/*
const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000`,
  options: {
    reconnect: true,
    connectionParams: {
      authToken: localStorage.getItem(AUTH_TOKEN),
    }
  }
});
*/

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_GRAPHQL_URL,
  credentials: 'include',
})

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
})

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={apolloClient}>        
      {/* the "or" on the next line works around a problem in the typescript def */}
      <StripeProvider apiKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || ""}>
        <App />
      </StripeProvider>
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root'),
);
