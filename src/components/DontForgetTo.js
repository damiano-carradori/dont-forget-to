import React  from 'react'
import DontForgetToFilter from "./DontForgetToFilter";
import DontForgetToAdd from "./DontForgetToAdd";
import DontForgetToList from "./DontForgetToList";
import DontForgetToFooter from "./DontForgetToFooter";
import '../style/DontForgetToContainer.css'

let DontForgetTo = () => {
    return (
        <div className="dont-forget-to-container">
            <DontForgetToAdd/>
            <DontForgetToList/>
            <DontForgetToFooter/>
            <DontForgetToFilter/>
        </div>
    )
};

export default DontForgetTo