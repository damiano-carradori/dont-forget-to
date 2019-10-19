import React, {createContext, PureComponent} from 'react'

export const TaskContext = createContext(null);

export class TaskContextProvider extends PureComponent {
    render() {
        const {id, position, text, done} = this.props;
        const context = {id, position, text, done};
        return (
            <TaskContext.Provider value={context}>
                {this.props.children}
            </TaskContext.Provider>
        );
    }
}