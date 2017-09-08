import React from 'react'
import ReactDOM from 'react-dom'
import App from './containers/app'

ReactDOM.render(
  <App
    apiBase="https://ezkyx4kbc1.execute-api.us-east-1.amazonaws.com/v1"
  />,
  document.getElementById('container'),
)
