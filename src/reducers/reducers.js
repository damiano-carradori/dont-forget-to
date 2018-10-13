import _ from 'lodash';
import {combineReducers} from "redux";

const taskReducer = ( state, action ) => {
    switch (action.type) {
        case 'ADD_TASK':
            return {
                id: action.id,
                position: action.position,
                text: action.text,
                done: false
            };
        case 'TOGGLE_TASK':
            if( state.id !== action.id ){
                return state;
            }
            return {
                ...state,
                done : !state.done
            };
        case 'EDIT_TASK':
            if( state.id !== action.id ){
                return state;
            }
            return {
                ...state,
                text : action.text
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
        case 'EDIT_TASK':
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
        case 'USER_FETCH_SUCCEEDED':
            if (!action.user.tasks.length){
                return state;
            }
            return action.user.tasks.reduce( ( tasks, task) => [ ...tasks, task ], []);
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

const userReducer = ( state = null, action ) => {
    switch (action.type) {
        case 'USER_FETCH_SUCCEEDED':
            return action.user;
        default:
            return state;
    }
};

const reducer = combineReducers({
    tasks : tasksReducer,
    filter : filterReducer,
    user : userReducer
});

export default reducer;