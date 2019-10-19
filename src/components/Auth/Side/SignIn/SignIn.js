import React, {useContext, useState} from 'react'
import {Mutation} from 'react-apollo'
import {LOG_IN} from './graphql'
import {AuthContext} from '../../AuthContext'
import './style.css'
import {TasksListContext} from '../../../Main/TasksList';


function SignIn() {
    const {setUser, setToken, toggleSide, toggleSignUp} = useContext(AuthContext);
    const {resetTasks} = useContext(TasksListContext);

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
            default:
                break;
        }
    };

    const handleSubmit = (event, signIn) => {
        event.preventDefault();
        signIn({variables: {username, password}});
    };

    const handleSignIn = (_, {data: {logIn}}) => {
        setUser(logIn.user);
        toggleSide();
        setToken(logIn.token);
        resetTasks(logIn.user.tasks);
    };

    return (
        <Mutation
            mutation={LOG_IN}
            update={handleSignIn}
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
                    <button className="dont-forget-to-sign-in-link" onClick={toggleSignUp}>Are you new?<br/>Sign up now</button>
                </form>
            )}
        </Mutation>
    );
}

export default SignIn