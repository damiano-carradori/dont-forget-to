import React from 'react'
import DontForgetToFilterButton from "./DontForgetToFilterButton";
import '../style/DontForgetToFilter.css'

let DontForgetToFilter = () => {
    return (
        <div className="dont-forget-to-filter">
            <DontForgetToFilterButton label="All" filter="SHOW_ALL"/>
            <DontForgetToFilterButton label="Active" filter="SHOW_ACTIVE"/>
            <DontForgetToFilterButton label="Completed" filter="SHOW_COMPLETED"/>
        </div>
    )
};

export default DontForgetToFilter