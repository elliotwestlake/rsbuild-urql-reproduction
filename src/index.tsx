import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "urql";

import { cacheExchange, createClient, fetchExchange } from "urql";

import { authExchange } from "@urql/exchange-auth";

const client = createClient({
  url: "https://dex-server.herokuapp.com/",
  exchanges: [
    cacheExchange,
    authExchange(async (utils) => {
      const token = "hello";

      return {
        addAuthToOperation: (operation) => {
          if (!token) return operation;

          return utils.appendHeaders(operation, {
            Authorization: `Bearer ${token}`,
          });
        },
        // getAccessTokenSilently handles errors and redirects for us
        didAuthError: () => false,
        refreshAuth: async () => {},
      };
    }),
    fetchExchange,
  ],
  requestPolicy: "cache-and-network",
});

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <Provider value={client}>
      <App />
    </Provider>
  </React.StrictMode>
);
