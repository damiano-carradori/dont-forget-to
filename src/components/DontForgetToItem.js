import React from "react"
import {Query} from "react-apollo"
import {Draggable} from "react-beautiful-dnd"
import cx from "classnames"
import DontForgetToItemToggle from "./DontForgetToItemToggle"
import DontForgetToItemText from "./DontForgetToItemText"
import DontForgetToItemDelete from "./DontForgetToItemDelete"
import DontForgetToItemDragHandler from "./DontForgetToItemDragHandler"
import {GET_VISIBILITY_FILTER} from "../graphql"
import "../style/DontForgetToItem.css"

const DontForgetToItem = ({id, position, text, done}) => {
    const visible = (filter, done) => {
        switch (filter) {
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
        <Query query={GET_VISIBILITY_FILTER}>
            {({data: {filter}}) => (
                <Draggable draggableId={id} index={position}>
                    {provided => (
                        <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className={cx(
                                'dont-forget-to-item',
                                {hidden: !visible(filter, done)},
                                {done}
                            )}>
                            <DontForgetToItemDragHandler {...provided.dragHandleProps} />
                            <DontForgetToItemToggle id={id} done={done}/>
                            <DontForgetToItemText id={id} text={text} done={done}/>
                            <DontForgetToItemDelete id={id} position={position}/>
                        </div>
                    )}
                </Draggable>
            )}
        </Query>
    )
};

export default DontForgetToItem