import React, { Component } from 'react';
import ReactPlayer from 'react-player'
import { connect } from 'react-redux'
import { addUrl } from '../../../actions/chatAction'

class Video extends Component {

  state = {
    playing: false
  }

  componentDidUpdate() {
    console.log('hit didupdate')
    if (this.props.videoMsg && this.props.videoMsg.type === 'pause' && this.state.playing) {
      this.refs.video.seekTo(this.props.videoMsg.time)
      this.setState({playing: false})
      console.log('after update', this.state.playing)
    }
    else if (this.props.videoMsg && this.props.videoMsg.type === 'play' && !this.state.playing) {
      this.refs.video.seekTo(this.props.videoMsg.time)
      this.setState({playing: true})
      console.log('after update', this.state.playing)
    }
    else if (this.props.videoMsg && this.props.videoMsg.type === 'video') {
      this.props.addUrl(this.props.videoMsg.url)
    }
  }

  onPlay = (event) => {
    event.persist()
    console.log('before setstae', this.state.playing)
    this.setState({playing: true})
    console.log('after setstae', this.state.playing)
    let msg = JSON.stringify({type: 'play', time: this.refs.video.getCurrentTime()})
    this.props.dataChannel.send(msg)
  }

  onPause = (event) => {
    event.persist()
    console.log('before setstae', this.state.playing)
    this.setState({playing: false})
    console.log('after setstae', this.state.playing)
    let msg = JSON.stringify({type: 'pause', time: this.refs.video.getCurrentTime()})
    this.props.dataChannel.send(msg)
  }

  render () {
    return (
      <div className="video-box">
        <ReactPlayer
        url={this.props.url}
        playing={this.state.playing}
        ref="video"
        />
        <button className="btn btn-play" onClick={this.onPlay}>Play</button>
        <button className="btn btn-pause" onClick={this.onPause}>Pause</button>
      </div>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    url: state.chat.url
    };
};

export default connect(mapStateToProps, { addUrl })(Video)
