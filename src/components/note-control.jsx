import PropTypes from 'prop-types'
import React from 'react'

const NoteControl = ({ beats, active, clickHandler }) => {
  const activeClass = active ? ' active' : ''
  const noteClass = `note note-${beats}${activeClass}`
  return (
    <a
      className={noteClass}
      onClick={event => clickHandler(event, beats)}
      role="button"
      tabIndex="0"
    >{beats}</a>
  )
}

NoteControl.propTypes = {
  beats: PropTypes.number.isRequired,
  active: PropTypes.bool.isRequired,
  clickHandler: PropTypes.func.isRequired,
}

export default NoteControl
