import PropTypes from 'prop-types'
import React from 'react'
import Bar from './bar'
import Play from '../svg/play.svg'
import Pause from '../svg/pause.svg'
import { notesToBars } from '../util'

const Post = ({ post, playHandler, playingNote, isPlaying }) => {
  const bars = notesToBars(post.notes, isPlaying, playingNote)
  /* eslint-disable react/no-array-index-key */
  const barList = bars.map((notes, index) =>
    <Bar key={index} notes={notes} index={index} />,
  )
  const postPlayHandler = (event) => {
    event.stopPropagation()
    playHandler(event, post)
  }
  const icon = isPlaying ? <Pause /> : <Play />
  return (
    <div className="post" data-uuid={post.uuid}>
      <div className="icon">
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
    </div>
  )
}

Post.defaultProps = {
  playingNote: 0,
}

Post.propTypes = {
  post: PropTypes.shape({
    uuid: PropTypes.string,
    notes: PropTypes.array,
  }).isRequired,
  playHandler: PropTypes.func.isRequired,
  playingNote: PropTypes.number,
  isPlaying: PropTypes.bool.isRequired,
}

export default Post
