import React, { Component }from 'react'
import '../style/DontForgetToItem.css'
import cx from 'classnames'

class DontForgetToItem extends Component {

    render(){
        let { handleDone, handleRemove } = this.props;
        return(
            <div className={cx(
                'dont-forget-to-item',
                { done : this.props.done }
            )}>
                <input type="checkbox" onChange={handleDone}/>
                <span>{this.props.text}</span>
                <button onClick={handleRemove}>Delete</button>
            </div>
        )
    }

}

export default DontForgetToItem