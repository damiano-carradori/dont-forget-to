import React, {useContext} from 'react'
import {Draggable} from 'react-beautiful-dnd'
import cx from 'classnames'
import DragHandler from './DragHandler'
import Toggle from './Toggle'
import Text from './Text'
import Delete from './Delete'
import {TaskContextProvider} from './TaskContext'
import {FilterContext} from '../../Filter'
import './style.css'

function DontForgetToItem({id, position, text, done}) {

    const {activeFilter} = useContext(FilterContext);

    const visible = done => {
        switch (activeFilter) {
            case 'SHOW_ALL':
                return true;
            case 'SHOW_ACTIVE':
                return !done;
            case 'SHOW_COMPLETED':
                return done;
            default:
                return false
        }
    };

    return (
        <Draggable draggableId={id} index={position}>
            {provided => (
                <TaskContextProvider id={id} positon={position} text={text} done={done}>
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={cx(
                            'dont-forget-to-item',
                            {hidden: !visible(done)},
                            {done},
                        )}>
                        <DragHandler dragHandleProps={provided.dragHandleProps}/>

                        <Toggle/>
                        <Text/>
                        <Delete/>
                    </div>
                </TaskContextProvider>
            )}
        </Draggable>
    )
}

export default DontForgetToItem