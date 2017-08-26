import React from 'react'
import PropTypes from 'prop-types'
import PostList from '../components/post-list.jsx'

class RecentPosts extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      posts: []
    }
  }

  async componentDidMount() {
    const recentPostsApi = `${this.props.apiBase}/post/latest`
    const recentPostUuids = await fetch(recentPostsApi)
      .then(response => {
        return response.json()
      })
      .catch(error => {
        console.log('/post/latest request failed')
      })
    const recentPosts = await Promise.all(
      recentPostUuids.map(postUuid => {
        const postApi = `${this.props.apiBase}/post/${postUuid}`
        return fetch(postApi)
          .then(response => {
            return response.json()
          })
          .catch(error => {
            console.log(`/post/${postUuid} request failed`)
          })
      })
    )
    this.setState({
      posts: recentPosts
    })
  }


  render() {
    const {playHandler, nowPlaying} = this.props
    const {posts} = this.state
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
  playHandler: PropTypes.func,
  nowPlaying: PropTypes.object
}

export default RecentPosts
