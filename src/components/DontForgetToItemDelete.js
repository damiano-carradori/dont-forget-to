import React from "react"
import {Mutation, Query} from "react-apollo"
import _ from "lodash"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {DELETE_TASK, GET_TOKEN, GET_TASKS} from "../graphql"

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
                    update={(cache) => {
                        const previous = cache.readQuery({query: GET_TASKS});
                        cache.writeQuery({
                            query: GET_TASKS,
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