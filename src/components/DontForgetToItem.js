import React, { Component }from 'react'
import '../style/DontForgetToItem.css'

class DontForgetToItem extends Component {

    removeTask = id =>{
        this.props.handleRemove( id );
    }

    render(){
        let { handleRemove } = this.props;
        return(
            <div className="dont-forget-to-item">
                <input type="checkbox"/>
                <span>{this.props.text}</span>
                <button onClick={handleRemove}>Delete</button>
            </div>
        )
    }

}

export default DontForgetToItem