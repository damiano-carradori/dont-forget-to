import React, {useContext} from 'react'
import {AuthContext} from '../AuthContext'
import Image from '../../Image'
import './style.css'

function UserBadge() {
    const {user, toggleSide} = useContext(AuthContext);

    return (
        <div className="dont-forget-to-sign-in" onClick={toggleSide}>
            <div className="user-name">{!user ? 'Log in' : user.username}</div>
            <Image user={user}/>
        </div>
    )
}

export default UserBadge