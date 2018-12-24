import React, {createContext, PureComponent} from 'react'

export const TaskContext = createContext(null);

export class TaskContextProvider extends PureComponent {
    render() {
        const context = {id, position, text, done} = this.props;
        return (
            <TaskContext.Provider value={context}>
                {this.props.children}
            </TaskContext.Provider>
        );
    }
}