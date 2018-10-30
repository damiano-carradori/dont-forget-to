import React  from "react"
import { Query } from "react-apollo";
import cx from "classnames"
import gql from "graphql-tag";

const GET_VISIBILITY_FILTER = gql`
    {
        filter @client
    }
`;

let DontForgetToFilterButton = ({label, filter}) => {
    return (
        <Query query={GET_VISIBILITY_FILTER}>
            {({ data, client }) => (
                <button
                    className={cx(
                        {active: data.filter === filter}
                    )}
                    onClick={() => client.writeData({ data: { filter } })}>
                    {label}
                </button>
            )}
        </Query>
    )
};

export default DontForgetToFilterButton;