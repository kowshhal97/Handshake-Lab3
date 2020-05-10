import React, {Component} from 'react';
import MUIDataTable from "mui-datatables";
import axios from 'axios';
import ProfileDialog from './../../StudentProfileDialog/profileDialog'


let Dialog = null;
const columns = [
    {
        name: "name",
        label: "Name",
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
    {
        name: "major",
        label: "Major",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "country",
        label: "State",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "skillSet",
        label: "Skills",
        options: {
            filter: true,
            sort: true,
        }
    }
];


class StudentsTab extends Component {
    _isMounted = false;
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
            console.log(this.state.data[cellMeta.dataIndex])
            Dialog = (<ProfileDialog display={true} studentId={this.state.data[cellMeta.dataIndex]._id} studentname={this.state.data[cellMeta.dataIndex].name}
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
        axios.get('http://localhost:3000/student/studentProfile/')
            .then(response => {
                // let str=response.data.skillSet.join();
                this.setState({data: [...response.data]})
            }).catch(() => {
            window.alert("FAIL")
        })
    };

    componentWillUnmount() {
        this._isMounted = false;
    }


    render() {

        if (!this.state.showDialog) {
            Dialog = null
        }
        let data = [];
        data = this.state.data;
        return (
            <div>
                {Dialog}
                <div className="handShakeMain">
                    <div className="handShakeLayout">
                        <MUIDataTable
                            title={"Registered Students"}
                            data={data}
                            columns={columns}
                            options={this.options}
                        />
                    </div>
                </div>
            </div>)
    }
}

export default StudentsTab;