/* eslint-disable no-console */

const { GraphQLServer, PubSub } = require("graphql-yoga")

const typeDefs = `
  type Query {
    hello: String!
  }

  type Sensor {
    time: Int!
    temp: Float!
    humidity: Float!
  }

  type Subscription {
    sensor: Sensor!
  }
`

const resolvers = {
  Query: {
    hello: () => `Hello`,
  },
  Subscription: {
    sensor: {
      subscribe: (parent, args, { pubsub }) => {
        const channel = Math.random()
          .toString(36)
          .substring(7)
        setInterval(
          () =>
            pubsub.publish(channel, {
              sensor: {
                time: Math.round(Date.now() / 1000),
                temp: +(10 + Math.random() * 10).toFixed(1),
                humidity: +(80 + Math.random() * 10).toFixed(1),
              },
            }),
          1000
        )
        return pubsub.asyncIterator(channel)
      },
    },
  },
}

const pubsub = new PubSub()
const server = new GraphQLServer({ typeDefs, resolvers, context: { pubsub } })

server.start(() => console.log("Server is running on localhost:4000"))
