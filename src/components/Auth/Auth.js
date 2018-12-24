import React, {Fragment} from 'react'
import Side from './Side'
import UserBadge from './UserBadge'

function Auth() {
    return (
        <Fragment>
            <UserBadge/>
            <Side/>
        </Fragment>
    )
}

export default Auth