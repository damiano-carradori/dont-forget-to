import React  from 'react'
import { connect } from 'react-redux'
import {signOut} from "../actionCreators"
import '../style/DontForgetToSignInUser.css'
import {Query} from "react-apollo";
import gql from "graphql-tag";
import ApolloClient from "apollo-boost";

const client = new ApolloClient({
    uri: "https://floating-reaches-16037.herokuapp.com/"
});

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
            client={client}
            context={{
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }}>
            {({loading, error, data}) => {
                if (loading) return "Loading...";
                if (error) return `Error: ${error.message}`;
                let {me} = data;
                return (
                    <div className="dont-forget-to-sign-in-user">
                        <img
                            src={me.profile_picture}
                            alt="User profile pic"/>
                        <div className="user-name">{me.username}</div>
                        <button onClick={() => dispatch(signOut())}>Sign Out</button>
                    </div>
                );
            }}
        </Query>
    )
};

export default connect(mapStateToProps)(DontForgetToSignInUser);