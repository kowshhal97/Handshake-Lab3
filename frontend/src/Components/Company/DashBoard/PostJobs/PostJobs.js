import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import WorkIcon from '@material-ui/icons/Work';
import React from 'react';


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
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));


export default function PostEvents(props) {
    const classes = useStyles();


    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <WorkIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Job Posting Form
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="JobTitle"
                                name="JobTitle"
                                variant="outlined"
                                required
                                fullWidth
                                id="JobTitle"
                                label="Job Title"
                                autoFocus
                                onChange={props.changeJobTitle}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="date"
                                label="Posting Date"
                                type="date"
                                className={classes.textField}
                                onChange={props.changePostingDate}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="date"
                                label="Deadline"
                                type="date"
                                className={classes.textField}
                                onChange={props.deadlineDate}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>


                        <Grid item xs={6}>
                            <TextField
                                id="time"
                                label="Salary"
                                type="number"
                                name="Salary"
                                className={classes.textField}
                                onChange={props.changeSalary}

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
                            <FormControl className={classes.formControl}>
                                <InputLabel id="demo-controlled-open-select-label">Qualifications</InputLabel>
                                <Select
                                    labelId="demo-controlled-open-select-label"
                                    id="demo-controlled-open-select"
                                    onChange={props.changeQualification}>

                                    <MenuItem value={"PHD"}>PHD</MenuItem>
                                    <MenuItem value={"Masters"}>Masters</MenuItem>
                                    <MenuItem value={"Bachelors"}>Bachelors</MenuItem>
                                    <MenuItem value={"Any"}>Any</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="demo-controlled-open-select-label">Category</InputLabel>
                                <Select
                                    labelId="demo-controlled-open-select-label"
                                    id="demo-controlled-open-select"
                                    onChange={props.changeCategory}>

                                    <MenuItem value={"Part Time"}>Part Time</MenuItem>
                                    <MenuItem value={"On Campus"}>On Campus</MenuItem>
                                    <MenuItem value={"Internship"}>Internship</MenuItem>
                                    <MenuItem value={"FullTime"}>Full Time</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={props.postJob}>
                        Post Job
                    </Button>
                </form>
            </div>
        </Container>
    );
}