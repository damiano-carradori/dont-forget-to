import React  from "react"
import {Query} from "react-apollo";
import {DragDropContext} from "react-beautiful-dnd"
import _ from "lodash";
import gql from "graphql-tag";
import DontForgetToFilter from "./DontForgetToFilter"
import DontForgetToAdd from "./DontForgetToAdd"
import DontForgetToList from "./DontForgetToList"
import DontForgetToFooter from "./DontForgetToFooter"
import "../style/DontForgetToContainer.css"

const MOVE_TASK = gql`
    mutation MoveTask($from: Int!, $to: Int!) {
        moveTask(from: $from, to: $to) {
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

const DontForgetTo = (props) => {
    return (
        <Query query={GET_TOKEN}>
            {({data: {token}, client}) => (
                <DragDropContext onDragEnd={result => {
                    let {source, destination} = result;
                    client.mutate({
                        mutation: MOVE_TASK,
                        variables: {
                            from: source.index,
                            to: destination.index
                        },
                        context:{
                            headers: {
                                "Authorization": `Bearer ${token}`
                            }
                        }
                    });
                    const query = gql`
                        query GetTasks {
                            tasks @client {
                                id
                                position
                                text
                                done
                            }
                        }
                    `;
                    const previous = client.readQuery({ query });
                    let [others, movingTask] = _.partition(previous.tasks, task => task.position !== source.index);
                    others.splice(destination.index, 0, ...movingTask);
                    client.writeQuery({
                        query,
                        data: {
                            tasks: others.map((task, index) => ({
                                ...task,
                                ...(task.position !== index && {position: index})
                            }))
                        }
                    });
                }}>
                    <div className="dont-forget-to-container">
                        <DontForgetToAdd/>
                        <DontForgetToList/>
                        <DontForgetToFooter/>
                        <DontForgetToFilter/>
                    </div>
                </DragDropContext>
            )}
        </Query>
    )
};

export default DontForgetTo