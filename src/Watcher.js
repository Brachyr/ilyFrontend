import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class Watcher extends React.Component {
    constructor(props) {
        super(props);
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
                </MuiThemeProvider>
            </div>
        );
    }
    logout(event) {
        sessionStorage.clear();
        window.location.reload(false);
    }

}
export default Watcher;