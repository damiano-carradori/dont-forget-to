import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash';
import '../style/DontForgetToFooter.css'

const mapStateToProps = state => {
    return {
        total : _.size(_.filter(state.tasks, task => !task.done ))
    }
};

let DontForgetToFooter = ({ total }) => {
    return (
        <div className="dont-forget-to-footer">
            {total ?
                `${total} task${total > 1 ? 's' : ''} left` :
                <span>Great, you have accomplished all your tasks!</span>
            }
        </div>
    )
};

export default connect(mapStateToProps)(DontForgetToFooter)

