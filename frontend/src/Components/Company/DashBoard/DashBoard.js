import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {withStyles} from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import PostJobs from './PostJobs/PostJobs';
import PostedJobs from './View Posted Jobs/PostedJobs';


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

class DashBoard extends React.Component {
    state = {
        value: 0,
        jobPostings: [],
        job_title: "",
        job_posting_date: "",
        job_application_deadline: "",
        job_location: "",
        job_salary: "",
        job_description: "",
        job_requirements: "",
        job_category: "",

    };


    jobTitleHandler = (e) => {
        this.setState({job_title: e.target.value})
    };
    jobPostingHandler = (e) => {
        this.setState({job_posting_date: e.target.value})
    };
    jobDeadlineHandler = (e) => {
        this.setState({job_application_deadline: e.target.value})
    };
    jobLocationHandler = (e) => {
        this.setState({job_location: e.target.value})
    };
    jobSalaryHandler = (e) => {
        this.setState({job_salary: e.target.value})
    };
    jobDescriptionHandler = (e) => {
        this.setState({job_description: e.target.value})
    };
    jobRequirementsHandler = (e) => {
        this.setState({job_requirements: e.target.value})
    };
    jobCategoryHandler = (e) => {
        this.setState({job_category: e.target.value})
    };

    postJob = (e) => {
        var headers = new Headers();
        e.preventDefault();
        const data = {
            job_title: this.state.job_title,
            job_posting_date: this.state.job_posting_date,
            job_application_deadline: this.state.job_application_deadline,
            job_location: this.state.job_location,
            job_salary: this.state.job_salary,
            job_description: this.state.job_description,
            job_requirements: this.state.job_requirements,
            job_category: this.state.job_category
        };
        axios.defaults.withCredentials = true;
        axios.post('http://localhost:3000/jobs/' + this.props.user.name, data)
            .then(response => {

            }).catch(() => {
            window.alert("FAIL")
        })
    };


    handleChange = (event, value) => {
        this.setState({value});
    };


    render() {
        const {classes} = this.props;
        const {value} = this.state;


        return (
            <div className="profileMain">
                <div className="profileLayout">
                    <div className={classes.root}>
                        <Grid className='main'>
                            <Paper square className='main'>
                                <AppBar position="static" color="default">
                                    <Tabs value={value} onChange={this.handleChange}>
                                        <Tab label="Posted Jobs"/>
                                        <Tab label="Post Jobs"/>
                                    </Tabs>
                                </AppBar>
                                {value === 0 &&
                                <TabContainer>< PostedJobs jobPostings={this.state.jobPostings}/></TabContainer>}
                                {value === 1 && <TabContainer><PostJobs changeJobTitle={this.jobTitleHandler}
                                                                        changePostingDate={this.jobPostingHandler}
                                                                        deadlineDate={this.jobDeadlineHandler}
                                                                        changeSalary={this.jobSalaryHandler}
                                                                        changeLocation={this.jobLocationHandler}
                                                                        changeDescription={this.jobDescriptionHandler}
                                                                        changeQualification={this.jobRequirementsHandler}
                                                                        changeCategory={this.jobCategoryHandler}
                                                                        postJob={this.postJob}/></TabContainer>}
                            </Paper>
                        </Grid>
                    </div>
                </div>
            </div>
        );
    }
}

DashBoard.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => {
    return ({});
};

const mapStateToProps = state => {
    return {
        user: state.user
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DashBoard));