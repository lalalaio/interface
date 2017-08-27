import PropTypes from 'prop-types'
import Tone from './tone.jsx'

const Note = ({tone, index}) => {
  const toneChart = {
    1: 'F#3',
    2: 'F3',
    3: 'E3',
    4: 'D#3',
    5: 'D3',
    6: 'C#3',
    7: 'C3',
    8: 'B3',
    9: 'A#3',
    10: 'A3',
    11: 'G#2',
    12: 'G2',
    13: 'F#2',
    14: 'F2',
    15: 'E2',
    16: 'D#2',
    17: 'D2',
    18: 'C#2',
    19: 'C2',
    20: 'B2',
    21: 'A#2',
    22: 'A2',
    23: 'G#1',
    24: 'G1'
  }
  const toneList = Object.keys(toneChart).map(toneIndex => {
    const isActive = tone.note === toneChart[toneIndex]
    return (
      <Tone
        key={toneIndex}
        isActive={isActive}
        isPlaying={isActive && tone.isPlaying}
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
