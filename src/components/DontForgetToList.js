import React from 'react'
import { connect } from 'react-redux'
import _ from "lodash";
import cx from 'classnames'
import DontForgetToItem from "./DontForgetToItem";
import '../style/DontForgetToList.css'

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

let DontForgetToList = ({tasks}) => {
    return (
        <div
            className={cx(
                'dont-forget-to-list',
                {empty: !tasks.length}
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
};

export default connect(mapStateToProps)(DontForgetToList)