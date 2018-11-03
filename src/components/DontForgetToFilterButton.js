import React  from "react"
import {Query} from "react-apollo"
import cx from "classnames"
import {GET_VISIBILITY_FILTER} from "../graphql"

const DontForgetToFilterButton = ({label, filter}) => {
    return (
        <Query query={GET_VISIBILITY_FILTER}>
            {({data, client}) => (
                <button
                    className={cx(
                        {active: data.filter === filter}
                    )}
                    onClick={() => client.writeData({data: {filter}})}>
                    {label}
                </button>
            )}
        </Query>
    )
};

export default DontForgetToFilterButton;