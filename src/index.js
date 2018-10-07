import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';

import reducer from './reducers/reducers';
import mySaga from './sagas/sagas';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

const client = new ApolloClient({
    uri: "https://graph-ql-fargdjqiqg.now.sh"
});

const store = createStore(
    reducer,
    applyMiddleware(mySaga) &&
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(<Provider store={store}><ApolloProvider client={client}><App /></ApolloProvider></Provider>, document.getElementById('root'));
registerServiceWorker();

// let savedTasks = [];
// client.query({
//     query: gql`
//     {
//         tasks {
//             _id
//             text
//             done
//         }
//     }
//     `
// }).then(
//     response => {
//         savedTasks = response.data.tasks.map( task => ({ ...task, id: task._id }) );
//     }
// ).catch(
//     err => console.log(err)
// ).finally(
//     () => {
//
//     }
// );