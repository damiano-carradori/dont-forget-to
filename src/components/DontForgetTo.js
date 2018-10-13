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
        user: state.user
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onReorder: (source, destination, user) => {
            dispatch(reorderTasks(source, destination, user))
        }
    }
};

const DontForgetTo = ({ onReorder, user }) => {
    return (
        <DragDropContext onDragEnd={result => {
            let {source, destination} = result;
            onReorder(source, destination, user);
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