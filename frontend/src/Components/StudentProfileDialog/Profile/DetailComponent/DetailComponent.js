import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux'
import './DetailComponent.css'
import Education from './Education'
import Experience from './Experience';


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


        axios.get('http://localhost:3000/student/studentProfile/' + this.props.studentId)
            .then(response => {
                this.setState(response.data)
            }).catch(() => {
            window.alert("FAIL")
        })
    };

    componentWillUnmount() {
        this._isMounted = false;
    }

    onAddSchoolClick = () => {
        this.setState({showAddForm: !this.state.showAddForm});
    };

    onAddSchool = (school) => {
        school.id = this.state.education.length;
        const list = [...this.state.education, school];
        console.log(list);
        this.setState({education: list});
        this.setState({showAddForm: !this.state.showAddForm}, () => {
            this.save()
        });
    };

    onUpdateEducation = (education) => {
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
        window.alert(experience.id);
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
