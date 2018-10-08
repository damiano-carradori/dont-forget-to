import React from 'react'
import { connect } from 'react-redux'
import { createTask } from '../actionCreators'
import '../style/DontForgetToAdd.css'

const mapStateToProps = state => {
    return {
        user : state.user
    }
};

let DontForgetToAdd = ({ user, dispatch }) => {
    const addTask = e => {
        if (e.key === 'Enter') {
            e.stopPropagation();
            e.preventDefault();
            let text = e.target.value.trim();
            if (text) {
                dispatch(createTask(text, user));
            }
            e.target.value = ''
        }
    };

    return (
        <input
            className="dont-forget-to-add"
            type="text"
            placeholder="write here and press ⏎ ( Enter ) to add a new task"
            onKeyDown={addTask}
        />
    )
};

export default connect(mapStateToProps)(DontForgetToAdd)