import React from 'react'

function AddInput({onEnter}) {

    const handleEnter = e => {
        if (e.key === 'Enter') {
            e.stopPropagation();
            e.preventDefault();
            const text = e.target.value.trim();
            onEnter(text);
            e.target.value = ''
        }
    };

    return (
        <input
            className="dont-forget-to-add"
            type="text"
            placeholder="write here and press ⏎ ( Enter ) to add a new task"
            onKeyDown={handleEnter}
        />
    )
}

export default AddInput