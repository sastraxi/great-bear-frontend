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

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_GRAPHQL_URL,
  credentials: 'include',
})

const wsLink = new WebSocketLink({
  uri: process.env.REACT_APP_SUBSCRIPTION_URL || "",
  options: {
    reconnect: true,
    connectionParams: {},
  }
});

const combinedLink = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink,
);

const apolloClient = new ApolloClient({
  link: combinedLink, // see https://www.apollographql.com/docs/react/advanced/subscriptions.html
  cache: new InMemoryCache(),
})

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={apolloClient}>        
      <StripeProvider apiKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || ""}>
        <App />
      </StripeProvider>
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root'),
);
