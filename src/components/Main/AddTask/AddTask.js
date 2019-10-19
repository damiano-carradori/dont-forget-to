import React, {useContext} from 'react'
import {Mutation} from 'react-apollo'
import {ADD_TASK} from './graphql'
import {TasksListContext} from '../TasksList';
import {AuthContext} from '../../Auth'
import './style.css'
import AddInput from './AddInput';

function AddTask() {
    const {token} = useContext(AuthContext);
    const {newTask} = useContext(TasksListContext);

    if (token) {
        const handleMutationUpdate = (_, {data: {addTask}}) => {
            newTask(addTask);
        };

        return (
            <Mutation
                mutation={ADD_TASK}
                update={handleMutationUpdate}
                context={{
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                }}>
                {addTask => (
                    <AddInput onEnter={ text => {
                        addTask({
                            variables: {text},
                            optimisticResponse: {
                                __typename: 'Mutation',
                                addTask: {
                                    __typename: 'Task',
                                    id: `${+new Date()}`,
                                    position: 0,
                                    text,
                                    done: false,
                                },
                            },
                        });
                    }}/>
                )}
            </Mutation>
        )
    } else {
        const handleOnEnter = text => {
            newTask({
                id: `${+new Date()}`,
                text,
                position: 0,
                done: false,
            });
        };

        return (
            <AddInput onEnter={handleOnEnter}/>
        )
    }
}

export default AddTask