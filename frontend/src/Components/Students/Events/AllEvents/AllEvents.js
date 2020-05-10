import React, {Component} from 'react';
import MUIDataTable from "mui-datatables";
import EventsDialog from '../EventsDialog'
import axios from 'axios';
import {connect} from 'react-redux';


let Dialog = null;
const column = [
    {
        name: "event_name",
        label: "event Name",
        options: {
            filter: false,
            sort: true,
        }
    },
    {
        name: "event_timing",
        label: "Time",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "event_from_date",
        label: "Start Date",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "event_to_date",
        label: "End Date",
        options: {
            filter: true,
            sort: true,
        }
    },
];


class PostedEvents extends Component {
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
            Dialog = (
                <EventsDialog registerAllowed={true} display={true} eventId={this.state.data[cellMeta.dataIndex]._id}
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
        axios.get('http://localhost:3000/events')
            .then(response => {
                this.setState({data: [...response.data]});
                console.log(this.state.data)
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
                    title={"Posted Events"}
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

export default connect(mapStateToProps, mapDispatchToProps)(PostedEvents);

