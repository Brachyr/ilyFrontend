import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Button from '@material-ui/core/Button';
import RaisedButton from 'material-ui/RaisedButton';
import Typography from '@material-ui/core/Typography';

var shuffle = require('shuffle-array');

class Student extends React.Component {
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
            if (this.state.problems.length>0) {
                sessionStorage.setItem('problemIndex', 0);
            }
        }
    }

    fetchProblems() {
        fetch("http://localhost:8090/problem", {
            method: 'GET'
        })
            .then(res => res.json())
            .then(res => this.setState({
                problems: res.map(res =>
                    <div>
                        <Typography style={style} variant="h4" color="inherit">
                            {res.question}
                        </Typography>
                        {this.getButtons(res)}
                    </div>)
            }));
    }

    getButtons(res) {
        var buttons = [];
        buttons.push(<RaisedButton label={res.correctAnswer} primary={true} style={style} onClick={(event) => this.nextProblem(event)} />)
        buttons.push(<RaisedButton label={res.incorrectAnswer1} primary={true} style={style} onClick={(event) => this.nextProblem(event)} />)
        buttons.push(<RaisedButton label={res.incorrectAnswer2} primary={true} style={style} onClick={(event) => this.nextProblem(event)} />)
        buttons.push(<RaisedButton label={res.incorrectAnswer3} primary={true} style={style} onClick={(event) => this.nextProblem(event)} />)
        shuffle(buttons);
        return (
            <div>
                {buttons[0]}
                {buttons[1]}
                <br />
                {buttons[2]}
                {buttons[3]}
            </div>
        )
    }

    nextProblem() {
        sessionStorage.setItem('problemIndex', Number(sessionStorage.getItem('problemIndex')) + 1);
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
                    {this.getProblem()}
                </MuiThemeProvider>
            </div>
        );
    }

    getProblem() {
        var index = Number(sessionStorage.getItem('problemIndex'));
        if (index >= 0) {
            return this.state.problems[index];
        }
    }

    logout(event) {
        sessionStorage.clear();
        window.location.reload(false);
    }
}

const style = {
    margin: 10
};
export default Student;