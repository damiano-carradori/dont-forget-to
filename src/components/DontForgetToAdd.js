import React from "react"
import {Mutation, Query} from "react-apollo";
import gql from "graphql-tag";
import "../style/DontForgetToAdd.css"

const ADD_TASK = gql`
    mutation AddTask($text: String!) {
        addTask(text: $text) {
            id
            position
            text
            done
        }
    }
`;

const GET_TOKEN = gql`
    {
        token @client
    }
`;

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
                        const query = gql`
                            query GetTasks {
                                tasks @client {
                                    id
                                    position
                                    text
                                    done
                                }
                            }
                        `;
                        const previous = cache.readQuery({ query });
                        cache.writeQuery({
                            query,
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