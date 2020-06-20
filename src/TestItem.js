import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import RaisedButton from 'material-ui/RaisedButton';

function TestItem(props) {
    const classes = useStyles();
    return (
        <ExpansionPanel>
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography className={classes.heading}>{props.id + " " + props.name}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <RaisedButton label="Start" primary={true} onClick={(event) => this.start(event)} />
                <RaisedButton label="Edit" style={{marginLeft: 10}} primary={true} onClick={(event) => this.edit(event)} />
            </ExpansionPanelDetails>
        </ExpansionPanel>
    )
}

function start() {

}

function edit() {

}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));

export default TestItem;