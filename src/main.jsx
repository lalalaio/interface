import React from 'react'
import ReactDOM from 'react-dom'
import RecentPosts from './containers/recent-posts.jsx'

ReactDOM.render(
  <div className="body">
    <RecentPosts
      apiBase="https://ezkyx4kbc1.execute-api.us-east-1.amazonaws.com/v1"
    />
  </div>,
  document.getElementById('container'),
)
