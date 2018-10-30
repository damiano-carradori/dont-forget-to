import React  from "react"
import {Query} from "react-apollo"
import gql from "graphql-tag";
import userImage from "../images/user.png"
import "../style/DontForgetToSignIn.css"

const GET_USER = gql`
    {
        user @client
    }
`;

const DontForgetToSignIn = (props) => {
    return (
        <Query query={GET_USER}>
            {({ data: { user }, client }) => (
                <div className="dont-forget-to-sign-in" onClick={() => client.writeData({ data: { side: true } })}>
                    <div className="user-name">{user===null?'Sign in':user.username}</div>
                    <img
                        src={user===null?userImage:user.profile_picture}
                        alt="User profile pic"/>
                </div>
            )}
        </Query>
    )
};

export default DontForgetToSignIn;