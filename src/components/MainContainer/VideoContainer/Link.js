import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addUrl } from '../../../actions/chatAction'

class Link extends Component {

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addUrl(e.target.url.value)
    this.props.dataChannel.send(JSON.stringify({type: 'video', url: e.target.url.value}))
    e.target.url.value = ''
  }

  render() {
    return (
      <div className="link-box">
        <h3>Enter Link</h3>
        <form onSubmit={this.handleSubmit}>
          <input
          type="text"
          name="url"
          />
          <input type="submit" />
        </form>
      </div>
    )
  }
}

export default connect(null, { addUrl })(Link)
