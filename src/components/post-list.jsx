import PropTypes from 'prop-types'
import Post from './post.jsx'

const PostList = ({posts}) => {
  const listItems = posts.map((post) =>
    <li key={post.uuid}>
      <Post post={post} />
    </li>
  )
  return (
    <ul className="posts">{listItems}</ul>
  )
}

PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object)
}

export default PostList
