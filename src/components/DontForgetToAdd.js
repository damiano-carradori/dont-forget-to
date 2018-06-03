import React from 'react'
import { connect } from 'react-redux'
import { newTask } from '../actionCreators'
import '../style/DontForgetToAdd.css'

let DontForgetToAdd = ({ dispatch }) => {
    const addTask = e => {
        if (e.key === 'Enter') {
            e.stopPropagation();
            e.preventDefault();
            let text = e.target.value.trim();
            if(text) {
                dispatch(newTask(text));
            }
            e.target.value = ''
        }
    };
    return(
        <input
            className="dont-forget-to-add"
            type="text"
            placeholder="write here and press ⏎ ( Enter ) to add a new task"
            onKeyDown={addTask}
        />
    )
};

export default connect()(DontForgetToAdd)