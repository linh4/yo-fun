import React, { Component } from 'react';
import { connect } from 'react-redux'
import { pickRoom } from '../../actions/roomAction'
import { isJoiner } from '../../actions/userAction'

class RoomList extends Component {

  state = {
    rooms: []
  }

  renderRooms = () => {
    this.props.connection.send(JSON.stringify({type: 'getRoomname'}))
    this.props.connection.onmessage = (message) => {
      this.setState({rooms: JSON.parse(message.data)})
    }
  }

  componentDidMount() {
    this.renderRooms()
  }

  handleChange = (e) => {
    if (e.target.value !== 'Select a room') {
      const obj2 = JSON.stringify({type: 'joinRoomname', roomname: e.target.value})
      this.props.connection.send(obj2)


      const obj = JSON.stringify({type: 'checkRoomname', roomname: e.target.value})
      this.props.connection.send(obj)


      this.props.pickRoom(e.target.value)
      // this.props.isJoiner()
    }
  }

  render() {
    return (
      <div>
        <h1>RoomList Component</h1>
        <select onChange={this.handleChange}>
          <option>Select a room</option>
          {this.state.rooms.map(room => (
            <option key={room}>{room}</option>
          )
        )}
        </select>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    rooms: state.room.rooms
    };
};

export default connect(mapStateToProps, { pickRoom, isJoiner })(RoomList)
