import React from "react";
import {connect} from "react-redux";
import {Mutation, Query} from "react-apollo";
import gql from "graphql-tag";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {deleteTask} from "../actionCreators";

const DELETE_TASK = gql`
    mutation DeleteTask($id: ID!) {
        deleteTask(id: $id) {
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

const DontForgetToItemDelete = ({id, dispatch}) => {

    return (
        <Query query={GET_TOKEN}>
            {({data: {token}}) => (
                <Mutation
                    mutation={DELETE_TASK}
                    onCompleted={(data) => {
                        dispatch(deleteTask(null, id))
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

export default connect(mapStateToProps)(DontForgetToItemDelete)