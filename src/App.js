import React from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Login from "./Login";
import Teacher from "./Teacher";
import Student from "./Student";
import Watcher from "./Watcher";

function App() {
    var role = sessionStorage.getItem('role');
    switch (role) {
        case 'teacher': return <Teacher />;
        case 'student': return <Student />;
        case 'watcher': return <Watcher />;
        default: return <Login />;
    }
}

export default App;
