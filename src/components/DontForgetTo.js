import React, { Component } from 'react'
import _ from 'lodash'
import DontForgetToAdd from "./DontForgetToAdd";
import DontForgetToFooter from "./DontForgetToFooter";
import DontForgetToList from "./DontForgetToList";

class DontForgetTo extends Component {

    addTaks = e => {
        if (e.key === 'Enter') {
            e.stopPropagation();
            e.preventDefault();

            let text = e.target.value.trim();
            if(text) {
                let time = new Date();
                this.props.dispatch({
                    type: 'ADD_TASK',
                    text: text,
                    id: time.getTime()
                });
            }
            e.target.value = ''
        }
    };
    render() {
        let tasks = this.props.tasks;
        let to_do = _.size(_.filter(tasks, task => !task.done ));
        return (
            <div className="dont-forget-to-container">
                <DontForgetToAdd handleAdd={(e) => { this.addTaks(e) }}/>
                <DontForgetToList
                    tasks={tasks}
                    onToggleDone={ id => this.props.dispatch({
                        type: 'TOGGLE_TASK',
                        id
                    })}
                    onRemove={ id => this.props.dispatch({
                        type: 'DELETE_TASK',
                        id
                    })}
                />
                <DontForgetToFooter total={to_do}/>
            </div>
        )
    }
}

export default DontForgetTo