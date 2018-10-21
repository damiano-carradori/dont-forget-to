import React  from 'react'
import { connect } from 'react-redux'
import {toggleSignIn, signOut} from "../actionCreators"
import '../style/DontForgetToSignInSide.css'
import cx from "classnames"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DontForgetToSignInForm from "./DontForgetToSignInForm";

const mapStateToProps = state => {
    return {
        token: state.user.token,
        open : state.user.sideOpen
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onCloseSide: () => {
            dispatch(toggleSignIn())
        },
        onSignOut: () => {
            dispatch(signOut())
        }
    }
};

const DontForgetToSignInSide = ({ open, token, onCloseSide, onSignOut }) => {
    return (
        <div className={cx(
            "dont-forget-to-sign-in-side",
            {open}
        )}>
            <FontAwesomeIcon className="close-side" icon="times" onClick={onCloseSide}/>
            {token===null?
                <DontForgetToSignInForm/>:
                <button onClick={onSignOut}>Sign out</button>
            }
        </div>
    )
};

export default connect(mapStateToProps,mapDispatchToProps)(DontForgetToSignInSide);