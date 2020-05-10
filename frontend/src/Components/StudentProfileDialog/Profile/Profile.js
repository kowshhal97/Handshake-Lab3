import React from 'react'
import Grid from '@material-ui/core/Grid';
import SideBar from './SideComponent/SideComponent'
import MainComp from './DetailComponent/DetailComponent'


import './Profile.css'

const profile = (props) => {
    return (<div>
        <div>
            <Grid container>
                <Grid item xs={4}>
                    <SideBar studentId={props.studentId}></SideBar>
                </Grid>
                <Grid item xs={8}>
                    <MainComp studentId={props.studentId}></MainComp>
                </Grid>
            </Grid>
        </div>
    </div>)
};

export default profile;