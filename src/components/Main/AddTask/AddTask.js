import React, {useContext} from 'react'
import {Mutation} from 'react-apollo'
import {ADD_TASK, ADD_TASK_CLIENT, GET_TASKS} from './graphql'
import {AuthContext} from '../../Auth'
import './style.css'

function AddTask() {
    const {token} = useContext(AuthContext);

    const onEnter = (e, addTask) => {
        if (e.key === 'Enter') {
            e.stopPropagation();
            e.preventDefault();
            let text = e.target.value.trim();
            if (text) {
                addTask({
                    variables: {text},
                    optimisticResponse: {
                        __typename: "Mutation",
                        addTask: {
                            __typename: "Task",
                            id: `${+new Date()}`,
                            position: 0,
                            text,
                            done: false
                        }
                    },
                });
            }
            e.target.value = ''
        }
    };

    return (
        <Mutation
            mutation={token ? ADD_TASK : ADD_TASK_CLIENT}
            update={(cache, {data: {addTask}}) => {
                const previous = cache.readQuery({query: GET_TASKS});
                cache.writeQuery({
                    query: GET_TASKS,
                    data: {
                        tasks: [
                            addTask,
                            ...(previous.tasks.map(task => ({...task, position: task.position + 1})))
                        ]
                    }
                });
            }}
            context={{
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }}>
            {addTask => (
                <input
                    className="dont-forget-to-add"
                    type="text"
                    placeholder="write here and press ⏎ ( Enter ) to add a new task"
                    onKeyDown={(e) => onEnter(e, addTask)}
                />
            )}
        </Mutation>
    )
}

export default AddTask