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

import JobDetails from './JobDetails'
import {Redirect} from 'react-router';

import { graphql } from 'react-apollo'
import { gql } from 'apollo-boost';

import ApplyDialogue from './../ApplyDialogue/ApplyDialogue'

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
        showDialog: false
    };
    redirectVar = null;

    handleClickOpen = () => {
        this.setState({
            data: {},
            open: true,
        });
    };

    handleClose = (e) => {
        this.setState({open: false});
        this.props.close(e);
    };

    componentDidMount = () => {
       
    };

    viewCompany = (e) => {
        e.preventDefault();
        this.redirectVar = (<Redirect to={{
            pathname: '/company/profile',
            companyName: this.props.data.job.companyName
        }}

        />);
        this.setState({redirect: !(this.state.redirect)})
    };
    dialogCloseHandler = (e) => {

        e.preventDefault();
        this.setState({showDialog: false})
    };
    apply = () => {
        Diaalog = (<ApplyDialogue display={true} close={this.dialogCloseHandler} jobId={this.props.jobId}/>);
        this.setState({showDialog: true})
    };

    render() {


        if (this.props.display === true && this.state.open === false) {
            this.setState({
                open: true,
            });

        }
        if (!this.state.showDialog) {
            Diaalog = null
        }
        console.log(this.props)
        return (
 
            <div>
                {Diaalog}
                {this.redirectVar}
                {this.props.data.job ?
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
                            <JobDetails jobTitle={this.props.data.job.job_title}
                                        jobDescription={this.props.data.job.job_description}
                                        jobRequirements={this.props.data.job.job_requirements}
                                        postingDate={this.props.data.job.job_posting_date}
                                        deadline={this.props.data.job.job_application_deadline}
                                        location={this.props.data.job.job_location}
                                        salary={this.props.data.job.job_salary}
                                        category={this.props.data.job.job_category}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<LocationCityIcon/>}
                                onClick={this.viewCompany}
                            > View Company</Button>
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<FavoriteIcon/>}
                                onClick={this.apply}
                            > Apply</Button>
                            <Button onClick={this.handleClose} color="primary">
                                Close
                            </Button>
                        </DialogActions>
                    </Dialog>:null}
            </div>
        );
    }
}

const query = gql`
query getJobById($jobId:String!)
{
    job(id: $jobId) {
      _id
      job_title
      job_description
      job_requirements
      job_posting_date
      job_application_deadline
      job_location
      job_salary
      job_category
    }
}
`;

export default graphql(query)(CustomizedDialogDemo);