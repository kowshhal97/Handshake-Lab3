import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import axios from 'axios';

import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';


import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

import Grid from '@material-ui/core/Grid';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {connect} from 'react-redux'

const styles = theme => ({
    card: {
        maxWidth: 400,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    actions: {
        display: 'flex',
    },
    textStyle: {
        marginTop: 20,
        marginLeft: 10,
        width: 300
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
});

class RecipeReviewCard extends React.Component {
    state = {
        img: "https://handshake-project.s3-us-west-2.amazonaws.com/profile_" + (this.props.user._id),
        expanded: false,
        editBasicDetails: false,
        profilePicUpdated: true,
        imageHash: Date.now()
    };

    editBasicDetails = () => {
        this.setState({editBasicDetails: !this.state.editBasicDetails})
    };

    editCancel = () => {
        this.setState({editBasicDetails: false})
    };
    handleExpandClick = () => {
        this.setState(state => ({expanded: !state.expanded}));
    };

    save = () => {
        this.props.save();
        this.editCancel()
    };


    onFileSelect = (e) => {
        const fd = new FormData();
        fd.append('upl', e.target.files[0]);
        axios
            .post(`http://localhost:3000/student/studentProfile/upload/${this.props.user._id}`, fd)
            .then(res => {
                if (res.status === 200) {
                    this.setState(this.state)
                }
            })
            .catch(err => {
                window.alert("Fail")
            });
    };

    render() {
        console.log(this.props.user);
        const {classes} = this.props;

        return (
            <Card className={classes.card}>
                <CardHeader
                    title={this.props.user.name}
                    subheader={this.props.user.major}

                />
                <CardMedia
                    className={classes.media}
                    image={`${this.state.img}?${this.state.imageHash}`}
                    title="Profile Pic"/>
                <CardContent>

                    <Typography component="p">
                        {this.state.editBasicDetails ? (
                                <TextField className={classes.textStyle} id="outlined-basic" label="Career Objective"
                                           variant="outlined" defaultValue={this.props.user.careerObjective}
                                           onChange={this.props.changeObj}/>) :
                            (this.props.user.careerObjective)}
                    </Typography>
                </CardContent>
                <CardActions className={classes.actions} disableActionSpacing>
                    <IconButton
                        className={classnames(classes.expand, {
                            [classes.expandOpen]: this.state.expanded,
                        })}
                        onClick={this.handleExpandClick}
                        aria-expanded={this.state.expanded}
                        aria-label="Show more"
                    >
                        <ExpandMoreIcon/>
                    </IconButton>
                </CardActions>
                <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Grid xs={12} container direction="row" justify="flex-end" alignItems="center">

                        </Grid>
                        <List className={classes.root}>
                            {this.state.editBasicDetails ? (
                                <TextField className={classes.textStyle} id="outlined-basic" label="College Name"
                                           variant="outlined" defaultValue={this.props.user.collegeName} disabled/>) : (
                                <ListItem alignItems="flex-start">
                                    <ListItemAvatar>
                                        <Avatar alt="Remy Sharp"
                                                src="https://cdn2.iconfinder.com/data/icons/maki/100/college-512.png"/>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary="College"
                                        secondary={
                                            <React.Fragment>
                                                <Typography
                                                    component="span"
                                                    variant="body2"
                                                    className={classes.inline}
                                                >
                                                    {this.props.user.collegeName}
                                                </Typography>
                                            </React.Fragment>
                                        }
                                    />
                                </ListItem>)}
                            <Divider variant="inset" component="li"/>
                            {this.state.editBasicDetails ? (
                                <TextField className={classes.textStyle} id="outlined-basic" label="City Name"
                                           variant="outlined" defaultValue={this.props.user.name}
                                           onChange={this.props.changeCity}/>) : (<ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar alt="Travis Howard"
                                            src="data:image/png;base64,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="/>
                                </ListItemAvatar>
                                <ListItemText
                                    primary="City"
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                className={classes.inline}
                                                // color="textPrimary"
                                            >
                                                {this.props.user.city}
                                            </Typography>

                                        </React.Fragment>
                                    }
                                />
                            </ListItem>)}
                            <Divider variant="inset" component="li"/>
                            {this.state.editBasicDetails ? (
                                <TextField className={classes.textStyle} id="outlined-basic" label="State Name"
                                           variant="outlined" defaultValue={this.props.user.state}
                                           onChange={this.props.changeSta}/>) : (<ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar alt="Travis Howard"
                                            src="https://static.thenounproject.com/png/15214-200.png"/>
                                </ListItemAvatar>
                                <ListItemText
                                    primary="State"
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                className={classes.inline}
                                                // color="textPrimary"
                                            >
                                                {this.props.user.state}
                                            </Typography>
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>)}


                            <Divider variant="inset" component="li"/>
                            {this.state.editBasicDetails ? (
                                <TextField className={classes.textStyle} id="outlined-basic" label="Country Name"
                                           variant="outlined" defaultValue={this.props.user.country}
                                           onChange={this.props.changeCon}/>) : (<ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar alt="Cindy Baker"
                                            src="https://cdn3.iconfinder.com/data/icons/location-set/50/planet-512.png"/>
                                </ListItemAvatar>
                                <ListItemText
                                    primary="Country"
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                className={classes.inline}
                                            >
                                                {this.props.user.country}
                                            </Typography>
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>)}
                            <Divider variant="inset" component="li"/>
                            {this.state.editBasicDetails ? (
                                <TextField className={classes.textStyle} id="outlined-basic" label="Phone Number"
                                           variant="outlined" defaultValue={this.props.user.contactNumber}
                                           onChange={this.props.changePh}/>) : (<ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar alt="Travis Howard"
                                            src="https://cdn.onlinewebfonts.com/svg/img_352137.png"/>
                                </ListItemAvatar>
                                <ListItemText
                                    primary="Phone Number"
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                className={classes.inline}
                                                // color="textPrimary"
                                            >
                                                {this.props.user.contactNumber}
                                            </Typography>
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>)}
                            <Divider variant="inset" component="li"/>
                            {this.state.editBasicDetails ? (
                                <TextField className={classes.textStyle} id="outlined-basic" label="Date Of Birth"
                                           variant="outlined" defaultValue={this.props.user.dateOfBirth}
                                           onChange={this.props.changeDob}/>) : (<ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar alt="Travis Howard"
                                            src="https://image.flaticon.com/icons/png/512/2195/2195392.png"/>
                                </ListItemAvatar>
                                <ListItemText
                                    primary="Date Of Birth"
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                className={classes.inline}
                                                // color="textPrimary"
                                            >
                                                {this.props.user.dateOfBirth}
                                            </Typography>
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>)}
                        </List>

                        {this.state.editBasicDetails ? (
                            <Grid container xs justify="flex-end" direction="row" alignItems="center">
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
                                <Button onClick={this.editCancel}>
                                    Cancel
                                </Button>
                            </Grid>) : (null)}


                    </CardContent>
                </Collapse>
            </Card>
        );
    }
}

RecipeReviewCard.propTypes = {
    classes: PropTypes.object.isRequired,
};


const mapStateToProps = state => {
    return {};
};


export default connect(mapStateToProps)(withStyles(styles)(RecipeReviewCard));
