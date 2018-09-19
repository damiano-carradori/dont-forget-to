import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux';
import _ from 'lodash';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const taskReducer = ( state, action ) => {
    switch (action.type) {
        case 'ADD_TASK':
            return {
                id : action.id,
                text : action.text,
                done : false
            };
        case 'TOGGLE_TASK':
            if( state.id !== action.id ){
                return state;
            }
            return {
                ...state,
                done : !state.done
            };
        default:
            return state;
    }
};

const tasksReducer = ( state = [], action ) => {
    switch (action.type) {
        case 'ADD_TASK':
            return [ taskReducer(undefined,action), ...state ];
        case 'TOGGLE_TASK':
            return state.map( task =>
               taskReducer(task,action)
            );
        case 'DELETE_TASK':
            return _.filter(state, task => task.id !== action.id );
        case 'REORDER_TASKS':
            const convertPositions = ( position, filter ) =>{
                switch (filter) {
                    case 'SHOW_ACTIVE':
                        let activeTasks = _.filter(state, task => !task.done );
                        return _.findIndex(state, task => activeTasks[position].id === task.id );
                    case 'SHOW_COMPLETED':
                        let completedTasks = _.filter(state, task => task.done );
                        return _.findIndex(state, task => completedTasks[position].id === task.id );
                    default:
                        return position;
                }
            };
            if( !action.destination ){
                return state;
            }
            let from = convertPositions(action.source.index, action.filter);
            let to = convertPositions(action.destination.index, action.filter);
            let editableState = Array.from(state);
            let movingTask = editableState.splice(from, 1);
            editableState.splice(to, 0, ...movingTask );
            return editableState;
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
