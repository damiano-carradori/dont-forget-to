import React  from "react"
import {Query} from "react-apollo"
import cx from "classnames"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import DontForgetToSignInForm from "./DontForgetToSignInForm"
import DontForgetToSignInUser from "./DontForgetToSignInUser"
import {GET_SIDE_INFO} from "../graphql"
import "../style/DontForgetToSignInSide.css"

const DontForgetToSignInSide = (props) => {
    return (
        <Query query={GET_SIDE_INFO}>
            {({data: {token, side}, client}) => (
                <div className={cx(
                    "dont-forget-to-sign-in-side",
                    {open: side}
                )}>
                    <FontAwesomeIcon className="close-side" icon="times"
                                     onClick={() => client.writeData({data: {side: false}})}/>
                    {token === null ?
                        <DontForgetToSignInForm/> :
                        <DontForgetToSignInUser/>
                    }
                </div>
            )}
        </Query>
    )
};

export default DontForgetToSignInSide