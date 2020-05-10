import React from 'react'
import Grid from '@material-ui/core/Grid';
import SideBar from './SideComponent/SideComponent'
import MainComp from './DetailComponent/DetailComponent'


import './Profile.css'

const profile = () => {
    return (<div className="profileMain">
        <div className="profileLayout">
            <Grid container>
                <Grid item xs={4}>
                    <SideBar></SideBar>
                </Grid>
                <Grid item xs={8}>
                    <MainComp></MainComp>
                </Grid>
            </Grid>
        </div>
    </div>)
};

export default profile;