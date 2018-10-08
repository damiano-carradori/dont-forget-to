import React  from 'react'
import { connect } from 'react-redux';
import {signIn} from "../actionCreators";
import '../style/DontForgetToSignIn.css'

const mapStateToProps = state => {
    return {
        user : state.user
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onSignIn: () => {
            dispatch(signIn())
        }
    }
};

const DontForgetToSignIn = ({ user, onSignIn }) => {
    return (
        <div className="dont-forget-to-sign-in" onClick={()=>{
            if(user===null){
                onSignIn();
            }
        }}>
            <div className="user-name">{user===null?'Sign in':user.username}</div>
            <img
                src={user===null?'https://www.shareicon.net/download/2015/09/18/103159_user.ico':user.profile_picture}
                alt="User profile pic"/>
        </div>
    )
};

export default connect(mapStateToProps,mapDispatchToProps)(DontForgetToSignIn);