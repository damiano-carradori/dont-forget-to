import React, {useContext} from 'react'
import {Query} from 'react-apollo'
import {GET_ME} from './graphql'
import {AuthContext} from '../../AuthContext'
import Image from '../../../Image'
import './style.css'


function User() {
    const {token} = useContext(AuthContext);

    const logout = client => client.writeData({data: {token: null, user: null, tasks: []}});

    return (
        <Query
            query={GET_ME}
            fetchPolicy="network-only"
            context={{
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }}>
            {({loading, error, data: {me}, client}) => {
                return (
                    <div className="dont-forget-to-sign-in-user">
                        <Image className="dont-forget-to-sign-in-user-profile-picture"
                               user={me}/>
                        <div className="user-name">{loading ? '' : me.username}</div>
                        <button onClick={() => logout(client)}>Sign Out</button>
                    </div>
                );
            }}
        </Query>
    )
}

export default User