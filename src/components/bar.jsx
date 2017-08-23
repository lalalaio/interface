import PropTypes from 'prop-types'
import Note from './note.jsx'

const Bar = ({notes, index}) => {
  const noteList = notes.map((tone, noteIndex) =>
    <Note key={noteIndex} tone={tone} index={noteIndex} />
  )
  const className = `bar bar-${index+1}`
  return (
    <div className={className}>
      {noteList}
    </div>
  )
}

Bar.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object),
  index: PropTypes.number
}

export default Bar
