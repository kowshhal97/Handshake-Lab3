import React from 'react';
import SideBar from './SideBar/SideBar'
import Login from './Login/Login'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import './Login.css'
import axios from 'axios';
import {connect} from 'react-redux'

import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';

import Typography from '@material-ui/core/Typography';

function TabContainer(props) {
    return (
        <Typography component="div" style={{padding: 8 * 3}}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
});

class SimpleTabs extends React.Component {

    state = {
        value: 0,
        emailId: "",
        password: "",
    };

    handleChange = (event, value) => {
        this.setState({value});
    };

    emailHandler = (e) => {

        this.setState({emailId: e.target.value})
    };
    passwordHandler = (e) => {

        this.setState({password: e.target.value})
    };


    studentLogin = (e, userType) => {
        const header = {
            'Content-Type': 'application/json',
        };
        e.preventDefault();
        const data = {
            email: this.state.emailId,
            password: this.state.password
        };
        console.log(data);
        axios.defaults.withCredentials = true;
        axios.post('http://localhost:3000/student/login', data, header)
            .then(response => {
                let user = response.data;
                this.props.onLogin(userType, user);
            }).catch(() => {
            window.alert("FAIL")
        })
    };

    companyLogin = (e, userType) => {
        var headers = new Headers();
        e.preventDefault();
        const data = {
            email: this.state.emailId,
            password: this.state.password,
        };
        axios.defaults.withCredentials = true;
        axios.post('http://localhost:3000/company/login', data)
            .then(response => {
                // window.alert("Successs")
                let user = response.data;
                this.props.onLogin(userType, user);
            }).catch(() => {
            window.alert("FAIL");
        })
    };


    render() {
        const {classes} = this.props;
        const {value} = this.state;


        return (
            <div className={classes.root}>
                <Grid container>
                    <Grid item xs={4} className='sideBarDiv'>
                        <SideBar/>
                    </Grid>
                    <Grid item xs={8} className='main'>
                        <Paper square className='main'>
                            <AppBar position="static" color="default">
                                <Tabs value={value} onChange={this.handleChange}>
                                    <Tab label="Student"/>
                                    <Tab label="Company"/>
                                </Tabs>
                            </AppBar>
                            {value === 0 && <TabContainer><Login type="student" changeEmail={this.emailHandler}
                                                                 changePassword={this.passwordHandler}
                                                                 login={this.studentLogin}/></TabContainer>}
                            {value === 1 && <TabContainer><Login type="company" changeEmail={this.emailHandler}
                                                                 changePassword={this.passwordHandler}
                                                                 login={this.companyLogin}/></TabContainer>}
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

SimpleTabs.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => {
    return ({
        onLogout: () => dispatch({type: 'LOGOUT'}),
        onLogin: (value, user) => dispatch({type: 'LOGIN', value: value, user: user})
    });
};

const mapStateToProps = state => {
    return {
        isLoggedIn: state.isLoggedIn,
        userType: state.userType,
        user: state.user
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SimpleTabs));