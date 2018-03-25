import React, { Fragment } from 'react'
import Comment from '../../shared-components/Comment'

export default ({ comments }) => (
  <Fragment>
    {comments.map(comment => <Comment key={comment.id} text={comment.body} />)}
  </Fragment>
)
