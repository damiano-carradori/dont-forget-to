import React, {useContext} from "react"
import {ApolloConsumer} from 'react-apollo'
import {DragDropContext} from "react-beautiful-dnd"

import _ from "lodash"
import DontForgetToAdd from "./DontForgetToAdd"
import DontForgetToList from "./DontForgetToList"
import DontForgetToFooter from "./DontForgetToFooter"
import {GET_TASKS, MOVE_TASK} from "../graphql"

import "../style/DontForgetToContainer.css"
import Filter from "./Main/Filter";
import {AuthContext} from "./Auth";

function DontForgetTo() {

    const {token} = useContext(AuthContext)

    const onDragEnd = (result, {mutate, readQuery, writeQuery}) => {
        const {source, destination} = result;
        if (token) {
            mutate({
                mutation: MOVE_TASK,
                variables: {
                    from: source.index,
                    to: destination.index
                },
                context: {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            });
        }

        const previous = readQuery({query: GET_TASKS});

        const [others, movingTask] = _.partition(previous.tasks, task => task.position !== source.index);
        others.splice(destination.index, 0, ...movingTask);

        writeQuery({
            query: GET_TASKS,
            data: {
                tasks: others.map((task, index) => ({
                    ...task,
                    ...(task.position !== index && {position: index})
                }))
            }
        });
    };

    return (
        <ApolloConsumer>
            {client => (
                <DragDropContext onDragEnd={result => onDragEnd(result, client)}>
                    <div className="dont-forget-to-container">
                        <DontForgetToAdd/>
                        <DontForgetToList/>
                        <DontForgetToFooter/>
                        <Filter/>
                    </div>
                </DragDropContext>
            )}
        </ApolloConsumer>
    )
}

export default DontForgetTo