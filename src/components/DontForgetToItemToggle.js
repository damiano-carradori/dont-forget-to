import React from "react";
import {Mutation, Query} from "react-apollo";
import gql from "graphql-tag";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const UPDATE_TASK = gql`
    mutation UpdateTask($id: ID!, $text: String, $done: Boolean) {
        updateTask(id: $id, text: $text, done: $done) {
            id
            done
        }
    }
`;

const GET_TOKEN = gql`
    {
        token @client
    }
`;

const DontForgetToItemToggle = ({id, done}) => {

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
                        const data = { ...task, done: updateTask.done};
                        cache.writeFragment({ fragment, id, data });
                    }}
                    context={{
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    }}>
                    {(updateTask, {loading, error}) => (
                        <FontAwesomeIcon
                            icon={['far', 'check-circle']}
                            className="toggle-task"
                            onClick={() => updateTask({
                                variables: {id, done: !done},
                                optimisticResponse: {
                                    __typename: "Mutation",
                                    updateTask: {
                                        __typename: "Task",
                                        id,
                                        done: !done
                                    }
                                }
                            })}/>
                    )}
                </Mutation>
            )}
        </Query>
    );
};

export default DontForgetToItemToggle