import React from "react";
import {connect} from "react-redux";
import {Mutation, Query} from "react-apollo";
import gql from "graphql-tag";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {toggleTask} from "../actionCreators";

const UPDATE_TASK = gql`
    mutation UpdateTask($id: ID!, $text: String, $done: Boolean) {
        updateTask(id: $id, text: $text, done: $done) {
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

const DontForgetToItemToggle = ({id, done, dispatch}) => {

    return (
        <Query query={GET_TOKEN}>
            {({data: {token}}) => (
                <Mutation
                    mutation={UPDATE_TASK}
                    onCompleted={(data) => {
                        let task = data.updateTask;
                        dispatch(toggleTask(null, id, task.done))
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
                            onClick={() => updateTask({variables: {id, done: !done}})}/>
                    )}
                </Mutation>
            )}
        </Query>
    );
};

export default connect()(DontForgetToItemToggle)