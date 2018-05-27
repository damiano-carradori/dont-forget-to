import React, { Component } from 'react'
import DontForgetToItem from "./DontForgetToItem";
import _ from 'lodash'
import cx from 'classnames'

class DontForgetTo extends Component {
    constructor() {
        super();

        this.state = {
            tasks: [
                {
                    id: 0,
                    text: 'First to do item',
                    done: false
                }
            ]
        }

    }

    addTaks = e => {
        if (e.key === 'Enter') {
            e.stopPropagation();
            e.preventDefault();

            let text = e.target.value.trim();
            if(text) {
                let time = new Date();
                let newTask = {
                    id: time.getTime(),
                    text: text,
                    done: false
                };
                this.setState({
                    tasks: [newTask, ...this.state.tasks]
                });
            }
            e.target.value = ''
        }
    };

    taskDone = id => {
        let task = _.find(this.state.tasks, { 'id': id });
        let newList = _.remove(this.state.tasks, task => {
            return task.id !== id
        });
        task.done = true;
        this.setState({
            tasks: [...newList, task]
        });
    };

    removeTask = id => {
        this.setState({
            tasks: _.remove(this.state.tasks, task => {
                return task.id !== id
            })
        });
    };

    render() {
        let tasks = this.state.tasks;
        return (
            <div className="dont-forget-to-container">
                <input
                    type="text"
                    placeholder="write here and press Enter to remember"
                    onKeyDown={this.addTaks}
                />
                <div className={cx(
                    'dont-forget-to-list',
                    { empty: !tasks.length }
                )}>
                    {tasks.map(
                        task =>
                            <DontForgetToItem
                                key={task.id}
                                text={task.text}
                                done={task.done}
                                handleDone={() => this.taskDone( task.id )}
                                handleRemove={() => this.removeTask( task.id )}
                            />
                    )}
                </div>
                <div className="total-counter">
                    {tasks.length?
                        `${tasks.length} task${tasks.length>1?'s':''} left`:
                        <span>Great, you have accomplished all your tasks!<br/>Write on the box above and press ⏎ ( Enter ) to add a new task.</span>
                    }
                </div>
            </div>
        )
    }
}

export default DontForgetTo