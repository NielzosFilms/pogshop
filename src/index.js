import React from "react";
import ReactDOM from "react-dom";
import { App } from "./app/App";
import reportWebVitals from "./app/reportWebVitals";

import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { ApolloProvider } from "@apollo/client/react";
import { BrowserRouter as Router } from "react-router-dom";

const host = process.env.REACT_APP_APOLLO_CLIENT_HOST || process.env.HOST;
const port =
    process.env.REACT_APP_APOLLO_CLIENT_PORT || process.env.SERVER_PORT;

console.log(process.env.NODE_ENV);

const httpLink = createHttpLink({
    uri: `http://${host || "localhost"}:${port || "8080"}/graphql`,
    ...(process.env.NODE_ENV === "production" && { credentials: "include" }),
});

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem("token");
    return {
        headers: {
            ...headers,
            authorization: token || "",
        },
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

ReactDOM.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <Router>
                <App />
            </Router>
        </ApolloProvider>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
