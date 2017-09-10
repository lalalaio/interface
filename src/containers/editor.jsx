import React from 'react'
import PropTypes from 'prop-types'
import Bar from '../components/bar'
import OctaveControl from '../components/octave-control'
import NoteControl from '../components/note-control'
import Play from '../svg/play.svg'
import Pause from '../svg/pause.svg'
import Check from '../svg/check.svg'
import { notesToBars, allTones, addNoteToNotes } from '../util'

class Editor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      notes: [],
      range: 'mid',
      beats: 4,
      playing: false,
    }
    this.onNoteClick = this.onNoteClick.bind(this)
    this.onOctaveClick = this.onOctaveClick.bind(this)
    this.onToneClick = this.onToneClick.bind(this)
  }

  onOctaveClick(event, range) {
    this.setState({ range })
  }

  onNoteClick(event, beats) {
    this.setState({ beats })
  }

  onToneClick(event, barIndex, noteIndex, toneIndex) {
    this.setState((prevState) => {
      const { beats, notes, range } = prevState
      let toneBase = 0
      if (range === 'mid') {
        toneBase = 24
      }
      if (range === 'high') {
        toneBase = 48
      }
      const noteTone = allTones[toneBase + (24 - toneIndex)]
      const noteBeats = beats
      const beatIndex = (barIndex * 16) + noteIndex
      return {
        notes: addNoteToNotes(notes, noteTone, noteBeats, beatIndex),
      }
    })
  }

  render() {
    const { playHandler, nowPlaying } = this.props
    const isPlaying = ('--draft--' in nowPlaying)
    const playingNote = nowPlaying['--draft--']
    const bars = notesToBars(this.state.notes, isPlaying, playingNote)
    /* eslint-disable react/no-array-index-key */
    const barList = bars.map((notes, index) =>
      (<Bar
        key={index}
        notes={notes}
        index={index}
        clickHandler={this.onToneClick}
      />),
    )
    const editorPlayHandler = (event) => {
      playHandler(event, {
        uuid: '--draft--',
        notes: this.state.notes,
      })
    }
    const icon = isPlaying ? <Pause /> : <Play />
    return (
      <div id="editor">
        <div className="post">
          <div className="icon">
            <a
              href="#▶"
              className="playButton"
              onClick={editorPlayHandler}
            >
              {icon}
            </a>
          </div>
          <div className="notes">
            {barList}
          </div>
          <div className="controls">
            <div className="notes">
              <NoteControl
                beats={1}
                active={this.state.beats === 1}
                clickHandler={this.onNoteClick}
              />
              <NoteControl
                beats={2}
                active={this.state.beats === 2}
                clickHandler={this.onNoteClick}
              />
              <NoteControl
                beats={4}
                active={this.state.beats === 4}
                clickHandler={this.onNoteClick}
              />
              <NoteControl
                beats={8}
                active={this.state.beats === 8}
                clickHandler={this.onNoteClick}
              />
              <NoteControl
                beats={16}
                active={this.state.beats === 16}
                clickHandler={this.onNoteClick}
              />
            </div>
            <div className="octaves">
              <OctaveControl
                range="high"
                active={this.state.range === 'high'}
                clickHandler={this.onOctaveClick}
              />
              <OctaveControl
                range="mid"
                active={this.state.range === 'mid'}
                clickHandler={this.onOctaveClick}
              />
              <OctaveControl
                range="low"
                active={this.state.range === 'low'}
                clickHandler={this.onOctaveClick}
              />
            </div>
          </div>
          <Check />
        </div>
      </div>
    )
  }
}

Editor.propTypes = {
  playHandler: PropTypes.func.isRequired,
  nowPlaying: PropTypes.objectOf(PropTypes.number).isRequired,
}

export default Editor
