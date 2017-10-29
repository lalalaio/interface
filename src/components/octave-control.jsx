import PropTypes from 'prop-types'
import React from 'react'

const OctaveControl = ({ range, active, clickHandler }) => {
  const activeClass = active ? ' active' : ''
  const octaveClass = `octave octave-${range}${activeClass}`
  return (
    <a
      className={octaveClass}
      onClick={event => clickHandler(event, range)}
      role="button"
      tabIndex="0"
    >
      <div className="high" />
      <div className="mid" />
      <div className="low" />
      <div>{range}</div>
    </a>
  )
}

OctaveControl.propTypes = {
  range: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  clickHandler: PropTypes.func.isRequired,
}

export default OctaveControl
