// import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { call, put, takeEvery } from 'redux-saga/effects'
import { getUser, addTask } from './graphql'

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchUser(action) {
    try {
        // const user = yield call(Api.fetchUser, action.payload.userId);
        const tasks = yield call(getUser);
        const user = {
            username : 'Damiano',
            profile_picture : 'https://pbs.twimg.com/profile_images/981475488962146304/nUnzND-9_bigger.jpg',
            tasks : tasks
        };
        yield put({type: "USER_FETCH_SUCCEEDED", user });
    } catch (e) {
        yield put({type: "USER_FETCH_FAILED", message: e.message});
    }
}
function* createTask(action) {
    if( action.user === null ){
        let id = +new Date();
        yield put({type: "ADD_TASK", text: action.text, id });
    } else {
        try {
            let response = yield call(addTask, action.text);
            //{_id: "5bbb871114e043006208c62b", text: "test 4", done: false, __typename: "Task"}
            console.log(response);
            yield put({
                type: "ADD_TASK",
                ...response,
                id: response._id
            });
        } catch (e) {
            yield put({type: "ADD_TASK_FAILED", message: e.message});
        }
    }
}
/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
function* mySaga() {
    yield takeEvery("USER_FETCH_REQUESTED", fetchUser);
    yield takeEvery("ADD_TASK_REQUESTED", createTask);
}

/*
  Alternatively you may use takeLatest.

  Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/
// function* mySaga() {
//     yield takeLatest("USER_FETCH_REQUESTED", fetchUser);
// }

export default mySaga;