import React, {Component} from 'react';
import './App.css';
import Main from './Components/Main';
import {BrowserRouter} from 'react-router-dom';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="fontSize">
                    <Main/>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;