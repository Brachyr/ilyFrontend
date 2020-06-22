import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Button from '@material-ui/core/Button';
import RaisedButton from 'material-ui/RaisedButton';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem';

var shuffle = require('shuffle-array');

class Student extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timer: 0,
            problems: [],
            answers: [],
            watchers: true
        };
    }

    tick() {
        this.setState(state => ({ timer: state.timer + 1 }));
        if (!sessionStorage.getItem('problemIndex')) {
            this.fetchProblems();
            if (this.state.problems.length > 0) {
                sessionStorage.setItem('problemIndex', 0);
                sessionStorage.setItem('countdown', 69);
            }
        }
        var countdown = Number(sessionStorage.getItem('countdown'));
        if (countdown > 0) {
            sessionStorage.setItem('countdown', countdown - 1)
        }
    }

    stop() {
        sessionStorage.setItem('countdown', 0);
        sessionStorage.removeItem('friendAnswer');
        sessionStorage.removeItem('watcherAnswers');
        this.setState({ problems: [] });
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
        buttons.push(<RaisedButton fullWidth={true} label={res.correctAnswer} primary={true} onClick={(event) => this.nextProblem(event)} />)
        buttons.push(<RaisedButton fullWidth={true} label={res.incorrectAnswer1} primary={true} onClick={(event) => this.stop(event)} />)
        buttons.push(<RaisedButton disabled={sessionStorage.getItem('applyFifty')} fullWidth={true} label={res.incorrectAnswer2} primary={true} onClick={(event) => this.stop(event)} />)
        buttons.push(<RaisedButton disabled={sessionStorage.getItem('applyFifty')} fullWidth={true} label={res.incorrectAnswer3} primary={true} onClick={(event) => this.stop(event)} />)
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

    nextProblem() {
        sessionStorage.setItem('problemIndex', Number(sessionStorage.getItem('problemIndex')) + 1);
        sessionStorage.removeItem('applyFifty');
        sessionStorage.removeItem('friendAnswer');
        sessionStorage.removeItem('watcherAnswers');
        sessionStorage.setItem('countdown', 69);
        window.location.reload(false);
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
                    <br />
                    {this.getWatcherList()}
                    <Typography variant="h5" color="inherit">
                        {sessionStorage.getItem('friendAnswer')}
                    </Typography>
                    <br/>
                    <Typography variant="h5" color="inherit">
                        {this.getWatcherAnswers()}
                    </Typography>
                </MuiThemeProvider>
            </div>
        );
    }

    getWatcherAnswers() {
        var answers = sessionStorage.getItem('watcherAnswers');
        if (answers) {
            answers = answers.split(',');
            var counts = {};
            for (var i = 0; i < answers.length; i++) {
                var num = answers[i];
                counts[num] = counts[num] ? counts[num] + 1 : 1;
            }
            console.log(counts);
            return (
                <div>Audience answers:
                    {Object.keys(counts).map(key => (
                        <div>
                            {key + ": " + counts[key]}
                        </div>
                    ))}
                </div>);
        }
    }

    getWatcherList() {
        if (this.state.watchers.length) {
            return (
                <div>
                    <FormControl>
                        <InputLabel id="watchers">Answers</InputLabel>
                        <Select labelId="watchers" id="watchers-select" onChange={this.selectFriend}>
                            {this.state.watchers.map(res => <MenuItem value={res.user + " answered: " + res.answer}>{res.user}</MenuItem>)}
                        </Select>
                        <FormHelperText>Select a user to view the answer</FormHelperText>
                    </FormControl>
                </div>
            )
        }
    }

    selectFriend = (event) => {
        console.log(event);
        sessionStorage.setItem('friend', true);
        sessionStorage.setItem('friendAnswer', event.target.value);
        window.location.reload(false);
    };

    separatorText() {
        if (Number(sessionStorage.getItem('countdown')) > 0) {
            return "In progress";
        }
        return "Finished";
    }

    getInfo() {
        return (
            <div>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper style={{ backgroundColor: 'gray', color: 'white' }}>
                            <Typography align="center" variant="h4">
                                {this.separatorText()}
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper>
                            <RaisedButton fullWidth={true} label={"Score: " + (Number(sessionStorage.getItem('problemIndex')) + 1) + "/10"} primary={true} />
                        </Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper style={{ backgroundColor: Number(sessionStorage.getItem('countdown')) > 0 ? 'green' : 'red', color: 'white' }}>
                            <Typography align="center" variant="h1">
                                {sessionStorage.getItem('countdown')}
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper>
                            <RaisedButton fullWidth={true} label="Stop" primary={true} onClick={(event) => this.stop(event)} />
                        </Paper>
                    </Grid>
                    <Grid item xs>
                        <Paper><RaisedButton disabled={sessionStorage.getItem('fiftyUsed')} fullWidth={true} label="50/50" primary={true} onClick={event => this.fifty(event)} /></Paper>
                    </Grid>
                    <Grid item xs>
                        <Paper><RaisedButton disabled={sessionStorage.getItem('watchers')} fullWidth={true} label="peeps" primary={true} onClick={event => this.askWatchers(event)} /></Paper>
                    </Grid>
                    <Grid item xs>
                        <Paper><RaisedButton disabled={sessionStorage.getItem('friend')} fullWidth={true} label="friend" primary={true} onClick={event => this.askFriend(event)} /></Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }

    fifty() {
        sessionStorage.setItem('fiftyUsed', true);
        sessionStorage.setItem('applyFifty', true);
        window.location.reload(false);
    }

    askFriend() {
        fetch("http://localhost:8090/answer", {
            method: 'GET'
        })
            .then(res => res.json())
            .then(res => this.setState({ watchers: res }));
    }

    askWatchers() {
        sessionStorage.setItem('watchers', true);
        fetch("http://localhost:8090/answer", {
            method: 'GET'
        })
            .then(res => res.json())
            .then(res => {
                sessionStorage.setItem('watcherAnswers', res.map(res => res.answer));
                window.location.reload(false);
            });
    }

    getNextProblem() {
        var index = Number(sessionStorage.getItem('problemIndex'));
        var timeLeft = Number(sessionStorage.getItem('countdown'));
        if (index >= 0 && timeLeft > 0) {
            return this.state.problems[index];
        }
    }

    logout(event) {
        sessionStorage.clear();
        window.location.reload(false);
    }
}

export default Student;