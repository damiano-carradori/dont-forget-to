import React, { Component }from 'react'
import '../style/DontForgetToAdd.css'

class DontForgetToAdd extends Component {

    render(){
        let { handleAdd } = this.props;
        return(
            <input
                className="dont-forget-to-add"
                type="text"
                placeholder="write here and press Enter to remember"
                onKeyDown={handleAdd}
            />
        )
    }

}

export default DontForgetToAdd