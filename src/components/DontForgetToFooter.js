import React, { Component }from 'react'
import '../style/DontForgetToFooter.css'

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

export default DontForgetToFooter

