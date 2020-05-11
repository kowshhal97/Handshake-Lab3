import React from 'react';
import Signup from './Signup/Signup'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import './Signup.css';
import axios from 'axios';

import { connect } from 'react-redux'
import * as compose from 'lodash.flowright';
import { graphql } from 'react-apollo'
import { gql } from 'apollo-boost';


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
        name: "",
        emailId: "",
        password: "",
        collegeName: "",
        major: "",


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

    collegeNameHandler = (e) => {

        this.setState({collegeName: e.target.value})
    };

    nameHandler = (e) => {

        this.setState({name: e.target.value})
    };

    MajorHandler = (e) => {
        this.setState({major: e.target.value})
    };

    signup = async (e, userType) => {
        var headers = new Headers();
        e.preventDefault();
        if (userType === 'student') {
            const data = {
                email: this.state.emailId,
                password: this.state.password,
                name: this.state.name,
                collegeName: this.state.collegeName,
                major: this.state.major,
                contactNumber: "",
                dateOfBirth: "",
                city: "",
                state: "",
                country: "",
                careerObjective: ""
            };
            axios.defaults.withCredentials = true;
            console.log(data);
            let response = await this.props.studentSignupMutation({
                variables: {
                    studentDetails: data
                }
            })
    let user = {...response.data.studentSignup }

        this.props.onLogin(userType, user);

        } else {
            const data = {
                email: this.state.emailId,
                password: this.state.password,
                name: this.state.name,
                location: this.state.collegeName
            };
            let response = await this.props.companySignupMutation({
                variables: {
                    employerDetails: data
                }
            })
    
            let user = {...response.data.companySignup }
    
            this.props.onLogin(userType, user);
    
        }
    };

    render() {
        const {classes} = this.props;
        const {value} = this.state;

        return (
            <div className={classes.root}>
                <Grid className='main'>
                    <Paper square className='main'>
                        <AppBar position="static" color="default">
                            <Tabs value={value} onChange={this.handleChange}>
                                <Tab label="Student"/>
                                <Tab label="Company"/>
                            </Tabs>
                        </AppBar>
                        {value === 0 &&
                        <TabContainer><Signup type="student" par="CollegeName" changeEmail={this.emailHandler}
                                              changePassword={this.passwordHandler}
                                              changeCollege={this.collegeNameHandler} changeName={this.nameHandler}
                                              signup={this.signup} major={this.MajorHandler}/></TabContainer>}
                        {value === 1 &&
                        <TabContainer><Signup type="company" par="Location" changeEmail={this.emailHandler}
                                              changePassword={this.passwordHandler}
                                              changeCollege={this.collegeNameHandler} changeName={this.nameHandler}
                                              signup={this.signup} major={this.MajorHandler}/></TabContainer>}
                    </Paper>
                </Grid>
            </div>
        );
    }
}

SimpleTabs.propTypes = {
    classes: PropTypes.object.isRequired,
};


const studentSignupMutation = gql`
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

const companySignupMutation = gql`
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
    graphql(studentSignupMutation, { name: "studentSignupMutation" }),
    graphql(companySignupMutation, { name: "companySignupMutation" }),
    connect(mapStateToProps, mapDispatchToProps))(withStyles(styles)(SimpleTabs));