import React from 'react';
import SideBar from './SideBar/SideBar'
import Login from './Login/Login'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import './Login.css'

import { connect } from 'react-redux'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';

import { graphql } from 'react-apollo'
import { gql } from 'apollo-boost';

import Typography from '@material-ui/core/Typography';

import * as compose from 'lodash.flowright';

function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
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
        this.setState({ value });
    };

    emailHandler = (e) => {

        this.setState({ emailId: e.target.value })
    };
    passwordHandler = (e) => {

        this.setState({ password: e.target.value })
    };


    studentLogin = async (e, userType) => {

        e.preventDefault();
        const data = {
            email: this.state.emailId,
            password: this.state.password
        };

        console.log(data)
        let response = await this.props.studentLoginMutation({
            variables: {
                studentDetails: data
            }
        })

        console.log(response)
        let user = {...response.data.studentLogin }

        this.props.onLogin(userType, user);

    };

    companyLogin = async (e, userType) => {
        var headers = new Headers();
        e.preventDefault();
        const data = {
            email: this.state.emailId,
            password: this.state.password,
        };

        let response = await this.props.companyLoginMutation({
            variables: {
                employerDetails: data
            }
        })

        let user = {...response.data.companyLogin }

        this.props.onLogin(userType, user);

        console.log(response)

    };

    render() {
        const { classes } = this.props;
        const { value } = this.state;


        return (
            <div className={classes.root}>
                <Grid container>
                    <Grid item xs={4} className='sideBarDiv'>
                        <SideBar />
                    </Grid>
                    <Grid item xs={8} className='main'>
                        <Paper square className='main'>
                            <AppBar position="static" color="default">
                                <Tabs value={value} onChange={this.handleChange}>
                                    <Tab label="Student" />
                                    <Tab label="Company" />
                                </Tabs>
                            </AppBar>
                            {value === 0 && <TabContainer><Login type="student" changeEmail={this.emailHandler}
                                changePassword={this.passwordHandler}
                                login={this.studentLogin} /></TabContainer>}
                            {value === 1 && <TabContainer><Login type="company" changeEmail={this.emailHandler}
                                changePassword={this.passwordHandler}
                                login={this.companyLogin} /></TabContainer>}
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


const studentLoginMutation = gql`
mutation login($studentDetails:studentInput){
    studentLogin(studentDetails:$studentDetails)
    {
        _id
        name
        email
        password
        major
        collegeName
        contactNumber
        dateOfBirth
        city
        state
        country
        careerObjective
        skillSet
        education {
          id
          institution_name
          location
          degree
          major
          passing_year
          cgpa
        }
        experience {
          id
          company_name
          designation
          company_location
          work_summary
          starting_date
          ending_date
        }
        applications{
          _id
          applicationId
          status
          companyName
          job_title
          job_location
          job_salary
          job_description
          job_category
          job_posting_date
          job_application_deadline
          job_requirements
          application_date
        }
    }
  }
`;

const companyLoginMutation = gql`
mutation login($employerDetails:EmployerInput){
    companyLogin(employeeDetails:$employerDetails)
    {
      name
      location
      description
      contactNumber
    }
  }
`;

const mapDispatchToProps = dispatch => {
    return ({
        onLogout: () => dispatch({ type: 'LOGOUT' }),
        onLogin: (value, user) => dispatch({ type: 'LOGIN', value: value, user: user })
    });
};

const mapStateToProps = state => {
    return {
        isLoggedIn: state.isLoggedIn,
        userType: state.userType,
        user: state.user
    };
};


export default compose(
    graphql(studentLoginMutation, { name: "studentLoginMutation" }),
    graphql(companyLoginMutation, { name: "companyLoginMutation" }),
    connect(mapStateToProps, mapDispatchToProps))(withStyles(styles)(SimpleTabs));
