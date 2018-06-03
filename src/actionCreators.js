export function newTask(text) {
    let time = new Date();
    return {
        type: 'ADD_TASK',
        id: time.getTime(),
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
export function deleteTask(id) {
    return {
        type: 'DELETE_TASK',
        id
    };
}