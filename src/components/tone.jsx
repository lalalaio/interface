import PropTypes from 'prop-types'

const Tone = ({active, start, end, index}) => {
  const activeClass = active ? ' active' : ''
  const startClass = start ? ' start' : ''
  const endClass = end ? ' end' : ''
  const maybeClasses = `${activeClass}${startClass}${endClass}`
  const className = `tone tone-${index+1}${maybeClasses}`
  return (
    <div className={className}></div>
  )
}

Tone.propTypes = {
  active: PropTypes.bool,
  start: PropTypes.bool,
  end: PropTypes.bool,
  index: PropTypes.number
}

export default Tone
