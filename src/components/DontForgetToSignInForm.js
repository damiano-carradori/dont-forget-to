import React, {Component}  from "react"
import {Mutation} from "react-apollo";
import gql from "graphql-tag";
import "../style/DontForgetToSignInForm.css"

const LOG_IN = gql`
    mutation LogIn($username: String!, $password: String!) {
        logIn(username: $username, password: $password) {
            token
            user{
                id
                username
                profile_picture
                tasks{
                    id
                    position
                    text
                    done
                }
            }
        }
    }
`;

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

    handleSubmit(event,signIn) {
        let {username, password} = this.state;
        signIn({variables: {username, password}});
        event.preventDefault();
    }

    render() {
        return (
            <Mutation
                mutation={LOG_IN}
                update={(cache, { data: { logIn } })=>{
                    cache.writeData({
                        data: {
                            side: false,
                            user: logIn.user,
                            token: logIn.token,
                            tasks: logIn.user.tasks
                        }
                    });
                }}
                onError={()=>false}>
                {(signIn, { loading, error }) => (
                    <form className="dont-forget-to-sign-in-form" onSubmit={(e)=>this.handleSubmit(e,signIn)}>
                        <input className={error && "error"} id="username" type="text" name="username" placeholder="Username" autoComplete="username" onChange={this.handleInputChange}/>
                        <input className={error && "error"} id="password" type="password" name="password" placeholder="Password" autoComplete="current-password" onChange={this.handleInputChange}/>
                        {error && <div className="error-message">{error.message}</div>}
                        {loading && <div className="loading-button">Loading...</div>}
                        {!loading && <button type="submit">Sign in</button>}
                    </form>
                )}
            </Mutation>
        );
    }
}

export default DontForgetToSignInForm;