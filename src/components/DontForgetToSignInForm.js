import React, { Component }  from 'react'
import { connect } from "react-redux"
import {signIn, toggleSignIn} from "../actionCreators"
import '../style/DontForgetToSignInForm.css'

class DontForgetToSignInForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        let {dispatch} = this.props;
        let {username, password} = this.state;
        dispatch(signIn(username, password));
        dispatch(toggleSignIn());
        event.preventDefault();
    }

    render() {
        return (
            <form className="dont-forget-to-sign-in-form" onSubmit={this.handleSubmit}>
                <input type="text" name="username" placeholder="Username" onChange={this.handleInputChange}/>
                <input type="password" name="password" placeholder="Password" onChange={this.handleInputChange}/>
                <button type="submit">Sign in</button>
            </form>
        );
    }
}

export default connect()(DontForgetToSignInForm);