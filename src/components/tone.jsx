import PropTypes from 'prop-types'
import React from 'react'

const Tone = ({ isActive, isPlaying, isStart, isEnd, index, clickHandler }) => {
  const activeClass = isActive ? ' active' : ''
  const playingClass = isPlaying ? ' playing' : ''
  const startClass = isStart ? ' start' : ''
  const endClass = isEnd ? ' end' : ''
  const maybeClasses = `${activeClass}${playingClass}${startClass}${endClass}`
  const className = `tone tone-${index + 1}${maybeClasses}`
  if (typeof clickHandler !== 'function') {
    return (
      <div className={className} />
    )
  }

  return (
    <a
      className={className}
      onClick={event => clickHandler(event, index)}
      role="button"
      tabIndex="-1"
    >□</a>
  )
}

Tone.defaultProps = {
  isStart: false,
  isEnd: false,
}

Tone.propTypes = {
  isActive: PropTypes.bool.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  isStart: PropTypes.bool,
  isEnd: PropTypes.bool,
  index: PropTypes.number.isRequired,
  clickHandler: PropTypes.oneOfType(
    PropTypes.func,
    PropTypes.bool,
  ).isRequired,
}

export default Tone
