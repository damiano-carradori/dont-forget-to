import React from "react";
import {Mutation, Query} from "react-apollo";
import gql from "graphql-tag";

const UPDATE_TASK = gql`
    mutation UpdateTask($id: ID!, $text: String, $done: Boolean) {
        updateTask(id: $id, text: $text, done: $done) {
            id
            text
        }
    }
`;

const GET_TOKEN = gql`
    {
        token @client
    }
`;

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
                    mutation={UPDATE_TASK}
                    update={(cache, { data: { updateTask }})=>{
                        const id = `Task:${updateTask.id}`;
                        const fragment = gql`
                           fragment taskText on Task {
                             text
                           }
                        `;
                        const task = cache.readFragment({ fragment, id });
                        const data = { ...task, text: updateTask.text};
                        cache.writeFragment({ fragment, id, data });
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