import React, {useContext} from 'react'
import {ApolloConsumer} from 'react-apollo'
import {DragDropContext} from 'react-beautiful-dnd'
import {MOVE_TASK} from './graphql'
import AddTask from './AddTask'
import TasksList, {TasksListContext} from './TasksList'
import Footer from './Footer'
import Filter, {FilterContextProvider} from './Filter'
import {AuthContext} from '../Auth'
import './style.css'

function Main() {
    const {token} = useContext(AuthContext);
    const {moveTasks} = useContext(TasksListContext);

    const onDragEnd = (result, {mutate}) => {
        const {source, destination} = result;
        if (token) {
            mutate({
                mutation: MOVE_TASK,
                variables: {
                    from: source.index,
                    to: destination.index,
                },
                context: {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                },
            });
        }
        moveTasks(source.index, destination.index);
    };

    return (
        <ApolloConsumer>
            {client => (
                <DragDropContext onDragEnd={result => onDragEnd(result, client)}>
                    <div className="dont-forget-to-container">
                        <FilterContextProvider>
                            <AddTask/>
                            <TasksList/>
                            <Footer/>
                            <Filter/>
                        </FilterContextProvider>
                    </div>
                </DragDropContext>
            )}
        </ApolloConsumer>
    )
}

export default Main




