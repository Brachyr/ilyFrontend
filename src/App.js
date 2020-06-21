import React from 'react';
import './App.css';
import Login from "./components/Login";
import Teacher from "./components/Teacher";
import Student from "./components/Student";
import Watcher from "./components/Watcher";

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
