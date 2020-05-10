import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import EventDetails from './EventDetails/EventDetails'
import FavoriteIcon from '@material-ui/icons/Favorite';
import axios from 'axios';
import {connect} from 'react-redux';

const DialogTitle = withStyles(theme => ({
    root: {
        borderBottom: `1px solid ${theme.palette.divider}`,
        margin: 0,
        padding: theme.spacing.unit * 2,
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing.unit,
        top: theme.spacing.unit,
        color: theme.palette.grey[500],
    },
}))(props => {
    const {children, classes, onClose} = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon/>
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles(theme => ({
    root: {
        margin: 0,
        padding: theme.spacing.unit * 2,
    },
    diaglogWidth: {
        maxWidth: 10
    },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
    root: {
        borderTop: `1px solid ${theme.palette.divider}`,
        margin: 0,
        padding: theme.spacing.unit,
    },
}))(MuiDialogActions);

class CustomizedDialogDemo extends React.Component {
    state = {
      data:{},
        open: false
    };

    handleClickOpen = () => {
        this.setState({
            open: true,
        });
    };

    handleClose = (e) => {
        this.setState({open: false});
        this.props.close(e);
    };

    register = (e) => {
        var headers = new Headers();
        // e.preventDefault();
        const data = {
            student: this.props.user
        };
        axios.defaults.withCredentials = true;
        axios.post('http://localhost:3000/events/registered/' + this.props.eventId, data)
            .then(response => {
                this.setState({open: false});
                this.props.close(e);
                this.props.onSave(response.data)
            }).catch(() => {
            window.alert("FAIL")
        })

    };


    componentDidMount = () => {
        var headers = new Headers();
        axios.defaults.withCredentials = true;

        axios.get('http://localhost:3000/events/' + this.props.eventId)
            .then(response => {
                this.setState(response.data)
            }).catch(() => {
            window.alert("FAIL")
        })
    };

    render() {


        if (this.props.display === true && this.state.open === false) {
            this.setState({
                open: true,
            });

        }


        return (
            <div>

                <Dialog
                    onClose={this.handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={this.state.open}
                    fullWidth={true}
                    maxWidth={"sm"}
                >
                    <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
                        Event Details
                    </DialogTitle>
                    <DialogContent>
                        <EventDetails eventId={this.props.eventId} eventName={this.state.event_name}
                                      eventDescription={this.state.event_description} time={this.state.event_timing}
                                      fromDate={this.state.event_from_date} toDate={this.state.event_to_date}
                                      location={this.state.event_location}
                                      eligibility={this.state.event_eligibility_criteria}
                                      major={this.state.event_major}/>
                    </DialogContent>
                    <DialogActions>
                        {this.props.registerAllowed ?
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<FavoriteIcon/>}
                                onClick={this.register}
                            > Register</Button> : null}
                        <Button onClick={this.handleClose} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(CustomizedDialogDemo);