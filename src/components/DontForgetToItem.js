import React from 'react'
import { connect } from 'react-redux'
import cx from 'classnames'
import { deleteTask, toggleTask, editTask } from "../actionCreators";
import { Draggable } from "react-beautiful-dnd"
import '../style/DontForgetToItem.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DontForgetToItemToggle from "./DontForgetToItemToggle";

const mapStateToProps = state => {
    return {
        token: state.user.token,
        filter: state.filter
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onToggle: (token, id, done) => {
            dispatch(toggleTask(token, id, done))
        },
        onDeleteClick: (token, id) => {
            dispatch(deleteTask(token, id))
        },
        onEdit: (token, id, text) => {
            dispatch(editTask(token, id, text))
        }
    }
};
const DontForgetToItem = ({token, filter, id, position, text, done, onToggle, onDeleteClick, onEdit}) => {
    const WAIT_INTERVAL = 1000;
    let timer = null;

    const inputChange = e => {
        let text = e.target.value;
        clearTimeout(timer);
        timer = setTimeout(() => {
            onEdit(token, id, text);
        }, WAIT_INTERVAL);
    };

    const visible = (filter, done) => {
        switch (filter) {
            case 'SHOW_ALL':
                return true;
            case 'SHOW_ACTIVE':
                return !done;
            case 'SHOW_COMPLETED':
                return done;
            default:
                return false;
        }
    };

    return (
        <Draggable draggableId={id} index={position}>
            {provided => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className={cx(
                        'dont-forget-to-item',
                        {hidden: !visible(filter, done)},
                        {done}
                    )}>
                    <div {...provided.dragHandleProps} className="drag-task">
                        <FontAwesomeIcon icon="ellipsis-v"/>
                    </div>
                    <DontForgetToItemToggle
                        id={id}
                        done={done}
                    />
                    <input defaultValue={text} type="text" disabled={done} onKeyUp={inputChange}/>
                    <FontAwesomeIcon className="delete-task" icon="trash"
                                     onClick={() => onDeleteClick(token, id)}/>
                </div>
            )}
        </Draggable>
    )
};

export default connect(mapStateToProps,mapDispatchToProps)(DontForgetToItem)