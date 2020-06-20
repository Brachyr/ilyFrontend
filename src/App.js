import React from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Login from "./Login";
import Test from "./Test";

function App() {
    var role = sessionStorage.getItem('role');
    switch(role) {
        case 'teacher': return <Teacher/>;
        case 'student': return <Student/>;
        case 'watcher': return <Watcher/>;
        default: return <Login/>;
    }
}

function Teacher() {
    return <h2>Home(teacher) {sessionStorage.getItem('user')}</h2>;
}
function Student() {
    return <h2>Home(student) {sessionStorage.getItem('user')}</h2>;
}
function Watcher() {
    return <h2>Home(watcher) {sessionStorage.getItem('user')}</h2>;
}

export default App;
