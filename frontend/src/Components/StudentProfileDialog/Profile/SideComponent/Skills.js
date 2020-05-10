import React from 'react';
import {Icon, Label} from 'semantic-ui-react';


class Skills extends React.Component {
    constructor() {
        super();
        this.state = {skills: [], current_skill: ''}
    }

    componentDidMount() {
        if (this.props.skillSet != null) {
            this.setState({skills: this.props.skillSet})
        }
    }

    onAdd = (e) => {
        e.preventDefault();
        const list = [...this.state.skills, this.state.current_skill];
        const data = {...this.props.skillSet};
        data.skillSet = list;
        // axios
        // .post('http://localhost:3000/student/studentProfile/skills/'+this.props.studentId, data, {headers: {'Content-Type': 'application/json'}})
        // .then(res => {
        //     if (res.status === 200) {
        //         console.log(res.data);

        //     } else {
        //         window.alert("huyu")
        //         console.log(res);
        //     }
        // })
        // .catch(err => {
        //     console.log(err);
        // });
        this.setState({skills: list});
        this.setState({current_skill: ''});
    };

    onChangeHandler = (e) => {
        this.setState({current_skill: e.target.value});

    };
    onDeleteSkill = (e) => {
        const list = this.state.skills.filter(item => {
            if (e.target.id != item) {
                return item;
            }
        });
        const data = {...this.props.skillSet};
        data.skillSet = list;
        // axios
        // .post('http://localhost:3000/student/studentProfile/skills/'+this.props.studentId, data, {headers: {'Content-Type': 'application/json'}})
        // .then(res => {
        //     if (res.status === 200) {

        //         console.log(res.data);

        //     } else {

        //         console.log(res);
        //     }
        // })
        // .catch(err => {
        //     console.log(err);
        // });
        this.setState({skills: list})
    };

    renderSkills = (skill) => {
        return (
            <Label as='a' style={{marginBottom: '5px'}}>
                {skill}
                <Icon name='delete' id={skill} onClick={this.onDeleteSkill}/>
            </Label>
        )
    };

    render() {
        return (
            <div>
                <div className='ui raised card' style={{padding: '10px'}}>
                    <div style={{marginBottom: '30px'}}>
                        <h3>Skills</h3>
                    </div>
                    <div style={{marginBottom: '20px'}}>
                        {this.state.skills.map((skill) => {
                            return this.renderSkills(skill)
                        })}
                    </div>
                    {/* <div>
                        <form className='ui form'>
                            <input type='text' placeholder='Add more skills' value={this.state.current_skill} onChange={this.onChangeHandler} />
                            <div style={{marginTop: '10px'}}>
                                <button class='ui positive button' onClick={this.onAdd}>Add</button>
                            </div>
                        </form>
                    </div> */}
                </div>
            </div>
        )
    }
}

export default Skills;