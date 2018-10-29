import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const DontForgetToItemDragHandler = (props) => (
    <div {...props} className="drag-task">
        <FontAwesomeIcon icon="ellipsis-v"/>
    </div>
);

export default DontForgetToItemDragHandler