export function newTask(id, text) {
    return {
        type: 'ADD_TASK',
        id,
        text
    };
}
export function setFilter(filter) {
    return {
        type : 'SET_FILTER',
        filter
    };
}
export function toggleTask(id) {
    return {
        type: 'TOGGLE_TASK',
        id
    };
}
export function editTask(id, text) {
    return {
        type: 'EDIT_TASK',
        id,
        text
    };
}
export function deleteTask(id) {
    return {
        type: 'DELETE_TASK',
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