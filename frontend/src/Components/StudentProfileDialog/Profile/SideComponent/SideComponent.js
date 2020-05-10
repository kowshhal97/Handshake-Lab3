import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux'
import './SideComponent.css'
import Basic from './StudentBasicDetail'
import Skill from './Skills'
import Grid from '@material-ui/core/Grid';

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

    save = () => {
        axios.put('http://localhost:3000/student/studentProfile/' + this.state._id, this.state)
            .then(response => {
                this.props.onSave(response.data)
            }).catch(() => {
            window.alert("FAIL")
        })
    };

    componentDidMount = () => {
        axios.get('http://localhost:3000/student/studentProfile/' + this.props.studentId)
            .then(response => {
                this.setState(response.data)
            }).catch(() => {
            window.alert("FAIL")
        })
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
    return ({});
};

const mapStateToProps = state => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(SideComponent);