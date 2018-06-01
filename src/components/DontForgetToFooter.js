import React, { Component }from 'react'
import '../style/DontForgetToFooter.css'
import _ from 'lodash';
import { connect } from 'react-redux'

const mapStateToProps = state => {
    return {
        total : _.size(_.filter(state.tasks, task => !task.done ))
    }
};

class DontForgetToFooter extends Component {

    render(){
        let { total } = this.props;
        return(
            <div className="dont-forget-to-footer">
                {total?
                    `${total} task${total>1?'s':''} left`:
                    <span>Great, you have accomplished all your tasks!<br/>Write on the box above and press ⏎ ( Enter ) to add a new task.</span>
                }
            </div>
        )
    }

}
DontForgetToFooter = connect(mapStateToProps)(DontForgetToFooter);

export default DontForgetToFooter

