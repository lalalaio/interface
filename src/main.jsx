import React from 'react'
import ReactDOM from 'react-dom'
import RecentPosts from './containers/recent-posts.jsx'
import AudioSynth from 'audiosynth'
import noteBeats from './util.js'

const AudioContext = window.AudioContext || window.webkitAudioContext
const context = new AudioContext()
const synth = new AudioSynth(context)

const playNotes = (notes) => {
  const [note, ...remainingNotes] = notes
  const beats = noteBeats[note.duration]
  if (note.note !== 'REST') {
    const noteParts = note.note.match(/[a-zA-Z]+|[0-9]+/g)
    const midiNote = synth.noteToMIDI(...noteParts)
    synth.playNote(midiNote, 1.0, 1.0, 0)
  }
  if (remainingNotes.length > 0) {
    setTimeout(() => {
      playNotes(remainingNotes)
    }, 250 * beats)
  }
}

const handlePlay = (event, post) => {
  playNotes(post.notes)
}

ReactDOM.render(
  <div className="body">
    <RecentPosts
      apiBase="https://ezkyx4kbc1.execute-api.us-east-1.amazonaws.com/v1"
      playHandler={handlePlay}
    />
  </div>,
  document.getElementById('container'),
)
