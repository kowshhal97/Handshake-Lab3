import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux'
import MUIDataTable from "mui-datatables";
import JobsDialog from '../JobsDialog/JobDetails/JobsDialog'


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
            Dialog = (<JobsDialog display={true} jobId={this.state.data[cellMeta.dataIndex]._id}
                                  close={this.dialogCloseHandler}/>);
            this.setState({showDialog: true})
        },
        selectableRows: "none",
        download: false,
        print: false
    };

    componentDidMount = () => {
        var headers = new Headers();
        axios.defaults.withCredentials = true;
        axios.get('http://localhost:3000/jobs')
            .then(response => {

                this.setState({data: [...response.data]});

            }).catch(() => {
            window.alert("FAIL")
        })
    };

    render() {

        if (!this.state.showDialog) {
            Dialog = null
        }
        return (
            <div>
                {Dialog}
                <MUIDataTable
                    title={"All Jobs"}
                    data={this.state.data}
                    columns={column}
                    options={this.options}
                />
            </div>
        )
    }
}


const mapDispatchToProps = dispatch => {
    return ({
        onLogout: () => dispatch({type: 'LOGOUT'}),
        onLogin: (value) => dispatch({type: 'LOGIN', value: value})
    });
};

const mapStateToProps = state => {
    return {


        isLoggedIn: state.isLoggedIn,
        userType: state.userType,
        studentId: state.studentId
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);
