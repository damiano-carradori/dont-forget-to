import React, {useContext} from 'react'
import {Mutation} from 'react-apollo'
import {debounce} from 'lodash'
import {EDIT_TASK, EDIT_TASK_CLIENT} from './graphql'
import {TaskContext} from '../TaskContext'
import {AuthContext} from '../../../../Auth'
import './style.css'
import {TasksListContext} from '../../TasksListContext';

function Text() {
    const {id, text, done} = useContext(TaskContext);
    const {token} = useContext(AuthContext);
    const {editTask} = useContext(TasksListContext);

    const WAIT_INTERVAL = 1000;

    const inputChange = (e, updateTask) => {
        let text = e.target.value;
        const debouncedUpdate = debounce(updateTask, WAIT_INTERVAL);
        debouncedUpdate(id, text);
    };

    if(token) {
        const handleMutationUpdate = (cache, {data: {updateTask}}) => {
            editTask(id, updateTask.text);
        };

        return (
            <Mutation
                mutation={token ? EDIT_TASK : EDIT_TASK_CLIENT}
                update={handleMutationUpdate}
                context={{
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                }}>
                {updateTask => (
                    <input defaultValue={text} type="text" disabled={done}
                           onKeyUp={(e) => inputChange(e, (id, text) => {
                               updateTask({
                                   variables: {id, text},
                                   optimisticResponse: {
                                       __typename: 'Mutation',
                                       updateTask: {
                                           __typename: 'Task',
                                           id,
                                           text,
                                       },
                                   },
                               });
                           })}/>
                )}
            </Mutation>
        );
    } else {
        return (
            <input defaultValue={text} type="text" disabled={done}
                   onKeyUp={(e) => inputChange(e, editTask)}/>
        );
    }
}

export default Text