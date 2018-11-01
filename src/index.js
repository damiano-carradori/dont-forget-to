import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-boost";
import {ApolloProvider} from "react-apollo";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { defaults, typeDefs } from "./resolvers"
import "./index.css";

const client = new ApolloClient({
    uri: "https://floating-reaches-16037.herokuapp.com/",
    clientState : {
        defaults,
        typeDefs
    }
});

ReactDOM.render(<ApolloProvider client={client}><App /></ApolloProvider>, document.getElementById('root'));
registerServiceWorker();