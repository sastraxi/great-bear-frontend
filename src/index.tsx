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
import AuthProvider from './components/auth/AuthProvider';
import gql from 'graphql-tag';

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
});

const CURRENT_USER_QUERY = gql`
  query {
    currentUser {
      id
      email
    }
  }
`;

const fetchUser = async () => {
  const { data, errors } = await apolloClient.query({ query: CURRENT_USER_QUERY });
  if (errors) {
    console.error('could not fetch user', errors);
    throw new Error('Apollo fetch error');
  }
  return data.currentUser;
};

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={apolloClient}>
      <AuthProvider fetchUser={fetchUser}>
        <StripeProvider apiKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || ""}>
          <App />
        </StripeProvider>
      </AuthProvider>
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root'),
);
