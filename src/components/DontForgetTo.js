import React, { Component } from 'react'
import DontForgetToItem from "./DontForgetToItem";
import _ from 'lodash'

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
        // this.setState()
        if (e.key === 'Enter') {
            e.preventDefault();
            e.stopPropagation();
            let time = new Date();
            let newTask = {
                id: time.getTime(),
                text: e.target.value,
                done: false
            };
            this.setState({
                tasks: [newTask, ...this.state.tasks]
            });
            e.target.value = ''
        }
    };

    removeTask = id => {
        this.setState({
            tasks: _.remove(this.state.tasks, task => {
                return task.id !== id
            })
        });
        console.log(id)
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
                <div className="dont-forget-to-list">
                    {tasks.map(
                        task =>
                            <DontForgetToItem
                                key={task.id}
                                text={task.text}
                                done={task.done}
                                handleRemove={() => this.removeTask( task.id )}
                            />
                    )}
                </div>
            </div>
        )
    }
}

export default DontForgetTo