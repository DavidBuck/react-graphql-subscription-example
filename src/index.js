import ReactDOM from "react-dom"
import { ApolloProvider } from "@apollo/react-hooks"
import { split } from "apollo-link"
import { HttpLink } from "apollo-link-http"
import { ApolloClient } from "apollo-client"
import { WebSocketLink } from "apollo-link-ws"
import { getMainDefinition } from "apollo-utilities"
import { InMemoryCache } from "apollo-cache-inmemory"

import "./styles/tailwind.css"
import App from "./App"

// import * as serviceWorker from './serviceWorker';

const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/`,
  options: {
    reconnect: true,
  },
})

const httpLink = new HttpLink({
  uri: "http://localhost:4000",
})

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    )
  },
  wsLink,
  httpLink
)

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
