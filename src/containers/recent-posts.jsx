import React from 'react'
import PropTypes from 'prop-types'
import PostList from '../components/post-list'

class RecentPosts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: [],
    }
  }

  async componentWillMount() {
    const { apiBase, postsCache } = this.props
    const recentPostsApi = `${apiBase}/post/latest`
    const recentPostUuids = await fetch(recentPostsApi)
      .then(response => response.json())
    const recentPosts = await Promise.all(
      recentPostUuids.map((postUuid) => {
        if (postUuid in postsCache) {
          return postsCache[postUuid]
        }
        const postApi = `${apiBase}/post/${postUuid}`
        return fetch(postApi)
          .then(response => response.json())
      }),
    )
    for (let index = 0; index < recentPosts.length; index += 1) {
      const post = recentPosts[index]
      postsCache[post.uuid] = post
    }
    this.setState({
      posts: recentPosts,
    })
  }

  render() {
    const { playHandler, nowPlaying } = this.props
    const { posts } = this.state
    return (
      <PostList
        posts={posts}
        playHandler={playHandler}
        nowPlaying={nowPlaying}
      />
    )
  }
}

RecentPosts.propTypes = {
  playHandler: PropTypes.func.isRequired,
  nowPlaying: PropTypes.objectOf(PropTypes.number).isRequired,
  apiBase: PropTypes.string.isRequired,
  postsCache: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default RecentPosts
