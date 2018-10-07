import React from 'react'
import { connect } from 'react-redux'
import cx from 'classnames'
import {deleteTask, toggleTask, editTask} from "../actionCreators";
import { Draggable } from "react-beautiful-dnd"
import '../style/DontForgetToItem.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const DELETE_TASK = gql`
    mutation DeleteTask($id: ID!) {
        deleteTask(id: $id)
    }
`;
const UPDATE_TASK = gql`
    mutation UpdateTask($id: ID!, $text: String, $done: Boolean) {
        updateTask(id: $id, text: $text, done: $done)
    }
`;

const mapDispatchToProps = dispatch => {
    return {
        onToggle : id => {
            dispatch(toggleTask(id))
        },
        onDeleteClick : id => {
            dispatch(deleteTask(id))
        },
        onEdit : ( id, text ) => {
            dispatch(editTask(id, text))
        }
    }
};

let DontForgetToItem = ({ index, id, done, text, onToggle, onDeleteClick, onEdit }) => {
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
                    <Mutation mutation={UPDATE_TASK}>
                        {(updateTask) => (
                            <FontAwesomeIcon className="toggle-task" icon={['far', 'check-circle']} onClick={() => {
                                updateTask({variables: {id, done: !done}});
                                onToggle(id);
                            }}/>
                        )}
                    </Mutation>
                    <Mutation mutation={UPDATE_TASK}>
                        {(updateTask)=>(
                            <input defaultValue={text} type="text" disabled={done} onKeyUp={ e => {
                                let text = e.target.value;
                                onEdit(id,text);
                                updateTask({variables: {id, text}});
                            }}/>
                        )}
                    </Mutation>
                    <Mutation mutation={DELETE_TASK}>
                        {(deleteTask) => (
                            <FontAwesomeIcon className="delete-task" icon="trash" onClick={() => {
                                deleteTask({variables: {id}});
                                onDeleteClick(id);
                            }}/>
                        )}
                    </Mutation>
                </div>
            )}
        </Draggable>
    )
};

export default connect(null,mapDispatchToProps)(DontForgetToItem)