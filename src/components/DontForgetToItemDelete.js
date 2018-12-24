import React from "react"
import {Mutation, Query} from "react-apollo"
import _ from "lodash"
import {DELETE_TASK, DELETE_TASK_CLIENT, GET_TOKEN, GET_TASKS} from "../graphql"
import Icon from "./Icon";

const DontForgetToItemDelete = ({id, position}) => {

    return (
        <Query query={GET_TOKEN}>
            {({data: {token}}) => (
                <Mutation
                    mutation={token?DELETE_TASK:DELETE_TASK_CLIENT}
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
                        <Icon
                            icon="trash"
                            className="delete-task"
                            onClick={() => deleteTask({variables: {id, position}})}/>
                    )}
                </Mutation>
            )}
        </Query>
    );
};

export default DontForgetToItemDelete