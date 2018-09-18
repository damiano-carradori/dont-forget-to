import React, { Component } from 'react';
import './App.css';
import DontForgetTo from "./components/DontForgetTo";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons'

library.add(faTrash,faCheckCircle);

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Don't forget to...</h1>
                </header>
                <main className="App-main">
                    <DontForgetTo/>
                </main>
                <footer>
                    &copy; 2018 - Made with <span role="img" aria-label="love">❤️</span> and <span role="img" aria-label="React">⚛️</span> by Damiano Carradori
                </footer>
            </div>

        );
    }
}

export default App;
