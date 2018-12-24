import React from "react";
import Icon from "./Icon/";

const DontForgetToItemDragHandler = (props) => (
    <div {...props} className="drag-task">
        <Icon icon="ellipsis-v"/>
    </div>
);

export default DontForgetToItemDragHandler