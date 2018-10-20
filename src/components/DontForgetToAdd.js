import React from 'react'
import { connect } from 'react-redux'
import { addTask } from '../actionCreators'
import '../style/DontForgetToAdd.css'

const mapStateToProps = state => {
    return {
        token : state.user.token
    }
};

const DontForgetToAdd = ({ token, dispatch }) => {
    const onEnter = e => {
        if (e.key === 'Enter') {
            e.stopPropagation();
            e.preventDefault();
            let text = e.target.value.trim();
            if (text) {
                dispatch(addTask(token, text));
            }
            e.target.value = ''
        }
    };

    return (
        <input
            className="dont-forget-to-add"
            type="text"
            placeholder="write here and press ⏎ ( Enter ) to add a new task"
            onKeyDown={onEnter}
        />
    )
};

export default connect(mapStateToProps)(DontForgetToAdd)