import React from 'react'
import Icon from '../../../../Icon'
import './style.css'

const DragHandler = ({dragHandleProps}) => (
    <div {...dragHandleProps} className="drag-task">
        <Icon icon="ellipsis-v"/>
    </div>
);

export default DragHandler