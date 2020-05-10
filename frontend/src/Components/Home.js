import React from 'react';
import homeScreenLogo from './images/handshake-share.png'

const home = () => {
    return (<div>
        <div style={{float: 'left', width: '35%', marginLeft: '5%', marginTop: '5%'}}>
            <img className="ui middle aligned rounded image" src={homeScreenLogo}/>
        </div>

        <div style={{float: 'left', width: '50%', marginLeft: '5%', marginTop: '10%'}}>
            <div>
                <h1>Join the Handshake Community!</h1>
                <h2>Discover jobs and internships based on your interests.</h2>
                <h3>Check the Navigation Bar Above for Login and Sign-Up Options</h3>
            </div>
        </div>
    </div>);
};

export default home;