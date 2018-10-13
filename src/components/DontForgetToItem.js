import React from 'react'
import { connect } from 'react-redux'
import cx from 'classnames'
import { deleteTask, toggleTask, editTask } from "../actionCreators";
import { Draggable } from "react-beautiful-dnd"
import '../style/DontForgetToItem.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const mapStateToProps = state => {
    return {
        user: state.user,
        filter: state.filter
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onToggle: (user, id) => {
            dispatch(toggleTask(user, id))
        },
        onDeleteClick: (user, id) => {
            dispatch(deleteTask(user, id))
        },
        onEdit: (user, id, text) => {
            dispatch(editTask(user, id, text))
        }
    }
};
const DontForgetToItem = ({user, index, id, done, text, onToggle, onDeleteClick, onEdit}) => {
    const WAIT_INTERVAL = 1000;
    let timer = null;

    const inputChange = e => {
        let text = e.target.value;
        clearTimeout(timer);
        timer = setTimeout(() => {
            onEdit(user, id, text);
        }, WAIT_INTERVAL);
    };

    return (
        <Draggable draggableId={id} index={index}>
            {provided => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className={cx(
                        'dont-forget-to-item',
                        {done: done}
                    )}>
                    <div {...provided.dragHandleProps} className="drag-task">
                        <FontAwesomeIcon icon="ellipsis-v"/>
                    </div>
                    <FontAwesomeIcon className="toggle-task" icon={['far', 'check-circle']}
                                     onClick={() => onToggle(user, id)}/>
                    <input defaultValue={text} type="text" disabled={done} onKeyUp={inputChange}/>
                    <FontAwesomeIcon className="delete-task" icon="trash"
                                     onClick={() => onDeleteClick(user, id)}/>
                </div>
            )}
        </Draggable>
    )
};

export default connect(mapStateToProps,mapDispatchToProps)(DontForgetToItem)