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

import axios from 'axios';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import {connect} from 'react-redux';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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
        selectedStatus: ""
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


    updateStatus = (e) => {
        var headers = new Headers();
        e.preventDefault();
        axios.defaults.withCredentials = true;
        let data = {
            studentId: this.props.studentId,
            status: this.state.selectedStatus
        };


        axios.put('http://localhost:3000/applications/' + this.props.jobId, data)
            .then(response => {
                this.setState({open: false});
                this.props.close(e);
                console.log("Status Code : ", response.status);
            }).catch(() => {
            window.alert("FAIL")
        })
    };

    onSelectStatus = (e) => {
        this.setState({selectedStatus: e.target.value});
    };
    componentDidMount = () => {

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
                    maxWidth={"md"}
                >
                    <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
                        Set the status of the Application
                    </DialogTitle>
                    <DialogContent>
                        <div className="setStyleforIframe">

                            <iframe
                                src={"https://handshake-project.s3-us-west-2.amazonaws.com/resume_" + this.props.studentId}></iframe>
                            <FormControl>
                                <InputLabel id="demo-controlled-open-select-label" className="selectWidth"></InputLabel>
                                <Select
                                    labelId="demo-controlled-open-select-label"
                                    id="demo-controlled-open-select"
                                    className="selectWidth"
                                    onChange={this.onSelectStatus}>

                                    <MenuItem value={"Accept"}><p style={{color: "green"}}>Accept </p></MenuItem>
                                    <MenuItem value={"Reject"}><p style={{color: "red"}}>Reject</p></MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<CheckBoxIcon/>}
                            onClick={this.updateStatus}
                        > Update Status</Button>
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
    return ({});
};

const mapStateToProps = state => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomizedDialogDemo);