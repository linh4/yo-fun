import React, { Component } from 'react';
import ChatBox from './ChatBox'
import Display from './Display'

class ChatContainer extends Component {
  render() {
    return (
      <div>
        <div class="display">
          <Display />
        </div>
        <div class="chatbox">
          <ChatBox dataChannel={this.props.dataChannel} />
        </div>
      </div>
    )
  }
}

export default ChatContainer;
