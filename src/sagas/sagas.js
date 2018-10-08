// import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { call, put, takeEvery } from 'redux-saga/effects'
import { getUser } from './graphql'

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

/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
function* mySaga() {
    yield takeEvery("USER_FETCH_REQUESTED", fetchUser);
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