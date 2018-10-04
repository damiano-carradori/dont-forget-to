import React from 'react'
import { connect } from 'react-redux'
import { newTask } from '../actionCreators'
import '../style/DontForgetToAdd.css'
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const ADD_TASK = gql`
    mutation AddTask($text: String!) {
        addTask(text: $text) {
            _id
            text
            done
        }
    }
`;

let DontForgetToAdd = ({ dispatch }) => {
    return(
        <Mutation mutation={ADD_TASK}>
            {(addTask) => (
                <input
                    className="dont-forget-to-add"
                    type="text"
                    placeholder="write here and press ⏎ ( Enter ) to add a new task"
                    onKeyDown={ e => {
                        if (e.key === 'Enter') {
                            e.stopPropagation();
                            e.preventDefault();
                            let text = e.target.value.trim();
                            if(text) {
                                addTask({ variables: { text } }).then(
                                    response => {
                                        let task = response.data.addTask;
                                        dispatch(newTask(task._id,text));
                                        console.log(task)
                                    }
                                );
                            }
                            e.target.value = ''
                        }
                    } }
                />
            )}
        </Mutation>
    )
};

export default connect()(DontForgetToAdd)