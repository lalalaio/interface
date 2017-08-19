import React from 'react'
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
    return (
      <PostList posts={this.state.posts} />
    )
  }

}

export default RecentPosts
