import React from 'react'
import PropTypes from 'prop-types'
import Post from '../components/post'

class SinglePost extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      post: false,
    }
  }
  async componentWillMount() {
    const { apiBase, postUuid, postsCache } = this.props

    if (postUuid in postsCache) {
      this.setState({ post: postsCache[postUuid] })
    } else {
      const postApi = `${apiBase}/post/${postUuid}`
      const post = await fetch(postApi)
        .then(response => response.json())
      postsCache[postUuid] = post
      this.setState({ post })
    }
  }

  render() {
    const { playHandler, nowPlaying } = this.props
    const { post } = this.state
    if (this.state.post) {
      return (
        <Post
          post={post}
          playHandler={playHandler}
          playingNote={nowPlaying[post.uuid]}
          isPlaying={(post.uuid in nowPlaying)}
          isFocused
        />
      )
    }
    return <div />
  }
}

SinglePost.propTypes = {
  postUuid: PropTypes.string.isRequired,
  playHandler: PropTypes.func.isRequired,
  nowPlaying: PropTypes.objectOf(PropTypes.number).isRequired,
  apiBase: PropTypes.string.isRequired,
  postsCache: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default SinglePost
