import React, {Component}  from "react"
import {Mutation} from "react-apollo";
import {SIGN_UP} from "../graphql"
import "../style/DontForgetToSignInForm.css"

class DontForgetToSignUpForm extends Component {
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

    handleSubmit(event,signIn) {
        let {username, password} = this.state;
        signIn({variables: {username, password}});
        event.preventDefault();
    }

    render() {
        return (
            <Mutation
                mutation={SIGN_UP}
                update={(cache, { data: { signUp } })=>{
                    cache.writeData({
                        data: {
                            side: false,
                            user: signUp.user,
                            token: signUp.token,
                            tasks: signUp.user.tasks
                        }
                    });
                }}
                onError={()=>false}>
                {(signIn, { loading, error, client }) => (
                    <form className="dont-forget-to-sign-in-form" onSubmit={(e)=>this.handleSubmit(e,signIn)}>
                        <input className={error && "error"} id="username" type="text" name="username" placeholder="Username" autoComplete="username" onChange={this.handleInputChange}/>
                        <input className={error && "error"} id="password" type="password" name="password" placeholder="Password" autoComplete="current-password" onChange={this.handleInputChange}/>
                        {error && <div className="error-message">{error.message}</div>}
                        {loading && <div className="loading-button">Loading...</div>}
                        {!loading && <button type="submit">Sign up</button>}
                        <hr className="dont-forget-to-separator"/>
                        <a className="dont-forget-to-sign-in-link" onClick={()=>client.writeData({data: {signup: false}})}>Already have an account? Log in</a>
                    </form>
                )}
            </Mutation>
        );
    }
}

export default DontForgetToSignUpForm;