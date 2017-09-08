import PropTypes from 'prop-types'
import React from 'react'
import Note from './note'

const Bar = ({ notes, index, clickHandler }) => {
  const barClickHandler = (event, noteIndex, toneIndex) =>
    clickHandler(event, index, noteIndex, toneIndex)
  /* eslint-disable react/no-array-index-key */
  const noteList = notes.map((tone, noteIndex) =>
    (<Note
      key={noteIndex}
      tone={tone}
      index={noteIndex}
      clickHandler={barClickHandler}
    />),
  )
  const className = `bar bar-${index + 1}`
  return (
    <div className={className}>
      {noteList}
    </div>
  )
}

Bar.defaultProps = {
  clickHandler: () => {},
}

Bar.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
  index: PropTypes.number.isRequired,
  clickHandler: PropTypes.func,
}

export default Bar
