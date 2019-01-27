import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addMessage } from '../../../actions/chatAction'

class ChatBox extends Component {

  handleSubmit = (e) => {
    e.preventDefault()
    console.log(e.target.msg.value)
    const msg = JSON.stringify({currentUser: this.props.user, message: e.target.msg.value})
    this.props.dataChannel.send(msg)
    this.props.addMessage(this.props.user, e.target.msg.value)
    e.target.msg.value = ''
  }

  render() {
    return (
      <div>
        <h1>ChatBox Component</h1>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="msg"/>
          <input type="submit"/>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.username
    };
};

export default connect(mapStateToProps, { addMessage })(ChatBox)
