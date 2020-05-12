import React, {Component} from 'react';
import MUIDataTable from "mui-datatables";
import {connect} from 'react-redux';
import ProfileDialog from './StudentProfileDialog/profileDialog'

let Dialog = null;
const column = [
    {
        name: "name",
        label: "Name",
        options: {
            filter: false,
            sort: true,
        }
    },
    {
        name: "major",
        label: "Major",
        options: {
            filter: false,
            sort: true,
        }
    },
    {
        name: "collegeName",
        label: "College Name",
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

    dialogCloseHandler = (e) => {

        e.preventDefault();
        this.setState({showDialog: false})
    };

    options = {
        selectableRowsOnClick: true,
        disableToolbarSelect: true,
        onCellClick: (colData, cellMeta) => {
            let studentId = this.state.data[cellMeta.dataIndex]._id;
            Dialog = (<ProfileDialog display={true} studentId={studentId} close={this.dialogCloseHandler}
                                     jobId={this.props.jobId}/>);
            this.setState({showDialog: true})
        },
        selectableRows: "none",
        download: false,
        print: false
    };

    componentDidMount = () => {
        this.setState({data: this.props.studentsApplied})


    };

    render() {

        console.log(this.state.data);
        if (!this.state.showDialog) {
            Dialog = null
        }
        return (
            <div>
                {Dialog}
                <MUIDataTable
                    title={"Posted Job"}
                    data={this.state.data}
                    columns={column}
                    options={this.options}
                />
            </div>)
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

export default connect(mapStateToProps, mapDispatchToProps)(PostedJobs);

