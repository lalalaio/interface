import PropTypes from 'prop-types'
import Post from './post.jsx'

const PostList = ({posts, playHandler, nowPlaying}) => {
  const listItems = posts.map((post) =>
    <li key={post.uuid}>
      <Post
        post={post}
        playHandler={playHandler}
        playingNote={nowPlaying[post.uuid]}
        isPlaying={(post.uuid in nowPlaying) ? true : false}
      />
    </li>
  )
  return (
    <ul className="posts">{listItems}</ul>
  )
}

PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object),
  playHandler: PropTypes.func,
  nowPlaying: PropTypes.object
}

export default PostList
