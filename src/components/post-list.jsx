import PropTypes from 'prop-types'
import Post from './post.jsx'

const PostList = ({posts, playHandler}) => {
  const listItems = posts.map((post) =>
    <li key={post.uuid}>
      <Post post={post} playHandler={playHandler}/>
    </li>
  )
  return (
    <ul className="posts">{listItems}</ul>
  )
}

PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object),
  playHandler: PropTypes.func
}

export default PostList
