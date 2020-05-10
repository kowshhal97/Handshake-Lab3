import React, { Component } from 'react';
import 'react-chat-elements/dist/main.css';
import { ChatList } from 'react-chat-elements'
import {connect} from 'react-redux';
import axios from 'axios';

class MessageList extends Component {
    state = {
        data: [
            
        ]
    }

    onClickHandler = (e) => {
       console.log(e)
        this.props.selectMessage(e)
    }
    componentDidMount=()=>{
        axios.get('http://localhost:3000/messages/students/'+this.props.user._id)
      .then(response => {

          this.setState({data:response.data.reverse()})
      }).catch(()=>{
          window.alert("Fail!")
      })
    }

    render() {

        
        const list2 = this.state.data.map((item) => {
            if (item.users[0].userId != this.props.user._id) {
                return { title: item.users[0].name, subtitle: item.messages[item.messages.length - 1].text, id: item._id }
            } else {
                return { title: item.users[1].name, subtitle: item.messages[item.messages.length - 1].text, id: item._id }
            }
        })
        return (
            <div style={{width: '100%'}}>
                <ChatList className='chat-list' dataSource={list2} onClick={this.onClickHandler} />
            </div>
        );
    }
}


const mapDispatchToProps = dispatch => {
    return ({

    });
};

const mapStateToProps = state => {
    return {
        user: state.user
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(MessageList);