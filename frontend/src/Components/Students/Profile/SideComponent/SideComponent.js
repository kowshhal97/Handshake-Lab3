import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux'
import './SideComponent.css'
import Basic from './StudentBasicDetail'
import Skill from './Skills'
import Grid from '@material-ui/core/Grid';


import * as compose from 'lodash.flowright';
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
        this.setState({city: e.target.value})
    };
    changeSta = (e) => {

        this.setState({state: e.target.value})
    };
    changeCon = (e) => {
        this.setState({country: e.target.value})
    };
    changePh = (e) => {
        this.setState({contactNumber: e.target.value})
    };
    changeDob = (e) => {
        this.setState({dateOfBirth: e.target.value})
    };
    changeObj = (e) => {
        this.setState({careerObjective: e.target.value})
    };

    save = async () => {
        console.log(this.state)


       let studentDetails={
           name:this.state.name,
           city:this.state.city,
           careerObjective:this.state.careerObjective,
           contactNumber:this.state.contactNumber,
           dateOfBirth:this.state.dateOfBirth,
           state:this.state.state,
           country:this.state.country,
           major:this.state.major
       }
        let response = await this.props.updateStudent({
            variables: {
                studentDetails: this.state,
                id:this.state._id
            }
        })
        this.props.onSave(response.data.updateStudent)
    };

    componentDidMount = () => {
        this.setState(this.props.user)
    };

    render() {


        return (<div className="sideProfile">
            {this.state._id === undefined ? null :
                (<div>
                    <div style={{marginBottom: 20}}><Basic user={this.state}
                                                           changeCity={this.changCity} changeSta={this.changeSta}
                                                           changeCon={this.changeCon} changePh={this.changePh}
                                                           changeDob={this.changeDob} changeObj={this.changeObj}
                                                           save={this.save}
                    /></div>
                    <Grid container direction="row" justify="center">
                        <Skill studentId={this.props.studentId} skillSet={this.state.skillSet.skillSet}/>
                    </Grid>
                </div>)
            }
        </div>)
    }
}

const mapDispatchToProps = dispatch => {
    return ({
        onSave: (user) => dispatch({type: "saveToProfile", user: user})
    });
};

const mapStateToProps = state => {
    return {
        user: state.user
    };
};


const updateStudent = gql`
mutation updateStudent($studentDetails:studentInput!,$id:String!){
    updateStudent(student:$studentDetails,id:$id)
    {
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
        careerObjective
        skillSet
        education {
          id
          institution_name
          location
          degree
          major
          passing_year
          cgpa
        }
        experience {
          id
          company_name
          designation
          company_location
          work_summary
          starting_date
          ending_date
        }
        applications{
          _id
          applicationId
          status
          companyName
          job_title
          job_location
          job_salary
          job_description
          job_category
          job_posting_date
          job_application_deadline
          job_requirements
          application_date
        }
    }
  }
`;



export default compose( graphql(updateStudent, { name: "updateStudent" }),
connect(mapStateToProps, mapDispatchToProps))(SideComponent);