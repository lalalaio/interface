import React from 'react'
import ReactDOM from 'react-dom'
import Header from './containers/header.jsx'
import Player from './containers/player.jsx'

ReactDOM.render(
  <div className="body">
    <Header />
    <Player
      apiBase="https://ezkyx4kbc1.execute-api.us-east-1.amazonaws.com/v1"
    />
  </div>,
  document.getElementById('container'),
)
