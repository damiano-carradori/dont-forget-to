import React, { Component }from 'react'
import '../style/DontForgetToFilter.css'
import DontForgetToFilterButton from "./DontForgetToFilterButton";

class DontForgetToFilter extends Component {

    render(){
        return(
            <div className="dont-forget-to-filter">
                <DontForgetToFilterButton label="Show all" filter="SHOW_ALL"/>
                <DontForgetToFilterButton label="Show to dos" filter="SHOW_TODOS"/>
                <DontForgetToFilterButton label="Show done" filter="SHOW_DONE"/>
            </div>
        )
    }

}

export default DontForgetToFilter