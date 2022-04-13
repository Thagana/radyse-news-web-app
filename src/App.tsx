import * as React from 'react';
import Helmet from 'react-helmet';
import { createStore, StoreProvider as Provider } from 'easy-peasy';

import Routes from './routes/Routes';
import model from './store/model';

const store = createStore(model);

function App() {
  return (
    <Provider store={store}>
        <Helmet titleTemplate='%s - Ultimate News' defaultTitle='Ultimate News'>
          <meta charSet='utf-8' />
          <link href='https://app.ultimatenews.xyz' rel="canonical" />
        </Helmet>
        <Routes />
    </Provider>
  );
}

export default App;
