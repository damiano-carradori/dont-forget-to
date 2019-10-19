import React from 'react'
import Auth, {AuthContextProvider} from './components/Auth'
import Main from './components/Main';
import './App.css'
import {TasksListContextProvider} from './components/Main/TasksList';

function App() {

    return (
        <div className="App">
            <TasksListContextProvider>
                <AuthContextProvider>
                    <Auth/>
                    <header className="App-header">
                        <h1 className="App-title">Don't forget to...</h1>
                    </header>
                    <main className="App-main">
                        <Main/>
                    </main>
                    <footer className="App-footer">
                        &copy; 2018 - Made with <span role="img" aria-label="love">❤️</span> and <span role="img" aria-label="React">⚛️</span> by Damiano Carradori
                    </footer>
                </AuthContextProvider>
            </TasksListContextProvider>
        </div>
    );
}

export default App
