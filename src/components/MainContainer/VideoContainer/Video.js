import React, { Component } from 'react';
// import YouTube from 'react-youtube'
import ReactPlayer from 'react-player'

class Video extends Component {

  state = {
    playing: false
  }

  componentDidUpdate() {
    if (this.props.videoMsg && this.state.playing) {
      this.refs.video.seekTo(this.props.videoMsg.time)
      this.setState({playing: false})
    }
  }

  onPlay = () => {
    this.setState({playing: true})

  }

  onPause = () => {
    let msg = JSON.stringify({type: 'pause', time: this.refs.video.getCurrentTime()})
    this.props.dataChannel.send(msg)
    console.log("onpause", {type: 'pause', time: this.refs.video.getCurrentTime()})
  }

  render () {
    return (
      <ReactPlayer
      url='https://www.youtube.com/watch?v=BzE1mX4Px0I'
      playing={this.state.playing}
      onPlay={this.onPlay}
      onPause={this.onPause}
      ref="video"
      />
    )
  }
}

export default Video;
