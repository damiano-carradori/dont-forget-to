import React, { Component } from 'react';
import './App.css';
import DontForgetTo from "./components/DontForgetTo";
import DontForgetToSignIn from "./components/DontForgetToSignIn";
import DontForgetToSignInSide from "./components/DontForgetToSignInSide";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash, faEllipsisV, faTimes } from '@fortawesome/free-solid-svg-icons'
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons'

library.add(faTrash,faCheckCircle,faEllipsisV, faTimes);

class App extends Component {
    render() {
        return (
            <div className="App">
                <DontForgetToSignIn/>
                <DontForgetToSignInSide/>
                <header className="App-header">
                    <h1 className="App-title">Don't forget to...</h1>
                </header>
                <main className="App-main">
                    <DontForgetTo/>
                </main>
                <footer className="App-footer">
                    &copy; 2018 - Made with <span role="img" aria-label="love">❤️</span> and <span role="img" aria-label="React">⚛️</span> by Damiano Carradori
                </footer>
            </div>

        );
    }
}

export default App;
