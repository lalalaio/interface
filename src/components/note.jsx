import PropTypes from 'prop-types'
import React from 'react'
import Tone from './tone'
import { allTones } from '../util'

const lowTones = allTones.slice(0, 24)
const midTones = allTones.slice(24, 48)
const highTones = allTones.slice(48)

const Note = ({ tone, index, clickHandler }) => {
  let toneChart = midTones.slice(0)
  let octaveClass = 'octave-mid'
  if (lowTones.indexOf(tone.note) > -1) {
    toneChart = lowTones.slice(0)
    octaveClass = 'octave-low'
  } else if (highTones.indexOf(tone.note) > -1) {
    toneChart = highTones.slice(0)
    octaveClass = 'octave-high'
  }
  toneChart.reverse()
  const toneList = Object.keys(toneChart).map((toneIndex) => {
    const isActive = tone.note === toneChart[toneIndex]
    const onNoteClick = (event, toneClickIndex) =>
      clickHandler(event, index, toneClickIndex)
    return (
      <Tone
        key={parseInt(toneIndex, 10) + 1}
        isActive={isActive}
        isPlaying={isActive && tone.isPlaying}
        index={parseInt(toneIndex, 10) + 1}
        isStart={tone.start}
        isEnd={tone.end}
        clickHandler={onNoteClick}
      />
    )
  })
  const className = `note note-${index + 1} ${octaveClass}`
  return (
    <div className={className}>
      {toneList}
    </div>
  )
}
Note.propTypes = {
  tone: PropTypes.shape({
    note: PropTypes.string,
    isPLaying: PropTypes.bool,
    start: PropTypes.bool,
    end: PropTypes.bool,
  }).isRequired,
  index: PropTypes.number.isRequired,
  clickHandler: PropTypes.func.isRequired,
}

export default Note
