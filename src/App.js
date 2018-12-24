import React from 'react'
import DontForgetTo from './components/DontForgetTo'
import Auth, {AuthContextProvider} from './components/Auth'
import './App.css'


function App() {

    return (
        <div className="App">
            <Auth/>
            <header className="App-header">
                <h1 className="App-title">Don't forget to...</h1>
            </header>
            <main className="App-main">
                <AuthContextProvider>
                    <DontForgetTo/>
                </AuthContextProvider>
            </main>
            <footer className="App-footer">
                &copy; 2018 - Made with
                <span role="img" aria-label="love">❤️</span>
                and
                <span role="img" aria-label="React">⚛️</span>
                by Damiano Carradori
            </footer>
        </div>
    );
}

export default App
