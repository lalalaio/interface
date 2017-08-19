import PropTypes from 'prop-types'

const Post = (props) =>
  <div className="post">
    <p>{props.post.uuid}</p>
  </div>

Post.propTypes = {
  post: PropTypes.object
}

export default Post
