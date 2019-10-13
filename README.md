# Great Bear Web Frontend
* This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app)
* Apollo Client is used for GraphQL functionality
* This is a frontend for the following variants of [the Great Bear Project](https://github.com/sastraxi/great-bear):
  * [great-bear-hasura](https://github.com/sastraxi/great-bear-hasura) (`hasura` variant)
  * [great-bear-postgraphile](https://github.com/sastraxi/great-bear-postgraphile) (`postgraphile` variant)

### Getting started
* Choose a variant backend and follow its Getting started section.
* `cp .env.example .env`; make sure you've set the right `VARIANT` and URL for the backend.
* Run the frontend with `yarn start`.
* Navigate to http://localhost:3000 (by default).

### Resources
* https://www.howtographql.com/react-apollo
* https://github.com/prisma/graphql-yoga/issues/424
* https://github.com/apollographql/subscriptions-transport-ws/issues/466

### TODO
* split up variant code into folders and add mutations
* why doesn't the cart go down to 0 when we checkout?
