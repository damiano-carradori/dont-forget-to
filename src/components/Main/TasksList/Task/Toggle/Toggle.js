import React, {useContext} from 'react'
import {Mutation} from 'react-apollo'
import {TOGGLE_TASK} from './graphql'
import Icon from '../../../../Icon'
import {TaskContext} from '../TaskContext'
import {TasksListContext} from '../../TasksListContext'
import {AuthContext} from '../../../../Auth'
import './style.css'

function Toggle() {
    const {token} = useContext(AuthContext);
    const {toggleTask} = useContext(TasksListContext);
    const {id, done} = useContext(TaskContext);

    if (token) {
        const handleMutationUpdate = () => {
            toggleTask(id);
        };

        return (
            <Mutation
                mutation={TOGGLE_TASK}
                update={handleMutationUpdate}
                context={{
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                }}>
                {updateTask => (
                    <Icon
                        icon={['far', 'check-circle']}
                        className="toggle-task"
                        onClick={() => updateTask({
                            variables: {id, done: !done},
                            optimisticResponse: {
                                __typename: 'Mutation',
                                updateTask: {
                                    __typename: 'Task',
                                    id,
                                    done: !done,
                                },
                            },
                        })}/>
                )}
            </Mutation>
        );
    } else {
        return (
            <Icon
                icon={['far', 'check-circle']}
                className="toggle-task"
                onClick={()=>toggleTask(id)}/>
        );
    }
}

export default Toggle