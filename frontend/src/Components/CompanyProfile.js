import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import {connect} from 'react-redux'
import Paper from '@material-ui/core/Paper';
import {withStyles} from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import DescriptionIcon from '@material-ui/icons/Description';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';


const styles = {
    bigAvatar: {
        margin: 10,
        width: 160,
        height: 160,
    },
    profileCard: {
        height: 300,
        width: 300,
    },
    profilePaper: {},
    companyMain: {
        minHeight: 500
    },
    companyDetailsPaper: {
        margin: 20,
        height: 100

    },
    companyPaperInternal: {
        paddingLeft: 10,
    },
    companyPaperInternalTitle: {},
    editButton: {
        position: "absolute",
        marginBotton: 10
    },
    companyName: {
        textAlign: "center"
    },
    textStyle: {
        marginTop: 20,
        marginLeft: 10,
        width: 400
    },
    buttonCss: {}

};

class Profile extends Component {


    state = {
        name: "",
        editDes: false,
        editLoc: false,
        editContact: false

    };


    componentDidMount = () => {
        var headers = new Headers();
        axios.defaults.withCredentials = true;
        axios.get('http://localhost:3000/company/companyProfile/' + this.props.location.companyName)
            .then(response => {

                this.setState(response.data)
            }).catch(() => {
            window.alert("FAIL")
        })
    };
    editDesc = (e) => {
        this.setState({editDes: true})
    };
    editDescCancel = () => {
        this.setState({editDes: false})
    };
    changeDesc = (e) => {
        this.setState({description: e.target.value})
    };
    editLoc = (e) => {
        this.setState({editLoc: true})
    };
    editLocCancel = () => {
        this.setState({editLoc: false})
    };
    changeLoc = (e) => {

        this.setState({location: e.target.value})
    };
    editContact = (e) => {
        this.setState({editContact: true})
    };
    editContactCancel = () => {
        this.setState({editContact: false})
    };
    changeContact = (e) => {

        this.setState({contactNumber: e.target.value})
    };
    save = () => {
        var headers = new Headers();
        const data = {
            name: this.state.name,
            location: this.state.location,
            description: this.state.description,
            contactNumber: this.state.contactNumber
        };
        axios.defaults.withCredentials = true;
        axios.put('http://localhost:3000/company/companyProfile/' + this.props.user.name, data)
            .then(response => {
                this.props.onSave(response.data)
            }).catch(() => {
            window.alert("FAIL")
        });
        this.editDescCancel();
        this.editContactCancel();
        this.editLocCancel();
    };

