import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Button from '@material-ui/core/Button';
import RaisedButton from 'material-ui/RaisedButton';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import qs from 'qs';

var shuffle = require('shuffle-array');

class Watcher extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timer: 0,
            problems: []
        };
    }

    tick() {
        this.setState(state => ({ timer: state.timer + 1 }));
        if (!sessionStorage.getItem('problemIndex')) {
            this.fetchProblems();
            if (this.state.problems.length > 0) {
                sessionStorage.setItem('problemIndex', 0);
                sessionStorage.setItem('countdown', 5);
            }
        }
        var countdown = Number(sessionStorage.getItem('countdown'));
        if (countdown == 1) {
            this.nextProblem();
        } else if (countdown > 0) {
            sessionStorage.setItem('countdown', countdown - 1);
        }
    }

    fetchProblems() {
        fetch("http://localhost:8090/problem", {
            method: 'GET'
        })
            .then(res => res.json())
            .then(res => this.setState({
                problems: res.map(res => this.getProblem(res))
            }));
    }

    getProblem(res) {
        var buttons = [];
        buttons.push(<RaisedButton fullWidth={true} label={res.correctAnswer} primary={true} onClick={event => this.nextProblem(res, res.correctAnswer)} />)
        buttons.push(<RaisedButton fullWidth={true} label={res.incorrectAnswer1} primary={true} onClick={event => this.nextProblem(res, res.incorrectAnswer1)} />)
        buttons.push(<RaisedButton fullWidth={true} label={res.incorrectAnswer2} primary={true} onClick={event => this.nextProblem(res, res.incorrectAnswer2)} />)
        buttons.push(<RaisedButton fullWidth={true} label={res.incorrectAnswer3} primary={true} onClick={event => this.nextProblem(res, res.incorrectAnswer3)} />)
        shuffle(buttons);
        return (
            <div>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper>
                            <Typography style={{ backgroundColor: 'rgb(0, 140, 160)', color: 'white' }} align="center" variant="h4">
                                {res.question}
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper>{buttons[0]}</Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper>{buttons[1]}</Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper>{buttons[2]}</Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper>{buttons[3]}</Paper>
                    </Grid>
                </Grid>
            </div>
        )
    }

    nextProblem(current, answer) {
        sessionStorage.setItem('problemIndex', Number(sessionStorage.getItem('problemIndex')) + 1);
        sessionStorage.setItem('countdown', 30);
        if (current) {
            var apiURL = "http://localhost:8090/answer";
            axios.post(apiURL, qs.stringify({ answer: answer, problemId: current.id, userId: sessionStorage.getItem('user_id') }), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
                .then(function (response) {
                    console.log(response);
                });
        }
    }

    componentDidMount() {
        this.interval = setInterval(() => this.tick(), 1000);
        this.fetchProblems();
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <div>
                        <AppBar title="Home">
                            <Typography variant="h3" color="inherit">
                                {sessionStorage.getItem('user')}
                            </Typography>
                            <Button color="inherit" onClick={(event) => this.logout(event)}>Logout</Button>
                        </AppBar>
                    </div>
                    <br />
                    {this.getNextProblem()}
                    <br />
                    {this.getInfo()}
                </MuiThemeProvider>
            </div>
        );
    }

    getInfo() {
        return (
            <div>
                <Paper style={{ backgroundColor: Number(sessionStorage.getItem('countdown')) > 0 ? 'green' : 'red', color: 'white' }}>
                    <Typography align="center" variant="h1">
                        {sessionStorage.getItem('countdown')}
                    </Typography>
                </Paper>
            </div>
        );
    }

    getNextProblem() {
        var index = Number(sessionStorage.getItem('problemIndex'));
        var timeLeft = Number(sessionStorage.getItem('countdown'));
        if (index > this.state.problems.length) {
            sessionStorage.setItem('countdown', 0)
        }
        if (index >= 0 && timeLeft > 0) {
            return this.state.problems[index];
        }
    }

    logout(event) {
        sessionStorage.clear();
        window.location.reload(false);
    }
}

export default Watcher;