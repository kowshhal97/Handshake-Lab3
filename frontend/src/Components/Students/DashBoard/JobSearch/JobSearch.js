import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux'
import MUIDataTable from "mui-datatables";
import JobsDialog from '../JobsDialog/JobDetails/JobsDialog'

import {graphql} from 'react-apollo'
import { gql } from 'apollo-boost';


let Dialog = null;
const column = [
    {
        name: "job_title",
        label: "Title",
        options: {
            filter: false,
            sort: true,
        }
    },
    {
        name: "companyName",
        label: "Company Name",
        options: {
            filter: false,
            sort: true,
        }
    },
    {
        name: "job_location",
        label: "Location",
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
    {
        name: "job_category",
        label: "Category",
        options: {
            filter: true,
            sort: true,
        }
    },
];


class DashBoard extends Component {
    state = {
        data: [],
        showDialog: false
    };

    dialogCloseHandler = (e) => {

        e.preventDefault();
        this.setState({showDialog: false})
    };

    options = {
        selectableRowsOnClick: true,
        disableToolbarSelect: true,
        onCellClick: (colData, cellMeta) => {
            Dialog = (<JobsDialog display={true} jobId={this.props.data.jobs[cellMeta.dataIndex]._id}
                                  close={this.dialogCloseHandler}/>);
            this.setState({showDialog: true})
        },
        selectableRows: "none",
        download: false,
        print: false
    };

    componentDidMount = () => {
    };

    render() {

        if (!this.state.showDialog) {
            Dialog = null
        }
        console.log(this.props)
        return (
            <div>
                {Dialog}
                {this.props.data.jobs?<MUIDataTable
                    title={"All Jobs"}
                    data={this.props.data.jobs}
                    columns={column}
                    options={this.options}
                />:null}
                
            </div>
        )
    }
}



const query=gql`
{
    jobs{
        _id
      job_title
      job_location
      job_salary
      job_category
      companyName
    }
  }
  `;

export default graphql(query) (DashBoard);
