import React from "react"
import {Mutation, Query} from "react-apollo"
import {ADD_TASK, GET_TOKEN, GET_TASKS} from "../graphql"
import "../style/DontForgetToAdd.css"

const DontForgetToAdd = (props) => {
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
        <Query query={GET_TOKEN}>
            {({data: {token}}) => (
                <Mutation
                    mutation={ADD_TASK}
                    update={(cache, { data: { addTask } })=>{
                        const previous = cache.readQuery({ GET_TASKS });
                        cache.writeQuery({
                            GET_TASKS,
                            data: {
                                tasks: [
                                    addTask,
                                    ...(previous.tasks.map(task=>({...task, position: task.position + 1})))
                                ]
                            }
                        });
                    }}
                    context={{
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    }}>
                    {(addTask, {loading, error}) => (
                        <input
                            className="dont-forget-to-add"
                            type="text"
                            placeholder="write here and press ⏎ ( Enter ) to add a new task"
                            onKeyDown={(e) => onEnter(e, addTask)}
                        />
                    )}
                </Mutation>
            )}
        </Query>
    )
};

export default DontForgetToAdd