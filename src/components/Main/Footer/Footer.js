import React, {useContext} from 'react'
import _ from 'lodash'
import './style.css'
import {TasksListContext} from '../TasksList';

function Footer() {
    const {tasks} = useContext(TasksListContext);

    const total = _.size(_.filter(tasks, task => !task.done));

    return (
        <div className="dont-forget-to-footer">
            {total ?
                `${total} task${total > 1 ? 's' : ''} left` :
                <span>Great, you have accomplished all your tasks!</span>
            }
        </div>
    )
}

export default Footer