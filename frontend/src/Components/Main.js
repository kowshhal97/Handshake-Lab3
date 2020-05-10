import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import GlobalNavbar from './NavBar/NavBar';
import StudentNavBar from './Students/NavBar/NavBar';

import studentDashBoard from './Students/DashBoard/DashBoard';
import studentEvents from './Students/Events/Events';
import studentProfile from './Students/Profile/Profile';
import Signup from './Signup/Signup';

import companyDashBoard from './Company/DashBoard/DashBoard';
import companyEvents from "./Company/Events/Events";
import companyProfile from './Company/Profile/Profile';
import companyStudentsTab from './Company/StudentsTab/StudentsTab';

import Messages from './Messages/Messages'

import CompanyProfile from './CompanyProfile'


import {connect} from 'react-redux'


import Home from './Home';
import Login from './Login/Login'


class Main extends Component {


    render() {
        let NavBarVar, dashBoardVar, studentsTabVar, messagesTab, eventsVar, profileVar = null;

        if (!this.props.isLoggedIn) {
            NavBarVar = GlobalNavbar;
            dashBoardVar = Home;
            studentsTabVar = Home;
            eventsVar = Home;
            profileVar = Home;
            messagesTab = Home;
        } else {
            messagesTab = Messages;
            NavBarVar = StudentNavBar;
            studentsTabVar = companyStudentsTab;
            if (this.props.userType === 'student') {
                dashBoardVar = studentDashBoard;
                eventsVar = studentEvents;
                profileVar = studentProfile;
            } else {
                dashBoardVar = companyDashBoard;
                eventsVar = companyEvents;
                profileVar = companyProfile;
            }
        }

        return (
            <div>


                <Route path="/" render={(props) => <NavBarVar {...props} onLogout={this.props.onLogout}
                                                              userType={this.props.userType}/>}/>

                <Route exact path="/" component={Home}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/signup" component={Signup}/>
                <Route exact path="/dashboard" component={dashBoardVar}/>
                <Route exact path="/studentsTab" component={studentsTabVar}/>
                <Route exact path="/events" component={eventsVar}/>
                <Route exact path="/messages" component={messagesTab}/>
                <Route exact path="/profile" exact component={profileVar}/>
                <Route exact path="/company/profile" exact component={CompanyProfile}/>

            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return ({
        onLogout: () => dispatch({type: 'LOGOUT'}),
        onLogin: (value) => dispatch({type: 'LOGIN', value: value})
    });
};

const mapStateToProps = state => {
    return {

        isLoggedIn: state.isLoggedIn,
        userType: state.userType
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Main);