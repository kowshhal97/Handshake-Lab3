import React, { Component } from 'react';
import MUIDataTable from "mui-datatables";
import JobsDialog from './JobsDialog/JobsDialog'
import axios from 'axios';
import { connect } from 'react-redux';

import { graphql } from 'react-apollo'
import { gql } from 'apollo-boost';
import * as compose from 'lodash.flowright';


let Dialog = null;
const column = [
    {
        name: "job_title",
        label: "Job Title",
        options: {
            filter: false,
            sort: true,
        }
    },
    {
        name: "job_location",
        label: "Location",
        options: {
            filter: false,
            sort: true,
        }
    },
    {
        name: "job_category",
        label: "Category",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "job_posting_date",
        label: "Posting Date",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "job_application_deadline",
        label: "Deadline",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "job_salary",
        label: "Salary",
        options: {
            filter: true,
            sort: true,
        }
    },
];


class PostedJobs extends Component {
    state = {
        data: [],
        showDialog: false
    };


    componentDidMount = () => {
        // this.props.getJobsByCompanyName.refetch(
        //     {
        //         variables: {
        //             name: "Ralph Lauren"
        //         }
        //     })
    };


    dialogCloseHandler = (e) => {

        e.preventDefault();
        this.setState({ showDialog: false })
    };


    options = {
        selectableRowsOnClick: true,
        disableToolbarSelect: true,
        onCellClick: (colData, cellMeta) => {
            Dialog = (<JobsDialog display={true}
                studentsApplied={this.props.data.getJobsByCompanyName[cellMeta.dataIndex].students}
                close={this.dialogCloseHandler} />);
            this.setState({ showDialog: true })
        },
        selectableRows: "none",
        download: false,
        print: false
    };


    render() {

        console.log()
        if (!this.state.showDialog) {
            Dialog = null
        }
        return (
            <div>
                {Dialog}
                {this.props.data.getJobsByCompanyName?
                <MUIDataTable
                    title={"Posted Job"}
                    data={this.props.data.getJobsByCompanyName}
                    columns={column}
                    options={this.options}
                />:null}
            </div>)
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

const getJobsByCompanyName = gql`
query getJobsByCompanyName($name:String!){
    getJobsByCompanyName(name:$name)
    {
        _id
        job_title
        companyName
        job_location
        job_category
        job_posting_date
        job_application_deadline
        job_salary
      students{
          _id
        name
        major
        collegeName
      }
    }
  }
`;


export default compose(graphql(getJobsByCompanyName, {
    options: (props) => ({
         variables: { name: sessionStorage.getItem('name')}
    })
}),connect(mapStateToProps, mapDispatchToProps))(PostedJobs);

