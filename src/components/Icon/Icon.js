import React from 'react'
import {library} from '@fortawesome/fontawesome-svg-core'
import {faEllipsisV, faTimes, faTrash} from '@fortawesome/free-solid-svg-icons'
import {faCheckCircle} from '@fortawesome/free-regular-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

library.add(faTrash, faCheckCircle, faEllipsisV, faTimes);

function Icon({icon, ...props}) {
    return <FontAwesomeIcon icon={icon} {...props} />
}

export default Icon