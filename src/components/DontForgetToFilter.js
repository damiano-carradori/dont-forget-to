import React, { Component }from 'react'
import '../style/DontForgetToFilter.css'
import DontForgetToFilterButton from "./DontForgetToFilterButton";

class DontForgetToFilter extends Component {

    render(){
        return(
            <div className="dont-forget-to-filter">
                <DontForgetToFilterButton label="All" filter="SHOW_ALL"/>
                <DontForgetToFilterButton label="Active" filter="SHOW_ACTIVE"/>
                <DontForgetToFilterButton label="Completed" filter="SHOW_COMPLETED"/>
            </div>
        )
    }

}

export default DontForgetToFilter