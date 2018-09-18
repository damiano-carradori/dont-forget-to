import React from 'react'
import { connect } from 'react-redux'
import cx from 'classnames'
import {deleteTask, toggleTask} from "../actionCreators";
import { Draggable } from "react-beautiful-dnd"
import '../style/DontForgetToItem.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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

let DontForgetToItem = ({ index, id, done, text, onToggle, onDeleteClick }) => {
    return (
        <Draggable draggableId={id} index={index}>
            {provided => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={cx(
                        'dont-forget-to-item',
                        {done: done}
                    )}>
                    <FontAwesomeIcon className="toggle-task" icon={['far', 'check-circle']} onClick={() => onToggle(id)}/>
                    <span>{text}</span>
                    <FontAwesomeIcon className="delete-task" icon="trash" onClick={() => onDeleteClick(id)}/>
                </div>
            )}
        </Draggable>
    )
};

export default connect(null,mapDispatchToProps)(DontForgetToItem)