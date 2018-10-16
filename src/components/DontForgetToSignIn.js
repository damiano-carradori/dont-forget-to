import React  from 'react'
import { connect } from 'react-redux';
import {toggleSignIn} from "../actionCreators";
import '../style/DontForgetToSignIn.css'
import userImage from '../images/user.png'

const mapStateToProps = state => {
    return {
        user : state.user.account
    }
};

const mapDispatchToProps = dispatch => {
    return {
        openSignInSide: () => {
            dispatch(toggleSignIn())
        }
    }
};

const DontForgetToSignIn = ({ user, openSignInSide }) => {
    return (
        <div className="dont-forget-to-sign-in" onClick={openSignInSide}>
            <div className="user-name">{user===null?'Sign in':user.username}</div>
            <img
                src={user===null?userImage:user.profile_picture}
                alt="User profile pic"/>
        </div>
    )
};

export default connect(mapStateToProps,mapDispatchToProps)(DontForgetToSignIn);