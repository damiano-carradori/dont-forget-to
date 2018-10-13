import { call, put, takeEvery } from 'redux-saga/effects'
import GraphQL from './graphql'

function* fetchUser(action) {
    try {
        const user = yield call(GraphQL.getUser, action.id);
        yield put({type: "USER_FETCH_SUCCEEDED", user });
    } catch (e) {
        yield put({type: "USER_FETCH_FAILED", message: e.message});
    }
}
function* addTask(action) {
    try {
        let response = yield call(GraphQL.addTask, action.user.id, action.text);
        yield put({
            type: "ADD_TASK",
            ...response
        });
    } catch (e) {
        yield put({type: "ADD_TASK_FAILED", message: e.message});
    }
}
function* deleteTask(action) {
    // TODO: check user id before perform the deletion
    try{
        let response = yield call(GraphQL.deleteTask, action.id);
        console.log(response);
        yield put({
            type: "DELETE_TASK",
            ...response
        });
    } catch (e) {
        yield put({type: "DELETE_TASK_FAILED", message: e.message});
    }
}
function* editTask(action) {
    // TODO: check user id before perform the edit
    try{
        let response = yield call(GraphQL.updateTask, action.id, action.text);
        yield put({
            type: "EDIT_TASK",
            ...response
        });
    } catch (e) {
        yield put({type: "EDIT_TASK_FAILED", message: e.message});
    }
}
function* toggleTask(action) {
    // TODO: check user id before perform the edit
    try{
        // updateTask: async (id, text, done, position) => {
        //     let response = await client.mutate({
        //         mutation: UPDATE_TASK,
        //         variables : {
        //             id,
        //             ...(text!==undefined && {text}),
        //             ...(done!==undefined && {done}),
        //             ...(position!==undefined && {position}),
        //         }
        //     });
        //     return response.data.updateTask;
        // }
        let response = yield call(GraphQL.updateTask, action.id, action.done);
        yield put({
            type: "TOGGLE_TASK",
            ...response
        });
    } catch (e) {
        yield put({type: "TOGGLE_TASK_FAILED", message: e.message});
    }
}

function* mySaga() {

    yield takeEvery("USER_FETCH_REQUESTED", fetchUser);

    yield takeEvery("ADD_TASK_REQUESTED", addTask);
    yield takeEvery("DELETE_TASK_REQUESTED", deleteTask);
    yield takeEvery("EDIT_TASK_REQUESTED", editTask);
    yield takeEvery("TOGGLE_TASK_REQUESTED", toggleTask);

    // yield takeEvery("ADD_TASK_REQUESTED", addTask);
}

export default mySaga;