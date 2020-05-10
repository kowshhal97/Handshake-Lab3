import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';


import EventIcon from '@material-ui/icons/Event';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 150,
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


export default function PostEvents(props) {
    const classes = useStyles();

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <EventIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Event Form
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="EventName"
                                name="EventName"
                                variant="outlined"
                                required
                                fullWidth
                                id="EventName"
                                label="Event Name"
                                autoFocus
                                onChange={props.changeEventName}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="Description"
                                label="Description"
                                name="Description"
                                autoComplete="Description"
                                onChange={props.changeDescription}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="time"
                                label="Time"
                                type="time"
                                name="time"
                                className={classes.textField}
                                onChange={props.changeTime}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    step: 300, // 5 min
                                }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="location"
                                label="location"
                                type="text"
                                id="location"
                                autoComplete="location"
                                onChange={props.changeLocation}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                id="date"
                                label="From Date"
                                type="date"
                                className={classes.textField}
                                onChange={props.changeFromDate}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="date"
                                label="to Date"
                                type="date"
                                className={classes.textField}
                                onChange={props.changeToDate}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>


                        <Grid item xs={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="Eligibility"
                                label="Eligibility"
                                type="text"
                                id="Eligibility"
                                autoComplete="Eligibility"
                                onChange={props.ChangeEligibility}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="major"
                                label="Major"
                                type="text"
                                id="major"
                                autoComplete="major"
                                onChange={props.ChangeMajor}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={props.postEvent}>
                        Post Event
                    </Button>
                </form>
            </div>
        </Container>
    );
}