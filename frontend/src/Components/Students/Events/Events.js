import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


import AllEvents from './AllEvents/AllEvents';
import RegisteredEvents from './RegisteredEvents/RegisteredEvents'

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
                                        <Tab label="All Events"/>
                                        <Tab label="Registered Events"/>
                                    </Tabs>
                                </AppBar>
                                {value === 0 && <TabContainer><AllEvents/></TabContainer>}
                                {value === 1 && <TabContainer><RegisteredEvents/></TabContainer>}
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


export default (withStyles(styles)(Events));