    render() {
        const {classes} = this.props;
        let desc = null;
        let loc = null;
        let contactInfo = null;
        if (this.state.editDes) {
            desc = (
                <Grid container>
                    <Grid xs={6}>
                        <TextField className={classes.textStyle} id="outlined-basic" label="Description"
                                   variant="outlined" defaultValue={this.state.description}
                                   helperText="Edit Description Here" onChange={this.changeDesc}/>
                    </Grid>
                    <Grid container xs={6} justify="flex-end" direction="row" alignItems="center">
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            startIcon={<SaveIcon/>}
                            onClick={this.save}
                            className={classes.buttonCss}
                        >
                            Save
                        </Button>
                        <Button onClick={this.editDescCancel}>
                            Cancel
                        </Button>
                    </Grid>

                </Grid>);
        } else {
            desc = (<Grid
                className={classes.companyPaperInternal}>
                <Grid container>
                    <Grid container xs
                          alignItems="center">
                        <Grid>
                            <h3>Description</h3>
                        </Grid>
                        <Grid>
                            <DescriptionIcon/>
                        </Grid>
                    </Grid>
                    <Grid container xs justify="flex-end" direction="row" alignItems="flex-start">

                    </Grid>
                </Grid>
                <Grid>
                    {this.state.description}
                </Grid>
            </Grid>)
        }


        if (this.state.editContact) {
            contactInfo = (
                <Grid container>
                    <Grid xs={6}>
                        <TextField className={classes.textStyle} id="outlined-basic" label="Description"
                                   variant="outlined" defaultValue={this.state.contactNumber}
                                   helperText="Edit Contact Information Here" onChange={this.changeContact}/>
                    </Grid>
                    <Grid container xs={6} justify="flex-end" direction="row" alignItems="center">
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            startIcon={<SaveIcon/>}
                            onClick={this.save}
                            className={classes.buttonCss}
                        >
                            Save
                        </Button>
                        <Button onClick={this.editContactCancel}>
                            Cancel
                        </Button>
                    </Grid>

                </Grid>);
        } else {
            contactInfo = (<Grid
                className={classes.companyPaperInternal}>
                <Grid container>
                    <Grid container xs
                          alignItems="center">
                        <Grid>
                            <h3>Contact Information</h3>
                        </Grid>
                        <Grid>
                            <DescriptionIcon/>
                        </Grid>
                    </Grid>

                </Grid>
                <Grid>
                    {this.state.contactNumber}
                </Grid>
            </Grid>)
        }


        if (this.state.editLoc === true) {
            loc = (
                <Grid container>
                    <Grid xs={6}>
                        <TextField className={classes.textStyle} id="outlined-basic" label="Description"
                                   variant="outlined" defaultValue={this.state.location} helperText="Edit Location Here"
                                   onChange={this.changeLoc}/>
                    </Grid>
                    <Grid container xs={6} justify="flex-end" direction="row" alignItems="center">
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            startIcon={<SaveIcon/>}
                            onClick={this.save}
                            className={classes.buttonCss}>
                            Save
                        </Button>
                        <Button onClick={this.editLocCancel}>
                            Cancel
                        </Button>
                    </Grid>

                </Grid>);

        } else {
            loc = (<Grid
                className={classes.companyPaperInternal}>
                <Grid container>
                    <Grid container xs
                          alignItems="center">
                        <Grid>
                            <h3>Location</h3>
                        </Grid>
                        <Grid>
                            <LocationCityIcon/>
                        </Grid>
                    </Grid>
                    <Grid container xs justify="flex-end" direction="row" alignItems="flex-start">

                    </Grid>
                </Grid>
                <Grid>
                    {this.state.location}
                </Grid>
            </Grid>)
        }

        return (
            <div className="profileMain">
                <div className="profileLayout">

                    <Grid container>
                        <Grid container item xs={4} container direction="row" justify="center" alignItems="flex-start">
                            <Paper className={classes.profilePaper}>

                                <Grid container direction="column" justify="flex-start" alignItems="center"
                                      className={classes.profileCard}>
                                    <Grid container>
                                        <Grid container xs direction="row" alignItems="flex-end"
                                              className="companyName">
                                            <h2>{this.state.name}</h2>
                                        </Grid>
                                        <Grid container xs justify="flex-end" direction="row" alignItems="flex-start">

                                        </Grid>
                                    </Grid>
                                    <Grid container direction="row" justify="center" alignItems="stretch">
                                        <img
                                            src="https://pbs.twimg.com/profile_images/1216813945408966663/vkVajfRz_400x400.jpg"
                                            className={classes.bigAvatar}/>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                        <Grid item xs={8}>
                            <Grid container direction="column" alignItems="stretch" className={classes.companyMain}>
                                <Paper className={classes.companyDetailsPaper}>
                                    <Grid>
                                        {desc}
                                    </Grid>
                                </Paper>
                                <Paper className={classes.companyDetailsPaper}>
                                    <Grid>
                                        {loc}
                                    </Grid>
                                </Paper>
                                <Paper className={classes.companyDetailsPaper}>
                                    <Grid>
                                        {contactInfo}
                                    </Grid>
                                </Paper>


                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </div>)
    }
}


const mapDispatchToProps = dispatch => {
    return ({
        onSave: (user) => dispatch({type: "saveToProfile", user: user})
    });
};

const mapStateToProps = state => {
    return {
        user: state.user
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Profile));
    
    
    
    
    
    
    
    
    
    
    
    
   