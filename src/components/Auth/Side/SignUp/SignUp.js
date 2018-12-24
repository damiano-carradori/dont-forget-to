import React, {useContext, useState} from 'react'
import {Mutation} from 'react-apollo'
import {AuthContext} from '../../AuthContext'
import {SIGN_UP} from './graphql'


function SignUp() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleInputChange = ({target}) => {
        const {value, name} = target;
        switch (name) {
            case 'username':
                setUsername(value);
                break;
            case 'password':
                setPassword(value);
                break;
        }
    };

    const handleSubmit = (event, signUp) => {
        event.preventDefault();
        signUp({variables: {username, password}});
    };


    const {setUser, setToken, toggleSide, toggleSignUp} = useContext(AuthContext);

    return (
        <Mutation
            mutation={SIGN_UP}
            update={({writeData}, {data: {signUp}}) => {
                setUser(signUp.user);
                setToken(signUp.token);
                toggleSide();
                writeData({
                    data: {
                        tasks: signUp.user.tasks
                    }
                });
            }}
            onError={() => false}>
            {(signUp, {loading, error}) => (
                <form className="dont-forget-to-sign-in-form" onSubmit={(e) => handleSubmit(e, signUp)}>

                    <input className={error && "error"} id="username" type="text" name="username" placeholder="Username"
                           autoComplete="username" onChange={handleInputChange}/>

                    <input className={error && "error"} id="password" type="password" name="password"
                           placeholder="Password" autoComplete="current-password" onChange={handleInputChange}/>

                    {error && <div className="error-message">{error.message}</div>}

                    {loading && <div className="loading-button">Loading...</div>}
                    {!loading && <button type="submit">Sign up</button>}

                    <hr className="dont-forget-to-separator"/>
                    <a className="dont-forget-to-sign-in-link" onClick={toggleSignUp}>Already have an account? Log
                        in</a>
                </form>
            )}
        </Mutation>
    );
}

export default SignUp