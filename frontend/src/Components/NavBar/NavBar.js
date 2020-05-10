import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import {Link} from 'react-router-dom';

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
}));

export default function ButtonAppBar() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit">
                        <Link to="/" style={{textDecoration: 'none', color: 'white'}}>
                            <img alt="Handshake logo" height="42"
                                 src="https://www.westminster.edu/campus/services/professional-development-center/images/Handshake_logo_(2).png"></img>
                        </Link>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Handshake
                    </Typography>
                    <Link to="/login" style={{textDecoration: 'none', color: 'white'}}><Button
                        color="inherit">Login</Button></Link>
                    <Link to="/signup" style={{textDecoration: 'none', color: 'white'}}><Button color="inherit">Sign
                        Up</Button></Link>

                </Toolbar>
            </AppBar>
        </div>
    );
}