import React from 'react';
import {Dropdown} from 'semantic-ui-react';

const companyName = [{text: 'Google', value: 'Google'}, {text: 'Tesla', value: 'Tesla'}, {
    text: 'Facebook',
    value: 'Facebook'
}];
const designation = [{text: 'Application Developer', value: 'Application Developer'}, {
    text: 'Performance Engineer',
    value: 'Performance Engineer'
}, {text: 'Software Engineer', value: 'Software Engineer'}];
const fromDate = [{text: '2015', value: '2015'}, {text: '2016', value: '2016'}, {text: '2017', value: '2017'}];
const toDate = [{text: '2018', value: '2018'}, {text: '2019', value: '2019'}, {text: '2020', value: '2020'}];
const location = [{text: 'Mumbai', value: 'Mumbai'}, {text: 'San Jose', value: 'San Jose'}, {
    text: 'San Andreas',
    value: 'San Andreas'
}];

class EditExperienceForm extends React.Component {
    constructor() {
        super();
        this.state = {
            company_name: '',
            designation: '',
            starting_date: '',
            ending_date: '',
            company_location: '',
            work_summary: ''
        };
    }

    onCancel = () => {
        this.props.toggle();
    };

    onSave = (e) => {
        e.preventDefault();
        const data = {
            company_name: this.state.company_name === '' ? this.props.data.company_name : this.state.company_name,
            designation: this.state.designation === '' ? this.props.data.designation : this.state.designation,
            starting_date: this.state.starting_date === '' ? this.props.data.starting_date : this.state.starting_date,
            ending_date: this.state.ending_date === '' ? this.props.data.ending_date : this.state.ending_date,
            company_location: this.state.company_location === '' ? this.props.data.company_location : this.state.company_location,
            work_summary: this.state.work_summary === '' ? this.props.data.work_summary : this.state.work_summary
        };
        this.props.onUpdateExperience(data);


        // const id = this.props.data.experience_id;
        // axios
        //   .put(`http://localhost:3000/student/studentProfile/experienceDetails/${id}`, data, {headers: {'Content-Type': 'application/json'}})
        //   .then(res => {
        //       console.log(res)
        //     if (res.status === 200) {
        //       window.alert("success")
        //       this.props.onUpdateExperience({...data, experience_id: id})
        //       console.log(res.data);

        //     } else {
        //         console.log(res);
        //     }
        //   })
        //   .catch(err => {
        //     window.alert("Fail")
        //     console.log(err);
        //   });

        this.props.toggle();
    };

    onChangeHandlerCompanyName = (e, {value}) => {
        this.setState({company_name: value}, () => {
            console.log("Dropdown", this.state.company_name);
        })
    };

    onChangeHandlerDesignation = (e, {value}) => {
        this.setState({designation: value}, () => {
            console.log("Dropdown", this.state.designation);
        })
    };

    onChangeHandlerFromDate = (e, {value}) => {
        this.setState({starting_date: value}, () => {
            console.log("Dropdown", this.state.starting_date);
        })
    };

    onChangeHandlerToDate = (e, {value}) => {
        this.setState({ending_date: value}, () => {
            console.log("Dropdown", this.state.ending_date);
        })
    };

    onChangeHandlerCompanyLocation = (e, {value}) => {
        this.setState({company_location: value}, () => {
            console.log("Dropdown", this.state.company_location);
        })
    };

    onChangeHandlerWorkSummary = (e) => {
        this.setState({work_summary: e.target.value}, () => {
            console.log("input", this.state.work_summary);
        })
    };


    render() {
        return (
            <div>
                <div>
                    <form className='ui equal width form'>
                        <div class='field'>
                            <label>Company Name</label>
                            <Dropdown
                                placeholder='Company Name'
                                fluid
                                search
                                selection
                                options={companyName}
                                value={this.state.company_name}
                                onChange={this.onChangeHandlerCompanyName}/>
                        </div>
                        <div class='field'>
                            <label>Designation</label>
                            <Dropdown
                                placeholder='Designation'
                                fluid
                                search
                                selection
                                options={designation}
                                value={this.state.designation}
                                onChange={this.onChangeHandlerDesignation}/>
                        </div>
                        <div class='field'>
                            <label>From</label>
                            <Dropdown
                                placeholder='Starting Date'
                                fluid
                                search
                                selection
                                options={fromDate}
                                value={this.state.starting_date}
                                onChange={this.onChangeHandlerFromDate}/>
                        </div>
                        <div class='fields'>
                            <div class='field'>
                                <label>To</label>
                                <Dropdown
                                    placeholder='Passing Year'
                                    fluid
                                    search
                                    selection
                                    options={toDate}
                                    value={this.state.ending_date}
                                    onChange={this.onChangeHandlerToDate}/>
                            </div>
                        </div>
                        <div class='field'>
                            <label>Company Location</label>
                            <Dropdown
                                placeholder='Location'
                                fluid
                                search
                                selection
                                options={location}
                                value={this.state.location}
                                onChange={this.onChangeHandlerCompanyLocation}/>
                        </div>
                        <div class='field'>
                            <label>Work Summary</label>
                            <input type="text" value={this.state.cgpa} placeholder="Work Summary"
                                   onChange={this.onChangeHandlerWorkSummary}/>
                        </div>
                        <div>
                            <button class='ui primary button' onClick={this.onSave}>Save</button>
                            <button class='ui button' onClick={this.onCancel}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default EditExperienceForm;
