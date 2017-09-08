import PropTypes from 'prop-types'
import React from 'react'
import Post from './post'

const PostList = ({ posts, playHandler, nowPlaying }) => {
  const listItems = posts.map(post =>
    (<li key={post.uuid}>
      <Post
        post={post}
        playHandler={playHandler}
        playingNote={nowPlaying[post.uuid]}
        isPlaying={(post.uuid in nowPlaying)}
      />
    </li>),
  )
  return (
    <ul className="posts">{listItems}</ul>
  )
}

PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  playHandler: PropTypes.func.isRequired,
  nowPlaying: PropTypes.objectOf(PropTypes.number).isRequired,
}

export default PostList
