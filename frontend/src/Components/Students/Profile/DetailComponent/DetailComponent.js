import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux'
import './DetailComponent.css'
import Education from './Education'
import AddForm from './AddForm';
import Experience from './Experience';
import AddExperienceForm from './AddExperienceForm'


class DetailComponent extends Component {
    _isMounted = false;
    state = {
        education: [],
        experience: [],
        showAddForm: false,
        showTextFrom: false,
        showAddExperienceForm: false,

    };

    componentDidMount = () => {
        this._isMounted = true;

        console.log(this.props.user);

        this.setState(this.props.user)
    };

    componentWillUnmount() {
        this._isMounted = false;
    }

    onAddSchoolClick = () => {
        this.setState({showAddForm: !this.state.showAddForm});
    };

    onAddSchool = (school) => {
        school.id = this.state.education.length;
        console.log(school);
        const list = [...this.state.education, school];
        console.log(list);
        this.setState({education: list}, () => {
            this.save()
        });
    };

    onUpdateEducation = (education) => {
        console.log(education);
        const data = this.state.education.map((item) => {
            if (item.id === education.id) {
                return education
            }
            return item;
        });
        this.setState({education: data}, () => {
            this.save()
        });
    };
    onUpdateExperience = (experience) => {
        console.log(experience);
        const data = this.state.experience.map((item) => {
            if (item.id === experience.id) {
                return experience
            }
            return item;
        });
        this.setState({experience: data}, () => {
            this.save()
        });

    };
    save = () => {
        let obj = this.state;
        delete obj.showAddForm;
        delete obj.showTextFrom;
        delete obj.showAddExperienceForm;
        axios.put('http://localhost:3000/student/studentProfile/' + obj._id, obj)
            .then(response => {
                this.props.onSave(response.data)
            }).catch(() => {
            window.alert("FAIL")
        })
    };
    onAddExperience = (experience) => {
        experience.id = this.state.experience.length;
        const list = [...this.state.experience, experience];
        console.log(list);
        this.setState({experience: list}, () => {
            this.save()
        });

        this.setState({showAddExperienceForm: !this.state.showAddExperienceForm});

    };
    onAddExperienceClick = () => {
        this.setState({showAddExperienceForm: !this.state.showAddExperienceForm});
    };

    render() {

        return (<div className="DetailCompMain">


                <div style={{marginBottom: '20px'}}>
                    <div className='ui raised segment'>
                        <h4>Education</h4>
                        <div className='ui items'>
                            {this.state.education.map(education => {
                                return <Education key={education} onUpdateEducation={this.onUpdateEducation}
                                                  education={education}/>;
                            })}
                        </div>
                        <div>
                            {!this.state.showAddForm &&
                            <button class="fluid ui button" onClick={this.onAddSchoolClick}>Add School</button>}
                            {this.state.showAddForm &&
                            <AddForm onAddSchool={this.onAddSchool} toggle={this.onAddSchoolClick}
                                     studentId={this.props.studentId}/>}
                        </div>
                    </div>
                </div>
                <div style={{marginBottom: '20px'}}>
                    <div className='ui segment'>
                        <b>Work Experience</b>
                        <div className='ui items'>
                            {this.state.experience.map(experience => {
                                return <Experience key={experience} onUpdateExperience={this.onUpdateExperience}
                                                   experience={experience} studentId={this.props.studentId}/>;
                            })}
                        </div>
                        <div>
                            {!this.state.showAddExperienceForm &&
                            <button class="fluid ui button" onClick={this.onAddExperienceClick}>Add Work
                                Experience</button>}
                            {this.state.showAddExperienceForm &&
                            <AddExperienceForm onAddExperience={this.onAddExperience} toggle={this.onAddExperienceClick}
                                               studentId={this.props.studentId}/>}
                        </div>
                    </div>
                </div>
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailComponent);
