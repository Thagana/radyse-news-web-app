import * as React from "react";
import Helmet from "react-helmet";
import { createStore, StoreProvider } from "easy-peasy";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import Routes from "./routes/Routes";
import model from "./store/model";

const store = createStore(model);

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <StoreProvider store={store}>
        <Helmet
          titleTemplate="%s - The Ultimate News"
          defaultTitle="The News App"
        >
          <meta charSet="utf-8" />
          <link href="https://radysemoon.com" rel="canonical" />
        </Helmet>
        <Routes />
        <ReactQueryDevtools initialIsOpen={false} />
      </StoreProvider>
    </QueryClientProvider>
  );
}

export default App;
