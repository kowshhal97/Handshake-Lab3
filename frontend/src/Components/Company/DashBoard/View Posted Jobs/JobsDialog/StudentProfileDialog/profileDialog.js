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
import Profile from './../../../../../StudentProfileDialog/Profile/Profile'
import UpdateStatus from './UpdateStatus'

import './profileDialog.css'

let Dialoog = null;
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
        open: false,
        showDialog: false,
    };

    dialogCloseHandler = (e) => {

        e.preventDefault();
        Dialoog = (<div>hello</div>);
        this.setState({showDialog: false})
    };

    updateStatus = (e) => {
        e.preventDefault();
        Dialoog = (<UpdateStatus studentId={this.props.studentId} display={true} close={this.dialogCloseHandler}
                                 jobId={this.props.jobId}/>);
        this.setState({showDialog: true})
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


    render() {


        if (this.props.display === true && this.state.open === false) {
            this.setState({
                open: true,
            });

        }
        return (
            <div>

                {Dialoog}
                <Dialog
                    onClose={this.handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={this.state.open}
                    fullWidth={true}
                    maxWidth={"md"}
                >
                    <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
                        Profile
                    </DialogTitle>
                    <DialogContent>
                        <Profile studentId={this.props.studentId}/>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.updateStatus} studentId={this.props.studentId} jobId={this.props.jobId}>update
                            Status</Button>
                        <Button onClick={this.handleClose} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default CustomizedDialogDemo;