import PropTypes from 'prop-types'
import Tone from './tone.jsx'
import {allTones} from '../util.js'

const lowTones = allTones.slice(0, 24)
const midTones = allTones.slice(24, 48)
const highTones = allTones.slice(48)

const Note = ({tone, index}) => {
  let toneChart = midTones.slice(0)
  let octaveClass = 'octave-mid'
  if (lowTones.indexOf(tone.note) > -1) {
    toneChart = lowTones.slice(0)
    octaveClass = 'octave-low'
  }
  else if (highTones.indexOf(tone.note) > -1) {
    toneChart = highTones.slice(0)
    octaveClass = 'octave-high'
  }
  toneChart.reverse()
  const toneList = Object.keys(toneChart).map(toneIndex => {
    const isActive = tone.note === toneChart[toneIndex]
    return (
      <Tone
        key={parseInt(toneIndex)+1}
        isActive={isActive}
        isPlaying={isActive && tone.isPlaying}
        index={parseInt(toneIndex)+1}
        start={tone.start}
        end={tone.end}
      />
    )
  })
  const className = `note note-${index+1} ${octaveClass}`
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
