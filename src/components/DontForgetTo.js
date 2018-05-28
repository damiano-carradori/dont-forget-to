import React, { Component } from 'react'
import _ from 'lodash'
import DontForgetToAdd from "./DontForgetToAdd";
import DontForgetToFooter from "./DontForgetToFooter";
import DontForgetToList from "./DontForgetToList";

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
        task.done = !task.done;
        if(task.done) {
            this.setState({
                tasks: [...newList, task]
            });
        } else {
            this.setState({
                tasks: [task, ...newList]
            });
        }
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
        let to_do = _.size(_.filter(tasks, task => !task.done ));
        return (
            <div className="dont-forget-to-container">
                <DontForgetToAdd handleAdd={(e) => { this.addTaks(e) }}/>
                <DontForgetToList
                    tasks={tasks}
                    onToggleDone={ id => id}
                    onRemove={ id => id}
                />
                <DontForgetToFooter total={to_do}/>
            </div>
        )
    }
}

export default DontForgetTo