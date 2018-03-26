import request from 'superagent'
import * as R from 'ramda'
import React, { Component } from 'react'
import App from './App'

export default class AppContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      comments: []
    };
  }

  componentDidMount() {
    const threadId = this.props.match.params.threadId;

    this._getComments(threadId)
      .then(_ => {
        setTimeout(() => {
          this._getComments(threadId);
        }, 5000)
      });
  }

  _getComments = (threadId) => {
    request
      .get(`https://www.reddit.com/comments/${threadId}.json?sort=new&limit=50`)
      .then(res => res.body)
      .then(R.last)
      .then(R.path(['data', 'children']))
      .then(R.map(R.prop('data')))
      .then(comments => this.setState({
        comments: R.pipe(
          R.concat(this.state.comments),
          R.uniqWith((a, b) => a.id === b.id)
        )(comments)
      }))
  }

  _generateProps = () => ({
    comments: this.state.comments,
    ...this.props
  })

  render () {
    const props = this._generateProps()
    return (
      <App {...props} />
    )
  }
}
