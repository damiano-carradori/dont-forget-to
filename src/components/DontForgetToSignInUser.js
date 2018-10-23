import React  from 'react'
import { connect } from 'react-redux'
import {signOut} from "../actionCreators"
import '../style/DontForgetToSignInUser.css'
import {Query} from "react-apollo";
import gql from "graphql-tag";

const GET_ME = gql`
    {
        me{
            id
            username
            profile_picture
        }
    }
`;

const mapStateToProps = state => {
    return {
        token: state.user.token
    }
};

const DontForgetToSignInUser = ({ token, dispatch }) => {
    return (
        <Query
            query={GET_ME}
            onError={()=>false}
            context={{
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }}>
            {({loading, error, data}) => {
                return (
                    <div className="dont-forget-to-sign-in-user">
                        <img
                            src={loading?'':data.me.profile_picture}
                            alt="User profile pic"/>
                        <div className="user-name">{loading?'':data.me.username}</div>
                        <button onClick={() => dispatch(signOut())}>Sign Out</button>
                    </div>
                );
            }}
        </Query>
    )
};

export default connect(mapStateToProps)(DontForgetToSignInUser);