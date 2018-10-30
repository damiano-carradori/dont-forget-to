import React from "react"
import {Query} from "react-apollo";
import gql from "graphql-tag";
import _ from "lodash";
import "../style/DontForgetToFooter.css"

const GET_TASKS = gql`
    {
        tasks @client {
            done
        }
    }
`;

const DontForgetToFooter = (props) => {
    return (
        <Query query={GET_TASKS}>
            {({data: {tasks}}) => {
                let total = _.size(_.filter(tasks, task => !task.done));
                return (
                    <div className="dont-forget-to-footer">
                        {total ?
                            `${total} task${total > 1 ? 's' : ''} left` :
                            <span>Great, you have accomplished all your tasks!</span>
                        }
                    </div>
                )
            }}
        </Query>
    )
};

export default DontForgetToFooter

