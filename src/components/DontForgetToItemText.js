import React from "react"
import {Mutation, Query} from "react-apollo"
import {EDIT_TASK, EDIT_TASK_CLIENT, GET_TOKEN, TEXT_TASK_FRAGMENT} from "../graphql"

const DontForgetToItemText = ({id, text, done}) => {

    const WAIT_INTERVAL = 1000;
    let timer = null;

    const inputChange = (e, updateTask) => {
        let text = e.target.value;
        clearTimeout(timer);
        timer = setTimeout(() => {
            updateTask({
                variables: {id, text},
                optimisticResponse: {
                    __typename: "Mutation",
                    updateTask: {
                        __typename: "Task",
                        id,
                        text
                    }
                }
            });
        }, WAIT_INTERVAL);
    };

    return (
        <Query query={GET_TOKEN}>
            {({data: {token}}) => (
                <Mutation
                    mutation={token?EDIT_TASK:EDIT_TASK_CLIENT}
                    update={(cache, {data: {updateTask}}) => {
                        const id = `Task:${updateTask.id}`;
                        const task = cache.readFragment({fragment: TEXT_TASK_FRAGMENT, id});
                        const data = {...task, text: updateTask.text};
                        cache.writeFragment({fragment: TEXT_TASK_FRAGMENT, id, data});
                    }}
                    context={{
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    }}>
                    {(updateTask, {loading, error}) => (
                        <input defaultValue={text} type="text" disabled={done}
                               onKeyUp={(e) => inputChange(e, updateTask)}/>
                    )}
                </Mutation>
            )}
        </Query>
    );
};

export default DontForgetToItemText