import React, {useContext} from 'react'
import {Query} from 'react-apollo'
import {GET_ME} from './graphql'
import Image from '../../../Image'
import {AuthContext} from '../../AuthContext'
import {TasksListContext} from '../../../Main/TasksList';
import './style.css'

function User() {
    const {setUser, token, setToken} = useContext(AuthContext);
    const {resetTasks} = useContext(TasksListContext);

    const logout = () => {
        setToken(null);
        setUser(null);
        resetTasks();
    };

    return (
        <Query
            query={GET_ME}
            fetchPolicy="network-only"
            context={{
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            }}>
            {({loading, error, data: {me}}) => {
                return (
                    <div className="dont-forget-to-sign-in-user">
                        <Image className="dont-forget-to-sign-in-user-profile-picture"
                               user={me}/>
                        <div className="user-name">{loading ? '' : me.username}</div>
                        <button onClick={logout}>Sign Out</button>
                    </div>
                );
            }}
        </Query>
    )
}

export default User