import React from 'react'
import PropTypes from 'prop-types'
import AudioSynth from 'audiosynth'
import Header from '../components/header'
import RecentPosts from './recent-posts'
import Editor from './editor'
import { noteBeats } from '../util'

const noteToMIDI = (note, octave) => {
  const notes = [
    'C', 'C#', 'D', 'D#', 'E', 'F',
    'F#', 'G', 'G#', 'A', 'A#', 'B',
  ]
  return notes.indexOf(note) + (octave * 12) + 24
}

class App extends React.Component {
  constructor(props) {
    super(props)
    const AudioContext = window.AudioContext || window.webkitAudioContext
    const context = new AudioContext()
    this.state = {
      playing: {},
      AudioContext,
      context,
      synth: new AudioSynth(context),
      isEditing: false,
    }
    this.onPlay = this.onPlay.bind(this)
    this.onEdit = this.onEdit.bind(this)
  }

  onPlay(event, post) {
    this.setState((prevState) => {
      const nowPlaying = prevState.playing
      nowPlaying[post.uuid] = 0
      return { playing: nowPlaying }
    }, () => {
      this.playNotes(post.notes, 0, post)
    })
  }

  onEdit() {
    this.setState(prevState => ({ isEditing: !prevState.isEditing }))
  }

  playNotes(notes, index, post) {
    const [note, ...remainingNotes] = notes
    const beats = noteBeats[note.duration]
    this.setState((prevState) => {
      const nowPlaying = prevState.playing
      nowPlaying[post.uuid] = index
      return { playing: nowPlaying }
    })
    if (note.note !== 'REST') {
      const noteParts = note.note.match(/[a-zA-Z#]+|[0-9]+/g)
      const midiNote = noteToMIDI(...noteParts)
      this.state.synth.playNote(midiNote, 1.0, 1.0, 0)
    }
    if (remainingNotes.length > 0) {
      setTimeout(() => {
        this.playNotes(remainingNotes, index + 1, post)
      }, 250 * beats)
    } else {
      this.setState((prevState) => {
        const nowPlaying = prevState.playing
        delete nowPlaying[post.uuid]
        return { playing: nowPlaying }
      })
    }
  }

  render() {
    const { apiBase } = this.props
    const editorOrNothing = this.state.isEditing ?
      (<Editor
        playHandler={this.onPlay}
        nowPlaying={this.state.playing}
      />) : ''
    return (
      <div className="app">
        <Header
          editHandler={this.onEdit}
        />
        {editorOrNothing}
        <RecentPosts
          playHandler={this.onPlay}
          apiBase={apiBase}
          nowPlaying={this.state.playing}
        />
      </div>
    )
  }
}

App.propTypes = {
  apiBase: PropTypes.string.isRequired,
}

export default App
