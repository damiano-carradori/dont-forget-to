import React, { Component } from 'react'
import { connect } from 'react-redux'
import cx from 'classnames'

const mapStateToProps = ( state, props )=> {
    return {
        active: state.filter===props.filter
    }
};
const mapDispatchToProps = dispatch => {
    return {
        setFilter : filter => {
            dispatch({
                type : 'SET_FILTER',
                filter
            })
        }
    }
};

class DontForgetToFilterButton extends Component {

    render() {
        let {active, label, filter, setFilter} = this.props;
        return (
            <button className={cx(
                { active : active}
            )}
                onClick={() => setFilter(filter)}>
                {label}
            </button>
        )

    }
}
DontForgetToFilterButton = connect(mapStateToProps,mapDispatchToProps)(DontForgetToFilterButton);

export default DontForgetToFilterButton