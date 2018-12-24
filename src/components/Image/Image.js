import React, {memo} from 'react'
import userImage from '../../images/user.png'

function Image({user, ...props}) {
    const src = !user || !user.profile_picture ? userImage : user.profile_picture;

    return <img
        {...props}
        src={src}
        alt="User profile pic"/>
}

export default memo(Image)