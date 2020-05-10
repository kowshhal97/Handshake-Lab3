import React, {Component} from 'react';
import {connect} from 'react-redux'
import MUIDataTable from "mui-datatables";
import JobsDialog from './JobDetails/JobsDialog';


let Dialog = null;
const column = [
    {
        name: "job_title",
        label: "Job Title",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "companyName",
        label: "Company Name",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "application_date",
        label: "Applied Date",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "status",
        label: "Status",
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
            Dialog = (<JobsDialog display={true} jobId={this.state.data[cellMeta.dataIndex].applicationId}
                                  close={this.dialogCloseHandler}/>);
            this.setState({showDialog: true})
        },
        selectableRows: "none",
        download: false,
        print: false
    };

    componentDidMount = () => {
        this.setState({data: this.props.user.applications})
    };

    render() {

        if (!this.state.showDialog) {
            Dialog = null
        }
        return (
            <div>
                {Dialog}
                <MUIDataTable
                    title={"Applications"}
                    data={this.state.data}
                    columns={column}
                    options={this.options}
                />
            </div>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);
