import React, { Component } from 'react';
import { connect } from 'react-redux'
import ChatContainer from './ChatContainer/ChatContainer'
import { addMessage } from '../../actions/chatAction'
import { pickRoom } from '../../actions/roomAction'

class ShowPage extends Component {

  constructor(props){
    super(props)
    const configuration = {"iceServers": [{"url":"stun:stun.1.google.com:19302"}]}
    this.myConnection = new RTCPeerConnection(configuration)
    this.myConnection.onicecandidate = (e) => {
      try {
        if (e && e.candidate) {
          let data = JSON.stringify({type: 'candidate', candidate: e.candidate, roomname: this.props.room, username: props.username})
          this.props.connection.send(data)
        }
      }
      catch(err) {
        console.log(err)
      }

    }
    this.myConnection.ondatachannel = (e) => {
      e.channel.onmessage = (message) => {
        const finalData = JSON.parse(message.data)
        this.props.addMessage(finalData.currentUser, finalData.message)
      }
    }

    this.dataChannel = this.myConnection.createDataChannel(props.room, {reliable: true})
  }

  onLogin = () => {

  }

  onOffer = (data) => {
    this.myConnection.setRemoteDescription(new RTCSessionDescription(data))
    this.myConnection.createAnswer(answer => {
      this.myConnection.setLocalDescription(answer)
      let answerObj = JSON.stringify({type: 'answer', answer: answer, roomname: this.props.room, username: this.props.username})
      this.props.connection.send(answerObj)
    }, console.log)
  }

  onAnswer = (data) => {
    if (data.sdp) {
      this.myConnection.setRemoteDescription(new RTCSessionDescription(data))
    }
    else if (data.answer.sdp) {
        this.myConnection.setRemoteDescription(new RTCSessionDescription(data.answer))
    } else {
      console.log('error')
    }
  }

  onCandidate = (data) => {
    if (data.roomname === this.props.room) {
      this.myConnection.addIceCandidate(new RTCIceCandidate(data.candidate), () => {
        console.log('success')
      }, (err) => {
        console.log("error", err)
      })
    }
  }

  componentDidMount() {
    if (this.props.isCreator) {
      this.myConnection.createOffer(offer => {
        this.myConnection.setLocalDescription(offer)
        const message = JSON.stringify({type: 'offer', offer: offer, roomname: this.props.room, username: this.props.username})
        this.props.connection.send(message)
      }, console.log)
    } else {
      const message = JSON.stringify({type: 'getOffer', roomname: this.props.room, username: this.props.username})
      this.props.connection.send(message)
    }


    this.props.connection.onmessage = (message) => {
      const data = JSON.parse(message.data)
      switch (data.type) {
        case 'login':
          this.onLogin(data)
          break;
        case 'offer':
          this.onOffer(data)
          break
        case 'answer':
          this.onAnswer(data)
          break
        case 'candidate':
          this.onCandidate(data)
          break
      }
    }
  }


  goBack = () => {
    this.props.pickRoom(null)
  }

  render() {
    return (
      <div>
        <h1>ShowPage Component</h1>
        <div>{this.props.room}</div>
        <ChatContainer dataChannel={this.dataChannel} />
        <button onClick={this.goBack}>Go Back</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    room: state.room.roomname,
    username: state.user.username,
    isCreator: state.user.isCreator
    };
};

export default connect(mapStateToProps, { addMessage, pickRoom })(ShowPage)
