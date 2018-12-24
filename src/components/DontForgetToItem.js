import React, {useContext} from "react"
import {Draggable} from "react-beautiful-dnd"
import cx from "classnames"
import DontForgetToItemToggle from "./DontForgetToItemToggle"
import DontForgetToItemText from "./DontForgetToItemText"
import DontForgetToItemDelete from "./DontForgetToItemDelete"
import DontForgetToItemDragHandler from "./DontForgetToItemDragHandler"
import "../style/DontForgetToItem.css"
import {FilterContext} from "./Main/Filter";

function DontForgetToItem({id, position, text, done}) {

    const {activeFilter} = useContext(FilterContext);

    const visible = (done) => {
        switch (activeFilter) {
            case 'SHOW_ALL':
                return true;
            case 'SHOW_ACTIVE':
                return !done;
            case 'SHOW_COMPLETED':
                return done;
            default:
                return false;
        }
    };

    return (
        <Draggable draggableId={id} index={position}>
            {provided => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className={cx(
                        'dont-forget-to-item',
                        {hidden: !visible(done)},
                        {done}
                    )}>
                    <DontForgetToItemDragHandler {...provided.dragHandleProps} />
                    <DontForgetToItemToggle id={id} done={done}/>
                    <DontForgetToItemText id={id} text={text} done={done}/>
                    <DontForgetToItemDelete id={id} position={position}/>
                </div>
            )}
        </Draggable>
    )
}

export default DontForgetToItem