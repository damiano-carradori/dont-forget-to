import React from "react"
import {Mutation, Query} from "react-apollo"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {TOGGLE_TASK, GET_TOKEN, DONE_TASK_FRAGMENT} from "../graphql"

const DontForgetToItemToggle = ({id, done}) => {

    return (
        <Query query={GET_TOKEN}>
            {({data: {token}}) => (
                <Mutation
                    mutation={TOGGLE_TASK}
                    update={(cache, {data: {updateTask}}) => {
                        const id = `Task:${updateTask.id}`;
                        const task = cache.readFragment({DONE_TASK_FRAGMENT, id});
                        const data = {...task, done: updateTask.done};
                        cache.writeFragment({DONE_TASK_FRAGMENT, id, data});
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