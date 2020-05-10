import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import axios from 'axios';
import {connect} from 'react-redux'


import PostEvents from './PostEvents/PostEvents'
import PostedEvents from './ViewPostedEvents/PostedEvents'

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

class Events extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: 0,
            eventName: "",
            description: "",
            time: "",
            toDate: "",
            fromDate: "",
            eligibility: "",
            location: "",
            major: "",
            getEventData: []
        };
    }

    handleChange = (event, value) => {
        this.setState({value});
    };

    eventNameHandler = (e) => {
        this.setState({eventName: e.target.value})
    };

    descriptionHandler = (e) => {
        this.setState({description: e.target.value})
    };
    timeHandler = (e) => {
        this.setState({time: e.target.value})
    };
    fromDateHandler = (e) => {

        this.setState({fromDate: e.target.value})

    };
    toDateHandler = (e) => {
        this.setState({toDate: e.target.value})

    };
    eligibilityHandler = (e) => {
        this.setState({eligibility: e.target.value})
    };
    locationHandler = (e) => {
        this.setState({location: e.target.value})
    };
    majorHandler = (e) => {
        this.setState({major: e.target.value})
    };
    postEvent = (e) => {
        var headers = new Headers();
        e.preventDefault();
        const data = {
            event_name: this.state.eventName,
            event_description: this.state.description,
            event_timing: this.state.time,
            event_from_date: this.state.fromDate,
            event_to_date: this.state.toDate,
            event_location: this.state.location,
            event_eligibility_criteria: this.state.eligibility,
            event_major: this.state.major
        };
        console.log(data);
        axios.defaults.withCredentials = true;
        axios.post('http://localhost:3000/events/' + this.props.user.name, data)
            .then(response => {
                console.log("Status Code : ", response.status);
            }).catch(() => {
            window.alert("FAIL")
        })
    };


    // componentDidMount = () => {
    //     var headers = new Headers();
    //     axios.defaults.withCredentials = true;
    //     axios.get('http://localhost:3000/events')
    //         .then(response => {
    //             this.setState({ getEventData: [...response.data] })
    //             console.log(this.state.getEventData)
    //         }).catch(() => {
    //             window.alert("FAIL")
    //         })
    // }


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
                                        <Tab label="Posted Events"/>
                                        <Tab label="Post Events"/>
                                    </Tabs>
                                </AppBar>
                                {value === 0 && <TabContainer><PostedEvents/></TabContainer>}
                                {value === 1 && <TabContainer><PostEvents changeEventName={this.eventNameHandler}
                                                                          changeDescription={this.descriptionHandler}
                                                                          changeTime={this.timeHandler}
                                                                          changeLocation={this.locationHandler}
                                                                          changeFromDate={this.fromDateHandler}
                                                                          changeToDate={this.toDateHandler}
                                                                          ChangeEligibility={this.eligibilityHandler}
                                                                          ChangeMajor={this.majorHandler}
                                                                          postEvent={this.postEvent}/></TabContainer>}
                            </Paper>
                        </Grid>
                    </div>
                </div>
            </div>
        );
    }
}

Events.propTypes = {
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


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Events));
