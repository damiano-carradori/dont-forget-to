import React, { Component }from 'react'
import '../style/DontForgetToList.css'
import cx from 'classnames'
import { connect } from 'react-redux'
import DontForgetToItem from "./DontForgetToItem";
import _ from "lodash";

const mapStateToProps = state => {
    const filterTasks = ( tasks, filter ) =>{
        switch (filter) {
            case 'SHOW_ALL':
                return tasks;
            case 'SHOW_ACTIVE':
                return _.filter(state.tasks, task => !task.done );
            case 'SHOW_COMPLETED':
                return _.filter(state.tasks, task => task.done );
            default:
                return false;
        }
    };
    return {
        tasks : filterTasks(state.tasks, state.filter)
    }
};

class DontForgetToList extends Component {

    render(){
        let { tasks } = this.props;
        return(
            <div className={cx(
                'dont-forget-to-list',
                { empty: !tasks.length }
            )}>
                {tasks.map(
                    task =>
                        <DontForgetToItem
                            key={task.id}
                            {...task}
                        />
                )}
            </div>
        )
    }

}
DontForgetToList = connect(mapStateToProps)(DontForgetToList);
export default DontForgetToList