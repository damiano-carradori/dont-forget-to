import React from "react";
import {connect} from "react-redux";
import {Mutation} from "react-apollo";
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

const mapStateToProps = state => {
    return {
        token: state.user.token
    }
};

const DontForgetToItemDelete = ({id, token, dispatch}) => {

    return (
        <Mutation
            mutation={DELETE_TASK}
            onCompleted={(data)=>{
                dispatch(deleteTask(null, id))
            }}
            context={{
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }}>
            {(deleteTask, { loading, error }) => (
                <FontAwesomeIcon
                    icon="trash"
                    className="delete-task"
                    onClick={() => deleteTask({variables: {id}})}/>
            )}
        </Mutation>
    );
};

export default connect(mapStateToProps)(DontForgetToItemDelete)