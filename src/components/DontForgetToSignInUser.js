import React  from 'react'
import { connect } from 'react-redux'
import {toggleSignIn, signOut} from "../actionCreators"
import '../style/DontForgetToSignInUser.css'
import cx from "classnames"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DontForgetToSignInForm from "./DontForgetToSignInForm";
import userImage from "../images/user.png";

const mapStateToProps = state => {
    return {
        token: state.user.token,
        user: state.user.account
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onSignOut: () => {
            dispatch(signOut())
        }
    }
};

const DontForgetToSignInUser = ({ token, user, onSignOut }) => {
    return (
        <div className="dont-forget-to-sign-in-user">

            <img
                src={user===null?'':user.profile_picture}
                alt="User profile pic"/>
            <div className="user-name">{user===null?'Sign in':user.username}</div>
            <button>Sign Out</button>

        </div>
    )
};

export default connect(mapStateToProps,mapDispatchToProps)(DontForgetToSignInUser);