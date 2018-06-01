import React, { Component }from 'react'
import '../style/DontForgetToItem.css'
import cx from 'classnames'
import { connect } from 'react-redux'

const mapDispatchToProps = dispatch => {
    return {
        handleDone : id => {
            dispatch({
                type: 'TOGGLE_TASK',
                id
            })
        },
        handleRemove : id => {
            dispatch({
                type: 'DELETE_TASK',
                id
            })
        }
    }
};

class DontForgetToItem extends Component {

    render(){
        let { id, done, text, handleDone, handleRemove } = this.props;
        return(
            <div className={cx(
                'dont-forget-to-item',
                { done : done }
            )}>
                <input type="checkbox" defaultChecked={done} onChange={() => handleDone(id)}/>
                <span>{text}</span>
                <button onClick={() => handleRemove(id)}>Delete</button>
            </div>
        )
    }

}
DontForgetToItem = connect(null,mapDispatchToProps)(DontForgetToItem);

export default DontForgetToItem