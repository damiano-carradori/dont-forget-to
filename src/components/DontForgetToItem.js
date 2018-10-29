import React from 'react'
import { connect } from 'react-redux'
import cx from 'classnames'
import { Draggable } from "react-beautiful-dnd"
import '../style/DontForgetToItem.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DontForgetToItemToggle from "./DontForgetToItemToggle";
import DontForgetToItemText from "./DontForgetToItemText";
import DontForgetToItemDelete from "./DontForgetToItemDelete";

const mapStateToProps = state => {
    return {
        filter: state.filter
    }
};

const DontForgetToItem = ({filter, id, position, text, done}) => {
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
                    <div {...provided.dragHandleProps} className="drag-task">
                        <FontAwesomeIcon icon="ellipsis-v"/>
                    </div>
                    <DontForgetToItemToggle
                        id={id}
                        done={done}
                    />
                    <DontForgetToItemText
                        id={id}
                        text={text}
                        done={done}
                    />
                    <DontForgetToItemDelete
                        id={id}
                    />
                </div>
            )}
        </Draggable>
    )
};

export default connect(mapStateToProps)(DontForgetToItem)