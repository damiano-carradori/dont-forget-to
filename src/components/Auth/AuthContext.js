import React, {createContext, PureComponent} from 'react'

export const AuthContext = createContext(null);

export class AuthContextProvider extends PureComponent {
    constructor(props) {
        super(props);
        this.setUser = this.setUser.bind(this);
        this.setToken = this.setToken.bind(this);
        this.toggleSignUp = this.toggleSignUp.bind(this);
        this.toggleSide = this.toggleSide.bind(this);
        this.state = {
            user: null,
            setUser: this.setUser,
            token: null,
            setToken: this.setToken,
            side: false,
            toggleSide: this.toggleSide,
            signup: false,
            toggleSignUp: this.toggleSignUp,
        };

    }

    setUser(user) {
        console.log(user);
        this.setState({user});
    }

    setToken(token) {
        this.setState({token});
    }

    toggleSignUp() {
        this.setState(({signup}) => ({signup: !signup}));
    }

    toggleSide() {
        this.setState(({side}) => ({side: !side}));
    }

    render() {
        return (
            <AuthContext.Provider value={this.state}>
                {this.props.children}
            </AuthContext.Provider>
        );
    }
}