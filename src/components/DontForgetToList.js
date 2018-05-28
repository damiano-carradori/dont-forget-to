import React, { Component }from 'react'
import '../style/DontForgetToList.css'
import cx from 'classnames'
import DontForgetToItem from "./DontForgetToItem";

class DontForgetToList extends Component {

    render(){
        let { tasks, onToggleDone, onRemove } = this.props;
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
                            handleDone={() => onToggleDone( task.id )}
                            handleRemove={() => onRemove( task.id )}
                        />
                )}
            </div>
        )
    }

}

export default DontForgetToList