# Great Bear Web Frontend
* This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app)
* Apollo Client is used for GraphQL functionality
* This is a frontend for the following projects:
  * [great-bear-hasura](https://github.com/sastraxi/great-bear-hasura) (`hasura` variant)
  * [great-bear-graphile](https://github.com/sastraxi/great-bear-graphile) (`graphile` variant)
  * [great-bear-prisma](https://github.com/sastraxi/great-bear-prisma) (`prisma` variant)

### Getting started
* `cp .env.example .env`; make sure you've set the right `VARIANT`
* `yarn start`

### Resources
* https://www.howtographql.com/react-apollo
* https://github.com/prisma/graphql-yoga/issues/424
* https://github.com/apollographql/subscriptions-transport-ws/issues/466

### TODO
* split up variant code into folders and add mutations
* why doesn't the cart go down to 0 when we checkout?
