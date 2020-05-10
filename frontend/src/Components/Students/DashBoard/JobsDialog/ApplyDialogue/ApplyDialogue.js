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
        Resume: {}
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


    apply = (e) => {
        var headers = new Headers();
        // e.preventDefault();
        let newDate = new Date();
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();

        let currentDate = `${year}-${month < 10 ? `0${month}` : `${month}`}-${date}`;
        const data = {
            student: this.props.user,
            application_date: currentDate
        };
        console.log(data);
        axios.defaults.withCredentials = true;
        axios.put('http://localhost:3000/applications/apply/' + this.props.jobId, data)
            .then(response => {
                this.props.onSave(response.data);
                this.setState({open: false});
                this.props.close(e);
                console.log("Status Code : ", response.status);
            }).catch(() => {
            window.alert("FAIL")
        });
        const fd = new FormData();
        fd.append('upl', this.state.Resume);
        axios
            .post(`http://localhost:3000/student/studentProfile/upload/resume/${(this.props.user._id)}`, fd)
            .then(res => {
                if (res.status === 200) {

                }
            })
            .catch(err => {
                window.alert("Fail")
            });


    };

    onResumeUpload = (e) => {
        this.setState({Resume: e.target.files[0]});
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
                    maxWidth={"xs"}
                >
                    <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
                        Upload Resume to Apply
                    </DialogTitle>
                    <DialogContent>
                        <input type="file" name="file" onChange={this.onResumeUpload}/>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<CheckBoxIcon/>}
                            onClick={this.apply}
                        > Apply</Button>
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