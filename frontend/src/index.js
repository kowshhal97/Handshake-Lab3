import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { createStore } from 'redux'
import { Provider } from 'react-redux'


import { InMemoryCache } from 'apollo-cache-inmemory';

import ApolloClient from 'apollo-boost';

import { ApolloProvider } from 'react-apollo'

import reducer from './store/reducer'



const client = new ApolloClient({
    uri: "http://localhost:3000/graphql",
    cache: new InMemoryCache({
        addTypename: false
      })
});

const store = createStore(reducer);

ReactDOM.render(<Provider store={store}>
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
</Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
