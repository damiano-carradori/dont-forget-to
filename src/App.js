import React, { Component } from 'react';
import './App.css';
import DontForgetTo from "./components/DontForgetTo";
import _ from 'lodash'
import { createStore, combineReducers } from 'redux';

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
const filterReducer = ( state = 'SHOW_ALL', action ) => {
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

class App extends Component {
    componentDidMount() {
        this.unsubscribe = store.subscribe(() => {
            this.forceUpdate();
        })

    }
    componentWillUnmount() {
        this.unsubscribe();
    }
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Don't forget to...</h1>
                </header>
                <main className="App-main">
                    <DontForgetTo
                        tasks={store.getState().tasks}
                        dispatch={store.dispatch}
                    />
                </main>
                <footer>
                    &copy; 2018 - Made with <span role="img" aria-label="love">❤️</span> and <span role="img" aria-label="React">⚛️</span> by Damiano Carradori
                </footer>
            </div>

        );
    }
}

export default App;
