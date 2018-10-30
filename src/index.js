import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'

import reducer from './reducers/reducers';
import mySaga from './sagas/sagas';

import { ApolloProvider } from "react-apollo";

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import ApolloClient from "apollo-boost";

const client = new ApolloClient({
    uri: "https://floating-reaches-16037.herokuapp.com/",
    clientState : {
        defaults: {
            user: {
                token: null
            },
            filter : "SHOW_ACTIVE"
        },
    }
});

const sagaMiddleware = createSagaMiddleware();

const logger = store => next => action => {
    console.log('dispatching', action)
    let result = next(action)
    console.log('next state', store.getState())
    return result
}

const store = createStore(
    reducer,
    applyMiddleware(logger, sagaMiddleware)
);

sagaMiddleware.run(mySaga);

ReactDOM.render(<Provider store={store}><ApolloProvider client={client}><App /></ApolloProvider></Provider>, document.getElementById('root'));
registerServiceWorker();