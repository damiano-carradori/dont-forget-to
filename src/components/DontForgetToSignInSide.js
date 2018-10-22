import React  from 'react'
import { connect } from 'react-redux'
import {toggleSignIn} from "../actionCreators"
import '../style/DontForgetToSignInSide.css'
import cx from "classnames"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DontForgetToSignInForm from "./DontForgetToSignInForm";
import DontForgetToSignInUser from "./DontForgetToSignInUser";

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
        }
    }
};

const DontForgetToSignInSide = ({ open, token, onCloseSide }) => {
    return (
        <div className={cx(
            "dont-forget-to-sign-in-side",
            {open}
        )}>
            <FontAwesomeIcon className="close-side" icon="times" onClick={onCloseSide}/>
            {token===null?
                <DontForgetToSignInForm/>:
                <DontForgetToSignInUser/>
            }
        </div>
    )
};

export default connect(mapStateToProps,mapDispatchToProps)(DontForgetToSignInSide);