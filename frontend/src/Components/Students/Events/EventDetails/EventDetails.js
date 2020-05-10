import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import DescriptionIcon from '@material-ui/icons/Description';
import EventNoteIcon from '@material-ui/icons/EventNote';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import ComputerIcon from '@material-ui/icons/Computer';
import TodayIcon from '@material-ui/icons/Today';
import EventIcon from '@material-ui/icons/Event';
import axios from 'axios'

const styles = theme => ({
    root: {
        flexGrow: 1,
        overflow: 'hidden',
        padding: theme.spacing(0, 3),
    },
    paper: {
        maxWidth: 400,
        minWidth: 400,
        margin: `${theme.spacing(1)}px`,
        padding: theme.spacing(2),
    },
    black: {
        color: theme.palette.getContrastText("#212121"),
        backgroundColor: "#212121",
    },
});

const message = `Truncation should be conditionally applicable on this long line of text
 as this is a much longer line than what the container can support. `;


class EventDetails extends Component {

    state = {

        eventDetails: []
    };
    componentDidMount = () => {
        var headers = new Headers();
        axios.defaults.withCredentials = true;
        axios.get('http://localhost:3000/events/' + this.props.eventId)
            .then(response => {
                this.setState(response.data[0]);
                console.log(this.state.eventDetails)
            }).catch(() => {
            window.alert("FAIL")
        })
    };

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <Grid container wrap="nowrap" spacing={2}>
                        <Grid item>
                            <Avatar className={classes.black}>
                                <EventNoteIcon/>
                            </Avatar>
                        </Grid>
                        <Grid item xs>
                            <Typography>{this.props.eventName}</Typography>
                        </Grid>
                    </Grid>
                </Paper>
                <Paper className={classes.paper}>
                    <Grid container wrap="nowrap" spacing={2}>
                        <Grid item>
                            <Avatar className={classes.black}>
                                <DescriptionIcon/>
                            </Avatar>
                        </Grid>
                        <Grid item xs>
                            <Typography>{this.props.eventDescription}</Typography>
                        </Grid>
                    </Grid>
                </Paper>
                <Paper className={classes.paper}>
                    <Grid container wrap="nowrap" spacing={2}>
                        <Grid item>
                            <Avatar className={classes.black}>
                                <AccessAlarmIcon/>
                            </Avatar>
                        </Grid>
                        <Grid item xs>
                            <Typography>{this.props.time}</Typography>
                        </Grid>
                    </Grid>
                </Paper>
                <Paper className={classes.paper}>
                    <Grid container wrap="nowrap" spacing={2}>
                        <Grid item>
                            <Avatar className={classes.black}>
                                <TodayIcon/>
                            </Avatar>
                        </Grid>
                        <Grid item xs>
                            <Typography>{this.props.fromDate}</Typography>
                        </Grid>
                    </Grid>
                </Paper>
                <Paper className={classes.paper}>
                    <Grid container wrap="nowrap" spacing={2}>
                        <Grid item>
                            <Avatar className={classes.black}>
                                <EventIcon/>
                            </Avatar>
                        </Grid>
                        <Grid item xs>
                            <Typography>{this.props.toDate}</Typography>
                        </Grid>
                    </Grid>
                </Paper>
                <Paper className={classes.paper}>
                    <Grid container wrap="nowrap" spacing={2}>
                        <Grid item>
                            <Avatar className={classes.black}>
                                <LocationCityIcon/>
                            </Avatar>
                        </Grid>
                        <Grid item xs>
                            <Typography>{this.props.location}</Typography>
                        </Grid>
                    </Grid>
                </Paper>
                <Paper className={classes.paper}>
                    <Grid container wrap="nowrap" spacing={2}>
                        <Grid item>
                            <Avatar className={classes.black}>
                                <CheckBoxIcon/>
                            </Avatar>
                        </Grid>
                        <Grid item xs>
                            <Typography>{this.props.eligibility}</Typography>
                        </Grid>
                    </Grid>
                </Paper>
                <Paper className={classes.paper}>
                    <Grid container wrap="nowrap" spacing={2}>
                        <Grid item>
                            <Avatar className={classes.black}>
                                <ComputerIcon/>
                            </Avatar>
                        </Grid>
                        <Grid item xs>
                            <Typography>{this.props.major}</Typography>
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        );
    }
}

export default withStyles(styles)(EventDetails);
