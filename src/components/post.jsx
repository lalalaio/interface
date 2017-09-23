import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router-dom'
import Bar from './bar'
import Play from '../svg/play.svg'
import Pause from '../svg/pause.svg'
import Permalink from '../svg/permalink.svg'
import { notesToBars } from '../util'

const Post = ({ post, playHandler, playingNote, isPlaying, isFocused }) => {
  const bars = notesToBars(post.notes, isPlaying, playingNote)
  /* eslint-disable react/no-array-index-key */
  const barList = bars.map((notes, index) =>
    <Bar key={index} notes={notes} index={index} />,
  )
  const postPlayHandler = (event) => {
    playHandler(event, post)
  }
  const icon = isPlaying ? <Pause /> : <Play />
  const linkIcon = isFocused ? '' : (
    <Link to={`/%E2%96%B6/${post.uuid}`}><Permalink /></Link>
  )
  return (
    <div className="post">
      <div className="actions">
        <a
          href="#▶"
          className="playButton"
          onClick={postPlayHandler}
        >
          {icon}
        </a>
      </div>
      <div className="notes">
        {barList}
      </div>
      <div className="meta">
        {linkIcon}
      </div>
    </div>
  )
}

Post.defaultProps = {
  playingNote: 0,
  isFocused: false,
}

Post.propTypes = {
  post: PropTypes.shape({
    uuid: PropTypes.string,
    notes: PropTypes.array,
  }).isRequired,
  playHandler: PropTypes.func.isRequired,
  playingNote: PropTypes.number,
  isPlaying: PropTypes.bool.isRequired,
  isFocused: PropTypes.bool,
}

export default Post
