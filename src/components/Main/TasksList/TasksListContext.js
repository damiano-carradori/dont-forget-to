import React, {createContext, PureComponent} from 'react'
import _ from 'lodash';

export const TasksListContext = createContext(null);

export class TasksListContextProvider extends PureComponent {
    constructor(props) {
        super(props);
        this.newTask = this.newTask.bind(this);
        this.resetTasks = this.resetTasks.bind(this);
        this.moveTasks = this.moveTasks.bind(this);
        this.toggleTask = this.toggleTask.bind(this);
        this.editTask = this.editTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.state = {
            tasks: [],
            newTask: this.newTask,
            resetTasks: this.resetTasks,
            moveTasks: this.moveTasks,
            toggleTask: this.toggleTask,
            editTask: this.editTask,
            deleteTask: this.deleteTask,
        }
    }

    newTask(task) {
        const {tasks} = this.state;
        const updatedTasks = [
            task,
            ...(tasks.map(task => ({...task, position: task.position + 1}))),
        ];
        this.setState({
            tasks: updatedTasks,
        })
    }

    resetTasks(tasks = []) {
        this.setState({tasks})
    }

    moveTasks(from, to) {
        const {tasks} = this.state;
        const [others, movingTask] = _.partition(tasks, task => task.position !== from);
        others.splice(to, 0, ...movingTask);

        this.setState({
            tasks: others.map((task, index) => ({
                ...task,
                ...(task.position !== index && {position: index}),
            })),
        })
    }

    toggleTask(id) {
        const {tasks} = this.state;

        this.setState({
            tasks: tasks.map(task => ({
                ...task,
                ...(task.id === id && {done: !task.done}),
            })),
        })
    }

    editTask(id, text) {
        const {tasks} = this.state;

        this.setState({
            tasks: tasks.map(task => ({
                ...task,
                ...(task.id === id && {text}),
            })),
        })
    }

    deleteTask(id, position) {
        const {tasks} = this.state;
        const remainingTasks = _.filter(
            tasks.map(task => ({
                ...task,
                ...(task.position > position && {position: task.position - 1}),
            })),
            task => task.id !== id,
        );

        this.setState({
            tasks: remainingTasks,
        })
    }

    render() {
        const {children} = this.props;
        return (
            <TasksListContext.Provider value={this.state}>
                {children}
            </TasksListContext.Provider>
        );
    }
}