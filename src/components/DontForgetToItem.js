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
    mutation UpdateTask($id: ID!, $done: Boolean!) {
        updateTask(id: $id, done: $done)
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
                    {...provided.dragHandleProps}
                    className={cx(
                        'dont-forget-to-item',
                        {done: done}
                    )}>
                    <Mutation mutation={UPDATE_TASK}>
                        {(updateTask) => (
                            <FontAwesomeIcon className="toggle-task" icon={['far', 'check-circle']} onClick={() => {
                                updateTask({variables: {id, done: !done}});
                                onToggle(id);
                            }}/>
                        )}
                    </Mutation>
                    <input defaultValue={text} type="text" disabled={done} onKeyUp={ e => {
                        let newText = e.target.value;
                        onEdit(id,newText);
                    }}/>
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