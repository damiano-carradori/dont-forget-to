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
export function toggleTask(user, id) {
    let type = (user === null) ? "TOGGLE_TASK" : "TOGGLE_TASK_REQUESTED";
    return {
        type,
        user,
        id
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
export function reorderTasks( source, destination, filter ) {
    return {
        type: 'REORDER_TASKS',
        source,
        destination,
        filter
    };
}
export function signIn() {
    return {
        type: "USER_FETCH_REQUESTED",
        id: "5bbe1f347b23411c77e0b544"
    }
}