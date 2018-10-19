export function addTask(text, user) {
    let type = (user === null) ? "ADD_TASK" : "ADD_TASK_REQUESTED";
    return {
        type,
        user,
        text,
        ...(!user && {id: +Date.now()})
    };
}
export function setFilter(filter) {
    return {
        type : 'SET_FILTER',
        filter
    };
}
export function toggleTask(user, id, done) {
    let type = (user === null) ? "TOGGLE_TASK" : "TOGGLE_TASK_REQUESTED";
    return {
        type,
        user,
        id,
        done
    };
}
export function editTask(user, id, text) {
    let type = (user === null) ? "EDIT_TASK" : "EDIT_TASK_REQUESTED";
    return {
        type,
        user,
        id,
        text
    };
}
export function deleteTask(user, id) {
    let type = (user === null) ? "DELETE_TASK" : "DELETE_TASK_REQUESTED";
    return {
        type,
        user,
        id
    };
}
export function reorderTasks( source, destination, user ) {
    if( destination ) {
        let type = (user === null) ? "REORDER_TASKS" : "REORDER_TASKS_REQUESTED";
        return {
            type,
            source,
            destination,
            user
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