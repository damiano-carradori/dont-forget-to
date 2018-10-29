import React from "react";
import {connect} from "react-redux";
import {Mutation} from "react-apollo";
import gql from "graphql-tag";
import {editTask} from "../actionCreators";

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

const mapStateToProps = state => {
    return {
        token: state.user.token
    }
};

const DontForgetToItemText = ({id, text, done, token, dispatch}) => {

    const WAIT_INTERVAL = 1000;
    let timer = null;

    const inputChange = (e, updateTask) => {
        let text = e.target.value;
        clearTimeout(timer);
        timer = setTimeout(() => {
            updateTask({variables: {id, text}});
        }, WAIT_INTERVAL);
    };

    return (
        <Mutation
            mutation={UPDATE_TASK}
            onCompleted={(data) => {
                let task = data.updateTask;
                dispatch(editTask(null, id, task.text))
            }}
            context={{
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }}>
            {(updateTask, {loading, error}) => (
                <input defaultValue={text} type="text" disabled={done} onKeyUp={(e) => inputChange(e, updateTask)}/>
            )}
        </Mutation>
    );
};

export default connect(mapStateToProps)(DontForgetToItemText)