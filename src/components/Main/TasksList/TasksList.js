import React, {useContext} from 'react'
import {Droppable} from 'react-beautiful-dnd'
import cx from 'classnames'
import Task from './Task'
import {TasksListContext} from './TasksListContext'
import './style.css'

function TasksList() {
    const {tasks} = useContext(TasksListContext);

    return (
        <Droppable droppableId="dont-forget-to-list">
            {provided => (
                <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={cx(
                        'dont-forget-to-list',
                        {empty: !tasks.length},
                    )}>
                    {tasks.map(
                        task =>
                            <Task
                                key={task.id}
                                {...task}
                            />
                    )}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    )
}

export default TasksList