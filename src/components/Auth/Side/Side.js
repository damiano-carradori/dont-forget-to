import React, {useContext} from 'react'
import cx from 'classnames'
import User from './User'
import SignIn from './SignIn'
import SignUp from './SignUp'
import {AuthContext} from '../AuthContext'
import Icon from '../../Icon'
import './style.css'

function Side() {
    const {token, signup, side, toggleSide} = useContext(AuthContext);

    const className = cx(
        "dont-forget-to-sign-in-side",
        {open: side}
    );

    const content = token !== null ?
        <User/> :
        !signup ?
            <SignIn/> :
            <SignUp/>;

    return (
        <div className={className}>
            <Icon className="close-side" icon="times" onClick={toggleSide}/>
            {content}
        </div>
    )
}

export default Side