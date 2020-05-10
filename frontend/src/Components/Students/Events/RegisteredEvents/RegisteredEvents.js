import React, {Component} from 'react';
import MUIDataTable from "mui-datatables";
import EventsDialog from './../EventsDialog'
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

            let eventId = this.state.data[cellMeta.dataIndex].eventId;
            Dialog = (<EventsDialog display={true} eventId={eventId} close={this.dialogCloseHandler}/>);
            this.setState({showDialog: true})
        },
        selectableRows: "none",
        download: false,
        print: false
    };

    componentDidMount = () => {

        this.setState({data: this.props.user.registeredEvents})

    };

    render() {

        if (!this.state.showDialog) {
            Dialog = null
        }
        return (
            <div>
                {Dialog}
                <MUIDataTable
                    title={"Registered Events"}
                    data={this.state.data}
                    columns={column}
                    options={this.options}
                />
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

export default connect(mapStateToProps, mapDispatchToProps)(PostedEvents);

