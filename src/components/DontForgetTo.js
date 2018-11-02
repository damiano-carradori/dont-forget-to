import React  from "react"
import {Query} from "react-apollo";
import {DragDropContext} from "react-beautiful-dnd"
import _ from "lodash";
import DontForgetToFilter from "./DontForgetToFilter"
import DontForgetToAdd from "./DontForgetToAdd"
import DontForgetToList from "./DontForgetToList"
import DontForgetToFooter from "./DontForgetToFooter"
import {MOVE_TASK, GET_TOKEN, GET_TASKS} from "../graphql"
import "../style/DontForgetToContainer.css"

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
                    const previous = client.readQuery({ GET_TASKS });
                    let [others, movingTask] = _.partition(previous.tasks, task => task.position !== source.index);
                    others.splice(destination.index, 0, ...movingTask);
                    client.writeQuery({
                        GET_TASKS,
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