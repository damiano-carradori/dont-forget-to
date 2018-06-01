import React from 'react'
import '../style/DontForgetToAdd.css'
import { connect } from 'react-redux'

let DontForgetToAdd = ({ dispatch }) => {
    const addTaks = e => {
        if (e.key === 'Enter') {
            e.stopPropagation();
            e.preventDefault();

            let text = e.target.value.trim();
            if(text) {
                let time = new Date();
                dispatch({
                    type: 'ADD_TASK',
                    text: text,
                    id: time.getTime()
                });
            }
            e.target.value = ''
        }
    };
    return(
        <input
            className="dont-forget-to-add"
            type="text"
            placeholder="write here and press Enter to remember"
            onKeyDown={addTaks}
        />
    )
};
DontForgetToAdd = connect()(DontForgetToAdd);

export default DontForgetToAdd