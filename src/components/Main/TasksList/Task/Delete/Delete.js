import React, {useContext} from 'react'
import {Mutation} from 'react-apollo'
import {DELETE_TASK} from './graphql'
import Icon from '../../../../Icon/Icon'
import {TaskContext} from '../TaskContext'
import {TasksListContext} from '../../TasksListContext'
import {AuthContext} from '../../../../Auth'
import './style.css'

function Delete() {
    const {id, position} = useContext(TaskContext);
    const {deleteTask} = useContext(TasksListContext);
    const {token} = useContext(AuthContext);

    if (token) {
        const handleDeleteTask = () => { deleteTask(id, position)};

        return (
            <Mutation
                mutation={DELETE_TASK}
                ignoreResults={true}
                optimisticResponse={{
                    __typename: 'Mutation',
                    deleteTask: {
                        __typename: 'Task',
                        id,
                        position,
                    },
                }}
                update={handleDeleteTask}
                context={{
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                }}>
                {deleteTask => (
                    <Icon
                        icon="trash"
                        className="delete-task"
                        onClick={() => deleteTask({variables: {id, position}})}/>
                )}
            </Mutation>
        );

    } else {
        return (
            <Icon
                icon="trash"
                className="delete-task"
                onClick={() => deleteTask(id, position)}/>
        );
    }
}

export default Delete