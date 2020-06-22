import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import qs from 'qs';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            confirmPass: '',
            name: '',
            login: true,
            registered: false
        }
    }

    render() {
        return this.state.login ? (
            <div>
                <MuiThemeProvider>
                    <div>
                        <AppBar
                            title="Login"
                        />
                        <TextField
                            style={style}
                            hintText="Enter your Username"
                            floatingLabelText="Username"
                            onChange={(event, newValue) => this.setState({ username: newValue })}
                        />
                        <br />
                        <TextField
                            style={style}
                            type="password"
                            hintText="Enter your Password"
                            floatingLabelText="Password"
                            onChange={(event, newValue) => this.setState({ password: newValue })}
                        />
                        <br />
                        <RaisedButton label="Login" primary={true} style={style} onClick={event => this.handleClick(event)} />
                        <RaisedButton label="Register" primary={true} style={style} onClick={event => this.setState({ login: false })} />
                    </div>
                </MuiThemeProvider>
            </div>
        ) : (
                <div>
                    <MuiThemeProvider>
                        <div>
                            <AppBar
                                title="Register"
                            />
                            <TextField
                                style={style}
                                hintText="Enter your Username"
                                floatingLabelText="Username"
                                onChange={(event, newValue) => this.setState({ username: newValue })}
                            />
                            <br />
                            <TextField
                                style={style}
                                hintText="Enter your Full Name"
                                floatingLabelText="Name"
                                onChange={(event, newValue) => this.setState({ name: newValue })}
                            />
                            <br />
                            <TextField
                                style={style}
                                type="password"
                                hintText="Enter your Password"
                                floatingLabelText="Password"
                                onChange={(event, newValue) => this.setState({ password: newValue })}
                            />
                            <br />
                            <TextField
                                style={style}
                                type="password"
                                hintText="Confirm your Password"
                                floatingLabelText="Confirm"
                                onChange={(event, newValue) => this.setState({ confirmPass: newValue })}
                            />
                            <br />
                            {this.registerButton()}
                            <br />
                            <Typography style={style} variant="h6">
                                {this.state.registered}
                            </Typography>
                        </div>
                    </MuiThemeProvider>
                </div>
            );
    }

    registerButton() {
        var passMatch = this.state.password != this.state.confirmPass;
        return (
            <div>
                <RaisedButton label="Login" primary={true} style={style} onClick={event => this.setState({ login: true })} />
                <RaisedButton disabled={passMatch} label="Register" primary={true} style={style} onClick={event => this.register()} />
                {passMatch ?
                    <Typography style={{ color: 'red' }} align="center" variant="inherit">
                        Passwords don't match
                    </Typography>
                    : ""}
            </div>
        );
    }

    handleClick(event) {
        var apiURL = "http://localhost:8090/login";
        axios.post(apiURL, qs.stringify({ username: this.state.username, password: this.state.password }), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
            .then(function (response) {
                console.log(response);
                sessionStorage.setItem('user', response.data.username);
                sessionStorage.setItem('role', response.data.role);
                sessionStorage.setItem('user_id', response.data.id);
                window.location.reload(false);
            });
    }

    register() {
        var apiURL = "http://localhost:8090/register";
        axios.post(apiURL, qs.stringify({ username: this.state.username, password: this.state.password, fullName: this.state.name, role: "watcher" }), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
            .then(response => {
                if (response.status == 201) {
                    this.setState({ registered: "Registered" });
                } else {
                    this.setState({ registered: "Registration failed" });
                }
            });
    }
}

const style = {
    marginLeft: 15
};
export default Login;