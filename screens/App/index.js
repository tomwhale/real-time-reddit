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
    this._getComments();
  }

  _getComments = () => {
    request
      .get(`https://www.reddit.com/comments/871kqt.json?sort=new&limit=50`)
      .then(res => res.body)
      .then(R.last)
      .then(R.path(['data', 'children']))
      .then(R.map(R.prop('data')))
      .then(R.tap(console.log))
      .then(comments => this.setState({
        comments
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
