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
        token: state.user.token
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onReorder: (source, destination, token) => {
            dispatch(reorderTasks(source, destination, token))
        }
    }
};

const DontForgetTo = ({ token, onReorder }) => {
    return (
        <DragDropContext onDragEnd={result => {
            let {source, destination} = result;
            onReorder(source, destination, token);
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