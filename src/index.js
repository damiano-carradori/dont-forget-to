import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux';
import _ from 'lodash';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const tasksReducer = ( state = [], action ) => {
    switch (action.type) {
        case 'ADD_TASK':
            let newTask = {
                id : action.id,
                text : action.text,
                done : false
            };
            return [ newTask, ...state ];
        case 'TOGGLE_TASK':
            let task = _.find(state, { id: action.id });
            let newList = _.filter(state, task => task.id !== action.id );
            task.done = !task.done;
            return task.done?[...newList, task]:[task, ...newList];
        case 'DELETE_TASK':
            return _.filter(state, task => task.id !== action.id );
        default:
            return state
    }
};
const filterReducer = ( state = 'SHOW_ACTIVE', action ) => {
    switch (action.type) {
        case 'SET_FILTER':
            return action.filter;
        default:
            return state;
    }
};
const reducer = combineReducers({
    tasks : tasksReducer,
    filter : filterReducer
});
const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
