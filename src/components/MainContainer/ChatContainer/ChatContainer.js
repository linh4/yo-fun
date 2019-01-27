import React, { Component } from 'react';
import ChatBox from './ChatBox'
import Display from './Display'

class ChatContainer extends Component {
  render() {
    return (
      <div>
        <h1>ChatContainer Component</h1>
        <Display />
        <ChatBox dataChannel={this.props.dataChannel} />
      </div>
    )
  }
}

export default ChatContainer;
