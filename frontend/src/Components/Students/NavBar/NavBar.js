import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Grid from '@material-ui/core/Grid';
import {Redirect} from 'react-router';

import {Link} from 'react-router-dom';


import {useSelector} from 'react-redux'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    fontStyle: {
        fontSize: 200
    }
}));

const ButtonAppBar = (props) => {
    const classes = useStyles();
    const store = useSelector(store => store);

    let redirectVar = null;
    let logout = () => {
        props.onLogout();
    };

    if (store.isLoggedIn) {
        redirectVar = <Redirect to="/"/>
    } else {
        redirectVar = null;
    }

    return (
        <div className={classes.root}>

            {redirectVar}

            <AppBar position="static">
                <Toolbar>
                    <Grid item xs={3}>
                        <Grid container direction="row" justify="flex-start" alignItems="center">
                            <IconButton edge="start" className={classes.menuButton} color="inherit">
                                <Link to="/dashboard" style={{textDecoration: 'none', color: 'white'}}>
                                    <img alt="Handshake logo" height="42"
                                         src="https://www.westminster.edu/campus/services/professional-development-center/images/Handshake_logo_(2).png"></img>
                                </Link>
                            </IconButton>
                            <h3> {props.userType}</h3>
                        </Grid>
                    </Grid>
                    <Grid item xs={4}>
                        <div style={{'width': '20em'}}>
                            <Paper component="form" className={classes.root}>
                                <Grid container direction="row" justify="flex-start" alignItems="center">
                                    <Grid item xs={10}>
                                        <InputBase
                                            className={classes.input}
                                            placeholder="Search"/>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <IconButton type="submit" className={classes.iconButton} aria-label="search">
                                            <SearchIcon/>
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </Paper>

                        </div>
                    </Grid>
                    <Grid item xs={5}>
                        <Grid container direction="row" justify="space-between" alignItems="center">
                            <Link to="/dashboard" style={{textDecoration: 'none', color: 'white'}}><Button
                                color="inherit">Jobs</Button></Link>
                            <Link to="/events" style={{textDecoration: 'none', color: 'white'}}><Button
                                color="inherit">Events</Button></Link>
                            <Link to="/studentsTab" style={{textDecoration: 'none', color: 'white'}}><Button
                                color="inherit">Students</Button></Link>
                            <Link to="/messages" style={{textDecoration: 'none', color: 'white'}}><Button
                                color="inherit">messages</Button></Link>
                            <Link to="/profile" style={{textDecoration: 'none', color: 'white'}}><Button
                                color="inherit">profile</Button></Link>
                            <Button onClick={logout} color="inherit">Logout</Button>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </div>
    );
};


export default ButtonAppBar;