import React, { Component } from 'react'
import DontForgetToFilter from "./DontForgetToFilter";
import DontForgetToAdd from "./DontForgetToAdd";
import DontForgetToList from "./DontForgetToList";
import DontForgetToFooter from "./DontForgetToFooter";

class DontForgetTo extends Component {

    render() {
        return (
            <div className="dont-forget-to-container">
                <DontForgetToAdd />
                <DontForgetToList />
                <DontForgetToFooter />
                <DontForgetToFilter />
            </div>
        )
    }
}

export default DontForgetTo