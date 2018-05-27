import React, { Component } from 'react';
import './App.css';
import DontForgetTo from "./components/DontForgetTo";

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
                    &copy; 2018 - Damiano Carradori
                </footer>
            </div>

        );
    }
}

export default App;
