import React, {useContext} from 'react'
import cx from 'classnames'
import {FilterContext} from '../FilterContext'

function Button({label, filter}) {
    const {activeFilter, changeFilter} = useContext(FilterContext);

    return <button
        className={cx(
            {active: activeFilter === filter}
        )}
        onClick={() => changeFilter(filter)}>
        {label}
    </button>
}

export default Button