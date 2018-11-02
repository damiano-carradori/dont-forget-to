import React from "react"
import {Query} from "react-apollo"
import {Droppable} from "react-beautiful-dnd"
import cx from "classnames"
import DontForgetToItem from "./DontForgetToItem"
import {GET_TASKS} from "../graphql"
import "../style/DontForgetToList.css"

const DontForgetToList = (props) => {
    return (
        <Query query={GET_TASKS}>
            {({data: {tasks}}) => (
                <Droppable droppableId="dont-forget-to-list">
                    {provided => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className={cx(
                                'dont-forget-to-list',
                                {empty: !tasks.length}
                            )}>
                            {tasks.map(
                                task =>
                                    <DontForgetToItem
                                        key={task.id}
                                        {...task}
                                    />
                            )}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            )}
        </Query>
    )
};

export default DontForgetToList