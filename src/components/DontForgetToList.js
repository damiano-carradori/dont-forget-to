import React from 'react'
import { connect } from 'react-redux'
import { Droppable } from "react-beautiful-dnd"
import cx from 'classnames'
import DontForgetToItem from "./DontForgetToItem";
import '../style/DontForgetToList.css'

const mapStateToProps = state => {
    return {
        tasks : state.tasks
    }
};

const DontForgetToList = ({tasks}) => {
    return (
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
    )
};

export default connect(mapStateToProps)(DontForgetToList)