import React, { Component } from 'react';
import axios from 'axios';

import './SideComponent.css'
import Basic from './StudentBasicDetail'
import Skill from './Skills'
import Grid from '@material-ui/core/Grid';

import { graphql } from 'react-apollo'
import { gql } from 'apollo-boost';

class SideComponent extends Component {
    state = {};

    skillSet = {
        skillSet: ""
    };


    changed = (e) => {

    };

    changCity = (e) => {
        this.setState({ city: e.target.value })
    };
    changeSta = (e) => {

        this.setState({ state: e.target.value })
    };
    changeCon = (e) => {
        this.setState({ country: e.target.value })
    };
    changePh = (e) => {
        this.setState({ contactNumber: e.target.value })
    };
    changeDob = (e) => {
        this.setState({ dateOfBirth: e.target.value })
    };
    changeObj = (e) => {
        this.setState({ careerObjective: e.target.value })
    };

    save = () => {
        // axios.put('http://localhost:3000/student/studentProfile/' + this.state._id, this.state)
        //     .then(response => {
        //         this.props.onSave(response.data)
        //     }).catch(() => {
        //     window.alert("FAIL")
        // })
    };

    componentDidMount = () => {

    };

    render() {


        return (<div className="sideProfile">
            {this.props.data.student === undefined ? null :
                (<div>
                    <div style={{ marginBottom: 20 }}><Basic user={this.props.data.student}
                        changeCity={this.changCity} changeSta={this.changeSta}
                        changeCon={this.changeCon} changePh={this.changePh}
                        changeDob={this.changeDob} changeObj={this.changeObj}
                        save={this.save}
                    /></div>
                    <Grid container direction="row" justify="center">
                        <Skill studentId={this.props.studentId} skillSet={this.props.data.student.skillSet} />
                    </Grid>
                </div>)
            }
        </div>)
    }
}

const query = gql`
query GetStudentById($studentId:String!)
{
    student(id: $studentId) {
      _id
      name
      email
      password
      major
      collegeName
      contactNumber
      dateOfBirth
      city
      state
      country
      skillSet
      careerObjective
    }
}
`;


export default graphql(query)(SideComponent);