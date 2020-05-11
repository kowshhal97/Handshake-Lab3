import React, {PureComponent} from 'react';
import MUIDataTable from "mui-datatables";

import ProfileDialog from './../../StudentProfileDialog/profileDialog'

import {graphql} from 'react-apollo'
import { gql } from 'apollo-boost';


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
        name: "state",
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


class StudentsTab extends PureComponent {
    _isMounted = false;
    state = {
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
            
            Dialog = (<ProfileDialog display={true} studentId={this.props.data.students[cellMeta.dataIndex]._id} studentname={this.props.data.students[cellMeta.dataIndex].name}
                                     close={this.dialogCloseHandler}/>);
            this.setState({showDialog: true})
        },
        selectableRows: "none",
        download: false,
        print: false
    };

    componentDidMount = () => {
    };

    componentWillUnmount() {
        this._isMounted = false;
    }


    render() {
        if (!this.state.showDialog) {
            Dialog = null
        }
        let data = [];
        data = this.props.data.students;
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


const query=gql`
{
    students {
      _id
      name
      major
      collegeName
      city
      state
      country
    }
  }
  `;


export default graphql(query) (StudentsTab);