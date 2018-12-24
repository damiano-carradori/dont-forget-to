import React, {useContext, useState} from 'react'
import {Mutation} from 'react-apollo'
import {LOG_IN} from './graphql'
import {AuthContext} from '../../AuthContext'
import './style.css'


function SignIn() {
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

    const handleSubmit = (event, signIn) => {
        event.preventDefault();
        signIn({variables: {username, password}});
    };


    const {setUser, setToken, toggleSide, toggleSignUp} = useContext(AuthContext);

    return (
        <Mutation
            mutation={LOG_IN}
            update={({writeData}, {data: {logIn}}) => {
                setUser(logIn.user);
                toggleSide();
                setToken(logIn.token);
                writeData({
                    data: {
                        tasks: logIn.user.tasks
                    }
                });
            }}
            onError={() => false}>
            {(signIn, {loading, error}) => (
                <form className="dont-forget-to-sign-in-form" onSubmit={(e) => handleSubmit(e, signIn)}>

                    <input className={error && "error"} id="username" type="text" name="username"
                           placeholder="Username" autoComplete="username" onChange={handleInputChange}/>

                    <input className={error && "error"} id="password" type="password" name="password"
                           placeholder="Password" autoComplete="current-password"
                           onChange={handleInputChange}/>

                    {error && <div className="error-message">{error.message}</div>}
                    {loading && <div className="loading-button">Loading...</div>}
                    {!loading && <button type="submit">Sign in</button>}

                    <hr className="dont-forget-to-separator"/>
                    <a className="dont-forget-to-sign-in-link" onClick={toggleSignUp}>Are you new? Sign up now</a>
                </form>
            )}
        </Mutation>
    );
}

export default SignIn