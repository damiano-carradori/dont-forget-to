import React, {useContext} from 'react'
import {ApolloConsumer} from 'react-apollo'
import {DragDropContext} from 'react-beautiful-dnd'
import _ from 'lodash'

import {GET_TASKS, MOVE_TASK} from './graphql'

import DontForgetToList from "./TasksList"
import DontForgetToFooter from "./DontForgetToFooter"

import AddTask from './AddTask'

import Filter, {FilterContextProvider} from './Filter'

import {AuthContext} from '../Auth'

import './style.css'

function Main() {

    const {token} = useContext(AuthContext);

    const onDragEnd = (result, {mutate, readQuery, writeQuery}) => {
        const {source, destination} = result;
        if (token) {
            mutate({
                mutation: MOVE_TASK,
                variables: {
                    from: source.index,
                    to: destination.index
                },
                context: {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            });
        }

        const previous = readQuery({query: GET_TASKS});

        const [others, movingTask] = _.partition(previous.tasks, task => task.position !== source.index);
        others.splice(destination.index, 0, ...movingTask);

        writeQuery({
            query: GET_TASKS,
            data: {
                tasks: others.map((task, index) => ({
                    ...task,
                    ...(task.position !== index && {position: index})
                }))
            }
        });
    };

    return (
        <ApolloConsumer>
            {client => (
                <DragDropContext onDragEnd={result => onDragEnd(result, client)}>
                    <div className="dont-forget-to-container">
                        <FilterContextProvider>
                            <AddTask/>
                            <DontForgetToList/>
                            <DontForgetToFooter/>
                            <Filter/>
                        </FilterContextProvider>
                    </div>
                </DragDropContext>
            )}
        </ApolloConsumer>
    )
}

export default Main




