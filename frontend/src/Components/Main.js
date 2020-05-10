import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import GlobalNavbar from './NavBar/NavBar';
import StudentNavBar from './Students/NavBar/NavBar';

import studentDashBoard from './Students/DashBoard/DashBoard';

import studentProfile from './Students/Profile/Profile';
import Signup from './Signup/Signup';

import companyDashBoard from './Company/DashBoard/DashBoard';

import companyProfile from './Company/Profile/Profile';
import companyStudentsTab from './Company/StudentsTab/StudentsTab';

import CompanyProfile from './CompanyProfile'




import Home from './Home';
import Login from './Login/Login'


class Main extends Component {


    render() {
        let NavBarVar, dashBoardVar, studentsTabVar, eventsVar, profileVar = null;

        if (!this.props.isLoggedIn) {
            NavBarVar = GlobalNavbar;
            dashBoardVar = Home;
            studentsTabVar = Home;
            profileVar = Home;

        } else {

            NavBarVar = StudentNavBar;
            studentsTabVar = companyStudentsTab;
            if (this.props.userType === 'student') {
                dashBoardVar = studentDashBoard;
                profileVar = studentProfile;
            } else {
                dashBoardVar = companyDashBoard;
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
                <Route exact path="/profile" exact component={profileVar}/>
                <Route exact path="/company/profile" exact component={CompanyProfile}/>

            </div>
        )
    }
}

export default (Main);