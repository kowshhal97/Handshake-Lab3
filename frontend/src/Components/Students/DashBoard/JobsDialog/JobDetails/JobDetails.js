import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import WorkIcon from '@material-ui/icons/Work';
import DescriptionIcon from '@material-ui/icons/Description';
import SchoolIcon from '@material-ui/icons/School';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import TodayIcon from '@material-ui/icons/Today';
import EventIcon from '@material-ui/icons/Event';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';


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


class EventDetails extends Component {

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <Grid container wrap="nowrap" spacing={2}>
                        <Grid item>
                            <Avatar className={classes.black}>
                                <WorkIcon/>
                            </Avatar>
                        </Grid>
                        <Grid item xs>
                            <Typography>{this.props.jobTitle}</Typography>
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
                            <Typography>{this.props.jobDescription}</Typography>
                        </Grid>
                    </Grid>
                </Paper>
                <Paper className={classes.paper}>
                    <Grid container wrap="nowrap" spacing={2}>
                        <Grid item>
                            <Avatar className={classes.black}>
                                <SchoolIcon/>
                            </Avatar>
                        </Grid>
                        <Grid item xs>
                            <Typography>{this.props.jobRequirements}</Typography>
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
                            <Typography>{this.props.postingDate}</Typography>
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
                            <Typography>{this.props.deadline}</Typography>
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
                                <MonetizationOnIcon/>
                            </Avatar>
                        </Grid>
                        <Grid item xs>
                            <Typography>{this.props.salary}</Typography>
                        </Grid>
                    </Grid>
                </Paper>
                <Paper className={classes.paper}>
                    <Grid container wrap="nowrap" spacing={2}>
                        <Grid item>
                            <Avatar className={classes.black}>
                                <HomeWorkIcon/>
                            </Avatar>
                        </Grid>
                        <Grid item xs>
                            <Typography>{this.props.category}</Typography>
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        );
    }
}

export default withStyles(styles)(EventDetails);
