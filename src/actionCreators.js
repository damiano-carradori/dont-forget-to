export function addTask(token, text) {
    let type = (token === null) ? "ADD_TASK" : "ADD_TASK_REQUESTED";
    return {
        type,
        token,
        text,
        ...(!token && {id: +Date.now()})
    };
}
export function setFilter(filter) {
    return {
        type : 'SET_FILTER',
        filter
    };
}
export function toggleTask(token, id, done) {
    let type = (token === null) ? "TOGGLE_TASK" : "TOGGLE_TASK_REQUESTED";
    return {
        type,
        token,
        id,
        done
    };
}
export function editTask(token, id, text) {
    let type = (token === null) ? "EDIT_TASK" : "EDIT_TASK_REQUESTED";
    return {
        type,
        token,
        id,
        text
    };
}
export function deleteTask(token, id) {
    let type = (token === null) ? "DELETE_TASK" : "DELETE_TASK_REQUESTED";
    return {
        type,
        token,
        id
    };
}
export function reorderTasks( source, destination, token ) {
    if( destination ) {
        let type = (token === null) ? "REORDER_TASKS" : "REORDER_TASKS_REQUESTED";
        return {
            type,
            source,
            destination,
            token
        };
    }
}
export function signIn(username, password) {
    return {
        type: "USER_LOG_IN_REQUESTED",
        username,
        password
    }
}
export function signOut() {
    return {
        type: "USER_SIGN_OUT"
    }
}
export function toggleSignIn() {
    return {
        type: "TOGGLE_SIGN_IN"
    }
}