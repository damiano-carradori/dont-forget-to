import React from "react"
import {Query} from "react-apollo"
import {Droppable} from "react-beautiful-dnd"
import gql from "graphql-tag";
import cx from "classnames"
import DontForgetToItem from "./DontForgetToItem";
import "../style/DontForgetToList.css"

const GET_TASKS = gql`
    {
        tasks @client {
            id
            position
            text
            done
        }
    }
`;

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