import React from "react"
import { connect } from "react-redux"
import {Mutation} from "react-apollo";
import gql from "graphql-tag";
import {addTask} from "../actionCreators"
import "../style/DontForgetToAdd.css"

const ADD_TASK = gql`
    mutation AddTask($text: String!) {
        addTask(text: $text) {
            id
            position
            text
            done
        }
    }
`;

const mapStateToProps = state => {
    return {
        token : state.user.token
    }
};

const DontForgetToAdd = ({ token, dispatch }) => {
    const onEnter = (e, createTask) => {
        if (e.key === 'Enter') {
            e.stopPropagation();
            e.preventDefault();
            let text = e.target.value.trim();
            if (text) {
                createTask({
                    variables: {text}
                });
            }
            e.target.value = ''
        }
    };

    return (
        <Mutation
            mutation={ADD_TASK}
            onCompleted={(data) => {
                let task = data.addTask;
                dispatch(addTask(null, task.text));
            }}
            context={{
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }}>
            {(createTask, {loading, error}) => (
                <input
                    className="dont-forget-to-add"
                    type="text"
                    placeholder="write here and press ⏎ ( Enter ) to add a new task"
                    onKeyDown={(e) => onEnter(e, createTask)}
                />
            )}
        </Mutation>
    )
};

export default connect(mapStateToProps)(DontForgetToAdd)