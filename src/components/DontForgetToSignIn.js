import React  from "react"
import {Query} from "react-apollo"
import userImage from "../images/user.png"
import "../style/DontForgetToSignIn.css"
import {GET_USER} from "../graphql"

const DontForgetToSignIn = (props) => {
    return (
        <Query query={GET_USER}>
            {({data: {user}, client}) => (
                <div className="dont-forget-to-sign-in" onClick={() => client.writeData({data: {side: true}})}>
                    <div className="user-name">{user === null ? 'Sign in' : user.username}</div>
                    <img
                        src={user === null || !user.profile_picture ? userImage : user.profile_picture}
                        alt="User profile pic"/>
                </div>
            )}
        </Query>
    )
};

export default DontForgetToSignIn