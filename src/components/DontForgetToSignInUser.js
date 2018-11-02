import React  from "react"
import {Query} from "react-apollo"
import {GET_ME, GET_TOKEN} from "../graphql"
import "../style/DontForgetToSignInUser.css"

const DontForgetToSignInUser = (props) => {
    return (
        <Query query={GET_TOKEN}>
            {({data: {token}}) => (
                <Query
                    query={GET_ME}
                    onError={() => false}
                    context={{
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    }}>
                    {({loading, error, data: {me}, client}) => {
                        return (
                            <div className="dont-forget-to-sign-in-user">
                                <img
                                    src={loading ? '' : me.profile_picture}
                                    alt="User profile pic"/>
                                <div className="user-name">{loading ? '' : me.username}</div>
                                <button
                                    onClick={() => client.writeData({data: {token: null, user: null, tasks: []}})}>Sign
                                    Out
                                </button>
                            </div>
                        );
                    }}
                </Query>
            )}
        </Query>
    )
};

export default DontForgetToSignInUser