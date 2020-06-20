import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TestItem from '../util/TestItem';

class Teacher extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tests: []
        }
    }

    componentDidMount() {
        fetch("http://localhost:8090/test", {
            method: 'GET'
        })
            .then(res => res.json())
            .then(res => this.setState({ tests: res }))
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
                        <br />
                        {this.tests()}
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }

    logout(event) {
        sessionStorage.clear();
        window.location.reload(false);
    }

    tests() {
        return (
            <div>
                <Typography style={{marginLeft: 15}} variant="h4" color="inherit">
                    Tesztek
                </Typography>
                <br/>
                {this.state.tests.map(test => <TestItem id={test.id} name={test.name} />)}
            </div>
        );
    }

}
export default Teacher;