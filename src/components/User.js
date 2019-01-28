import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../actions/userAction'

class User extends Component {

  state = {
    username: '',
    valid: true
  }

  handleChange = (e) => {
    this.setState({username: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    let message = {username: this.state.username, type: 'addUsername'}
    this.props.connection.send(JSON.stringify(message))
    this.props.connection.onmessage = (message) => {
      let data = JSON.parse(message.data)
      console.log(data.status)
      if (data.status === 'success') {
        this.props.loginUser(this.state.username)
      } else {
        this.setState({valid: false})
      }
    }
  }

  render() {
    return (
      <div>
        <h1>Welcome to Yo-Fun</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="enter your name"
            onChange={this.handleChange}
          />
          <input type="submit"/>
        </form>
        {this.state.valid ? <div></div> : (
          <div>Username exists</div>
        )}
      </div>
    )
  }
}

export default connect(null, { loginUser })(User)
