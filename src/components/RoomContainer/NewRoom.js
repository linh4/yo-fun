import React, { Component } from 'react';
import RoomList from './RoomList'
import { connect } from 'react-redux'
import { pickRoom, getRoom} from '../../actions/roomAction'
import { isCreator } from '../../actions/userAction'

class NewRoom extends Component {

  state = {
    valid: true
  }

  renderNewRoom = (message, newRoom) => {
    let data = JSON.parse(message.data)
    if (data.status === 'success') {
      this.props.isCreator()
      this.props.pickRoom(newRoom)
    } else {
      this.setState({valid: false})
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    let newRoom = e.target.roomname.value
    let message = {roomname: e.target.roomname.value, type: 'addRoomname'}
    this.props.connection.send(JSON.stringify(message))
    this.props.connection.onmessage = (message) => {
      this.renderNewRoom(message, newRoom)
    }
  }

  render() {
    return (
      <div>
        <h3>Create a Room</h3>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="roomname"/>
          <input type="submit" />
        </form>

        {this.state.valid ? <div></div> : (
          <div>Name already exists</div>
        )}
      </div>
    )
  }
}

export default connect(null, { pickRoom, getRoom, isCreator })(NewRoom)
