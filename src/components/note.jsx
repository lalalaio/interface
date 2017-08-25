import PropTypes from 'prop-types'
import Tone from './tone.jsx'

const Note = ({tone, index}) => {
  const toneChart = {
    1: 'C3',
    2: 'B3',
    3: 'A#3',
    4: 'A3',
    5: 'G#2',
    6: 'G2',
    7: 'F#2',
    8: 'F2',
    9: 'E2',
    10: 'D#2',
    11: 'D2',
    12: 'C#2',
    13: 'C2',
    14: 'B2',
    15: 'A#2',
    16: 'A2'
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
