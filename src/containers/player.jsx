import React from 'react'
import PropTypes from 'prop-types'
import RecentPosts from './recent-posts.jsx'
import AudioSynth from 'audiosynth'
import {noteBeats} from '../util.js'

class Player extends React.Component {

  constructor(props) {
    super(props)
    const AudioContext = window.AudioContext || window.webkitAudioContext
    const context = new AudioContext()
    this.state = {
      playing: {},
      AudioContext: AudioContext,
      context: context,
      synth: new AudioSynth(context)
    }
  }

  noteToMIDI(note, octave) {
    const notes = [
      'C', 'C#', 'D', 'D#', 'E', 'F',
      'F#', 'G', 'G#', 'A', 'A#', 'B'
    ]
    return notes.indexOf(note) + (octave * 12) + 24
  }

  playNotes(notes, index, post) {
    const [note, ...remainingNotes] = notes
    const beats = noteBeats[note.duration]
    this.setState((prevState, props) => {
      const nowPlaying = prevState.playing
      nowPlaying[post.uuid] = index
      return {'playing': nowPlaying}
    })
    if (note.note !== 'REST') {
      const noteParts = note.note.match(/[a-zA-Z#]+|[0-9]+/g)
      const midiNote = this.noteToMIDI(...noteParts)
      this.state.synth.playNote(midiNote, 1.0, 1.0, 0)
    }
    if (remainingNotes.length > 0) {
      setTimeout(() => {
        this.playNotes(remainingNotes, index + 1, post)
      }, 250 * beats)
    }
    else {
      this.setState((prevState, props) => {
        const nowPlaying = prevState.playing
        delete nowPlaying[post.uuid]
        return {'playing': nowPlaying}
      })
    }
  }

  handlePlay(event, post) {
    this.setState((prevState, props) => {
      const nowPlaying = prevState.playing
      nowPlaying[post.uuid] = 0
      return {'playing': nowPlaying}
    }, () => {
      this.playNotes(post.notes, 0, post)
    })
  }

  render() {
    const {apiBase} = this.props
    return (
      <RecentPosts
        playHandler={this.handlePlay.bind(this)}
        apiBase={apiBase}
        nowPlaying={this.state.playing}
      />
    )
  }

}

Player.propTypes = {
  apiBase: PropTypes.string
}

export default Player
