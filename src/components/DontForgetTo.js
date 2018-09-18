import React  from 'react'
import { connect } from 'react-redux';
import DontForgetToFilter from "./DontForgetToFilter";
import DontForgetToAdd from "./DontForgetToAdd";
import DontForgetToList from "./DontForgetToList";
import DontForgetToFooter from "./DontForgetToFooter";
import { DragDropContext } from "react-beautiful-dnd"
import '../style/DontForgetToContainer.css'
import { reorderTasks } from "../actionCreators";

const mapStateToProps = state => {
    return {
        filter : state.filter
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onReorder: (source, destination, filter) => {
            dispatch(reorderTasks(source, destination, filter))
        }
    }
};

let DontForgetTo = ({ onReorder, filter }) => {
    return (
        <DragDropContext onDragEnd={result => {
            let {source, destination} = result;
            onReorder(source, destination, filter);
        }}>
            <div className="dont-forget-to-container">
                <DontForgetToAdd/>
                <DontForgetToList/>
                <DontForgetToFooter/>
                <DontForgetToFilter/>
            </div>
        </DragDropContext>
    )
};

export default connect(mapStateToProps,mapDispatchToProps)(DontForgetTo)