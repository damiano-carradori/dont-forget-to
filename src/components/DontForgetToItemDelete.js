import React from "react";
import {Mutation, Query} from "react-apollo";
import gql from "graphql-tag";
import _ from "lodash";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const DELETE_TASK = gql`
    mutation DeleteTask($id: ID!) {
        deleteTask(id: $id) {
            id
            position
        }
    }
`;

const GET_TOKEN = gql`
    {
        token @client
    }
`;

const DontForgetToItemDelete = ({id, position}) => {

    return (
        <Query query={GET_TOKEN}>
            {({data: {token}}) => (
                <Mutation
                    mutation={DELETE_TASK}
                    ignoreResults={true}
                    optimisticResponse={{
                        __typename: "Mutation",
                        deleteTask: {
                            __typename: "Task",
                            id,
                            position
                        }
                    }}
                    update={(cache)=>{
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
                                tasks: _.filter(
                                    previous.tasks.map(task => ({
                                        ...task,
                                        ...(task.position > position && {position: task.position - 1})
                                    })),
                                    task => task.id !== id
                                )
                            }
                        });
                    }}
                    context={{
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    }}>
                    {(deleteTask, {loading, error}) => (
                        <FontAwesomeIcon
                            icon="trash"
                            className="delete-task"
                            onClick={() => deleteTask({variables: {id}})}/>
                    )}
                </Mutation>
            )}
        </Query>
    );
};

export default DontForgetToItemDelete