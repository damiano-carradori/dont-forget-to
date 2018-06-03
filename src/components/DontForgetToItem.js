import React from 'react'
import { connect } from 'react-redux'
import cx from 'classnames'
import {deleteTask, toggleTask} from "../actionCreators";
import '../style/DontForgetToItem.css'

const mapDispatchToProps = dispatch => {
    return {
        onToggle : id => {
            dispatch(toggleTask(id))
        },
        onDeleteClick : id => {
            dispatch(deleteTask(id))
        }
    }
};

let DontForgetToItem = ({ id, done, text, onToggle, onDeleteClick }) => {
    return (
        <div
            className={cx(
                'dont-forget-to-item',
                {done: done}
            )}>
            <input type="checkbox" defaultChecked={done} onChange={() => onToggle(id)}/>
            <span>{text}</span>
            <button onClick={() => onDeleteClick(id)}>Delete</button>
        </div>
    )
};

export default connect(null,mapDispatchToProps)(DontForgetToItem)