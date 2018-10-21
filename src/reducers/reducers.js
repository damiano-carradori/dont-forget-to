import _ from 'lodash';
import {combineReducers} from "redux";

const taskReducer = ( state, action ) => {
    switch (action.type) {
        case 'ADD_TASK':
            return {
                id: action.id,
                position: 0,
                text: action.text,
                done: false
            };
        case 'TOGGLE_TASK':
            if (state.id !== action.id) {
                return state;
            }
            return {
                ...state,
                done: !state.done
            };
        case 'EDIT_TASK':
            if (state.id !== action.id) {
                return state;
            }
            return {
                ...state,
                text: action.text
            };
        default:
            return state;
    }
};

const tasksReducer = ( state = [], action ) => {
    switch (action.type) {
        case 'ADD_TASK':
            return [
                taskReducer(undefined, action),
                ...(state.map(task => ({...task, position: ++task.position})))
            ];
        case 'TOGGLE_TASK':
        case 'EDIT_TASK':
            return state.map(task =>
                taskReducer(task, action)
            );
        case 'DELETE_TASK':
            let toRemove = _.find(state, {id: action.id});
            return _.filter(
                state.map(task => ({
                    ...task,
                    ...(task.position > toRemove.position && {position: task.position - 1})
                })),
                task => task.id !== action.id
            );
        case 'REORDER_TASKS':
            let from = action.source.index;
            let to = action.destination.index;
            let [others, movingTask] = _.partition(state, task => task.position !== from);
            others.splice(to, 0, ...movingTask);
            return others.map((task, index) => ({
                ...task,
                ...(task.map !== index && {position: index})
            }));
        case 'USER_LOG_IN_SUCCEEDED':
            if (!action.auth.user.tasks.length) {
                return state;
            }
            return action.auth.user.tasks.reduce((tasks, task) => [...tasks, task], []);
        case 'USER_FETCH_SUCCEEDED':
            if (!action.user.tasks.length) {
                return state;
            }
            return action.user.tasks.reduce((tasks, task) => [...tasks, task], []);
        case 'USER_SIGN_OUT':
            return [];
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

const userReducer = ( state = { token: null, account: null, sideOpen: false }, action ) => {
    switch (action.type) {
        case 'USER_LOG_IN_SUCCEEDED':
            let { token, user } = action.auth;
            return {
                ...state,
                token,
                account: user
            };
        case 'USER_FETCH_SUCCEEDED':
            return {
                ...state,
                account: action.user
            };
        case 'TOGGLE_SIGN_IN':
            return {
                ...state,
                sideOpen: !state.sideOpen
            };
        case 'USER_SIGN_OUT':
            return {
                ...state,
                token: null,
                account: null,
            };
        default:
            return state;
    }
};

const reducer = combineReducers({
    tasks: tasksReducer,
    filter: filterReducer,
    user: userReducer
});

export default reducer;