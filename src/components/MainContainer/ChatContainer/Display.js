import React, { Component } from 'react';
import { connect } from 'react-redux'

class Display extends Component {

  render() {
    return (
      <div>
        {this.props.chat.map(msg => <div key={msg.message}><b>{msg.username}:</b> {msg.message}</div>)}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    chat: state.chat.messages
    };
};

export default connect(mapStateToProps)(Display)
