import React from 'react'
import Button from './Button'
import './style.css'

function Filter() {
    return (
        <div className="dont-forget-to-filter">
            <Button label="All" filter="SHOW_ALL"/>
            <Button label="Active" filter="SHOW_ACTIVE"/>
            <Button label="Completed" filter="SHOW_COMPLETED"/>
        </div>
    )
}

export default Filter