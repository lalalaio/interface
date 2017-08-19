import PropTypes from 'prop-types'
import Post from '../components/post.jsx'

const PostList = (props) => {
  const listItems = props.posts.map((post) =>
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
