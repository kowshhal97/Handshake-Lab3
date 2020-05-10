import React, { Component } from 'react';
import MessageList from './MessageList'
import Conversation from './Conversation'
import Grid from '@material-ui/core/Grid';
import './Messages.css'

class Messages extends Component {


    state = {
        selectedMessage: null,
    }


    selectMessage = (value) => {
        this.setState({ selectedMessage: null },()=>{
            this.setState({ selectedMessage: value.id })
        })
    }
    render = () => {
        let conv;
        if (this.state.selectedMessage != null) {
            conv = (<Conversation conversationId={this.state.selectedMessage} />)
        }
        else {
            conv = (<div className="section">
                <h1 className="selectText">
                    Please select a Coversation
    </h1>
            </div>)
        }

        console.log(this.state.selectedMessage)
        return (
            <div>
                <Grid container item xs={12}>
                    <Grid container item xs={4}>
                        <MessageList selectMessage={this.selectMessage} />
                    </Grid>

                    <Grid container item xs={8}>
                        {conv}
                    </Grid>

                </Grid>
            </div>
        )
    };
}



export default Messages;