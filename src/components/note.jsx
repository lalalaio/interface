import PropTypes from 'prop-types'
import Tone from './tone.jsx'

const Note = ({tone, index}) => {
  const toneChart = {
    1: 'C7',
    2: 'B7',
    3: 'A#7',
    4: 'A7',
    5: 'G#6',
    6: 'G6',
    7: 'F#6',
    8: 'F6',
    9: 'E6',
    10: 'D#6',
    11: 'D6',
    12: 'C#6',
    13: 'C6',
    14: 'B6',
    15: 'A#6',
    16: 'A6'
  }
  const toneList = Object.keys(toneChart).map(toneIndex => {
    const active = tone.note === toneChart[toneIndex]
    return (
      <Tone
        key={toneIndex}
        active={active}
        index={parseInt(toneIndex)}
        start={tone.start}
        end={tone.end}
      />
    )
  })
  const className = `note note-${index+1}`
  return (
    <div className={className}>
      {toneList}
    </div>
  )
}
Note.propTypes = {
  tone: PropTypes.object,
  index: PropTypes.number
}

export default Note
