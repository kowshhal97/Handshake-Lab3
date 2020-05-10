import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';

import LocationCityIcon from '@material-ui/icons/LocationCity';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import axios from 'axios';
import {connect} from 'react-redux';
import JobDetails from './JobDetails'


let Diaalog = null;
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
        redirect: false,
        open: false,
    };
    redirectVar = null;

    handleClickOpen = () => {
        this.setState({
            data: {},
            status: {},

            open: true,
        });
    };

    handleClose = (e) => {
        this.setState({open: false});
        this.props.close(e);
    };

    componentDidMount = () => {
        var headers = new Headers();
        axios.defaults.withCredentials = true;
        axios.get('http://localhost:3000/jobs/' + this.props.jobId)
            .then(response => {
                this.setState({data: response.data});
                console.log(this.state.data)
            }).catch(() => {
            window.alert("failing")
        })
    };

    viewResume = (e) => {
        e.preventDefault()

    };

    dialogCloseHandler = (e) => {

        e.preventDefault();
        this.setState({showDialog: false})
    };

    render() {


        if (this.props.display === true && this.state.open === false) {
            this.setState({
                open: true,
            });

        }

        return (
            <div>

                {this.redirectVar}
                {this.state.data === null ? null :
                    <Dialog
                        onClose={this.handleClose}
                        aria-labelledby="customized-dialog-title"
                        open={this.state.open}
                        fullWidth={true}
                        maxWidth={"sm"}
                    >
                        <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
                            Job Details
                        </DialogTitle>
                        <DialogContent>
                            <JobDetails jobTitle={this.state.data.job_title}
                                        jobDescription={this.state.data.job_description}
                                        jobRequirements={this.state.data.job_requirements}
                                        postingDate={this.state.data.job_posting_date}
                                        deadline={this.state.data.job_application_deadline}
                                        location={this.state.data.job_location}
                                        salary={this.state.data.job_salary}
                                        category={this.state.data.job_category}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<LocationCityIcon/>}
                                onClick={this.viewResume}
                            > View Resume</Button>
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<FavoriteIcon/>}
                            > Status</Button>
                            <Button onClick={this.handleClose} color="primary">
                                Close
                            </Button>
                        </DialogActions>
                    </Dialog>}
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return ({});
};

const mapStateToProps = state => {
    return {
        user: state.user
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomizedDialogDemo);