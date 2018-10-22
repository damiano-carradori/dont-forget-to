import { fork, call, put, takeEvery } from 'redux-saga/effects'
import GraphQL from './graphql'

function* fetchUser({token}) {
    try {
        const user = yield call(GraphQL.getUser, token);
        yield put({type: "USER_FETCH_SUCCEEDED", user});
    } catch (e) {
        yield put({type: "USER_FETCH_FAILED", message: e.message});
    }
}
function* logIn({username, password}) {
    try {
        const auth = yield call(GraphQL.logIn, username, password);
        yield put({type: "TOGGLE_SIGN_IN"});
        yield put({type: "USER_LOG_IN_SUCCEEDED", auth});
    } catch (e) {
        yield put({type: "USER_LOG_IN_FAILED", message: e.message});
    }
}
function* addTask({token, text}) {
    try {
        let response = yield call(GraphQL.addTask, token, text);
        yield put({
            type: "ADD_TASK",
            ...response
        });
    } catch (e) {
        yield put({type: "ADD_TASK_FAILED", message: e.message});
    }
}
function* deleteTask({token, id}) {
    try{
        let response = yield call(GraphQL.deleteTask, token, id);
        console.log(response);
        yield put({
            type: "DELETE_TASK",
            ...response
        });
    } catch (e) {
        yield put({type: "DELETE_TASK_FAILED", message: e.message});
    }
}
function* editTask({token, id, text}) {
    try {
        let response = yield call(GraphQL.updateTask, token, id, {text});
        yield put({
            type: "EDIT_TASK",
            ...response
        });
    } catch (e) {
        yield put({type: "EDIT_TASK_FAILED", message: e.message});
    }
}
function* toggleTask({token, id, done}) {
    try {
        let response = yield call(GraphQL.updateTask, token, id, {done});
        yield put({
            type: "TOGGLE_TASK",
            ...response
        });
    } catch (e) {
        yield put({type: "TOGGLE_TASK_FAILED", message: e.message});
    }
}
function* reorderTasks({token, source, destination}) {
    try {
        yield fork(GraphQL.moveTask, token, source.index, destination.index);
        yield put({
            type: "REORDER_TASKS",
            source,
            destination
        });
    } catch (e) {
        yield put({type: "REORDER_TASKS_FAILED", message: e.message});
    }
}

function* mySaga() {

    yield takeEvery("USER_LOG_IN_REQUESTED", logIn);
    yield takeEvery("USER_FETCH_REQUESTED", fetchUser);

    yield takeEvery("ADD_TASK_REQUESTED", addTask);
    yield takeEvery("DELETE_TASK_REQUESTED", deleteTask);
    yield takeEvery("EDIT_TASK_REQUESTED", editTask);
    yield takeEvery("TOGGLE_TASK_REQUESTED", toggleTask);
    yield takeEvery("REORDER_TASKS_REQUESTED", reorderTasks);
}

export default mySaga;