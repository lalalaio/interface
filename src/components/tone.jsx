import PropTypes from 'prop-types'

const Tone = ({isActive, isPlaying, start, end, index}) => {
  const activeClass = isActive ? ' active' : ''
  const playingClass = isPlaying ? ' playing' : ''
  const startClass = start ? ' start' : ''
  const endClass = end ? ' end' : ''
  const maybeClasses = `${activeClass}${playingClass}${startClass}${endClass}`
  const className = `tone tone-${index+1}${maybeClasses}`
  return (
    <div className={className}></div>
  )
}

Tone.propTypes = {
  isActive: PropTypes.bool,
  isPlaying: PropTypes.bool,
  start: PropTypes.bool,
  end: PropTypes.bool,
  index: PropTypes.number
}

export default Tone
