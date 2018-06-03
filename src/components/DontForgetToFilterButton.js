import React  from 'react'
import { connect } from 'react-redux'
import cx from 'classnames'
import { setFilter } from '../actionCreators'

const mapStateToProps = ( state, props )=> {
    return {
        active: state.filter===props.filter
    }
};
const mapDispatchToProps = dispatch => {
    return {
        onFilterClick : filter => {
            dispatch(setFilter(filter))
        }
    }
};

let DontForgetToFilterButton = ({active, label, filter, onFilterClick}) => {
    return (
        <button
            className={cx(
                {active: active}
            )}
            onClick={() => onFilterClick(filter)}>
            {label}
        </button>
    )
};

export default connect(mapStateToProps,mapDispatchToProps)(DontForgetToFilterButton);