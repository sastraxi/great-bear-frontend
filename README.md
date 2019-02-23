# Great Bear Web Frontend

* This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app)
* Apollo Client is used for GraphQL functionality
* This is a frontend for the following projects:
  * [great-bear-hasura](https://github.com/sastraxi/great-bear-hasura) (use `hasura` branch)
  * [great-bear-graphile](https://github.com/sastraxi/great-bear-graphile) (use `graphile` branch)
  * [great-bear-prisma](https://github.com/sastraxi/great-bear-prisma) (use `prisma` branch)

### Getting started

* ensure you are on the correct branch for your backend
* `cp .env.example .env` and fill in for your backend
* `yarn start`

### Resources

* https://www.howtographql.com/react-apollo
* https://github.com/prisma/graphql-yoga/issues/424
* https://github.com/apollographql/subscriptions-transport-ws/issues/466

### TODO

* use `current_cart` rather than getting session ID then loading that cart
* create a `current_user` view too
