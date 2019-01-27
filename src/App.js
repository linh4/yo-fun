import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import User from './components/User'
import NewRoom from './components/RoomContainer/NewRoom'
import RoomList from './components/RoomContainer/RoomList'
import ShowPage from './components/MainContainer/ShowPage'


class App extends Component {

  constructor(props){
    super(props)
    this.connection = new WebSocket('ws://192.168.1.166:8000')
  }

  render(){
    return (
      <div>
        {this.props.username ? (
          this.props.chosenRoom ? <ShowPage connection={this.connection} /> : (
            <div>
              <NewRoom connection={this.connection} />
              <RoomList connection={this.connection} />
            </div>
          )
      ) : (
          <User connection={this.connection} />
      )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.user.username,
    chosenRoom: state.room.roomname
    };
};

export default connect(mapStateToProps)(App)
