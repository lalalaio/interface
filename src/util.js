const noteBeats = {
  1: 16,
  '1/2': 8,
  '1/4': 4,
  '1/8': 2,
  '1/16': 1,
}

const colorMap = {
  0: '#000000',
  1: '#b80000',
  2: '#eb9694',
  3: '#db3e00',
  4: '#fad0c3',
  5: '#fccb00',
  6: '#fef3bd',
  7: '#008b02',
  8: '#c1e1c5',
  9: '#006b76',
  10: '#bedadc',
  11: '#004dcf',
  12: '#bed3f3',
  13: '#5300eb',
  14: '#d4c4fb',
  15: '#525252',
  16: '#969696',
  17: '#d9d9d9',
  18: '#795548',
  19: '#d7ccc8',
  20: '#ff00eb',
  21: '#00ff3b',
  22: '#cddc39',
}

const shapeMap = {
  0: 'square',
  1: 'triangle-top-left',
  2: 'triangle-top-right',
  3: 'triangle-bottom-right',
  4: 'triangle-bottom-left',
  5: 'rectangle-left',
  6: 'rectangle-top',
  7: 'rectange-right',
  8: 'rectangle-bottom',
  9: 'circle-top-left',
  10: 'circle-top-right',
  11: 'circle-bottom-right',
  12: 'circle-bottom-left',
  13: 'small-square-top-left',
  14: 'small-square-top-right',
  15: 'small-square-bottom-right',
  16: 'small-square-bottom-left',
  17: 'plus-top-left',
  18: 'plus-top-right',
  19: 'plus-bottom-right',
  20: 'plus-bottom-left',
  21: 'circle',
}

const beatsToDuration = (beats) => {
  if (beats > 8) {
    return '1'
  }
  if (beats > 4) {
    return '1/2'
  }
  if (beats > 2) {
    return '1/4'
  }
  if (beats > 1) {
    return '1/8'
  }
  return '1/16'
}

const allTones = [
  'C1', 'C#1', 'D1', 'D#1', 'E1', 'F1',
  'F#1', 'G1', 'G#1', 'A1', 'A#1', 'B1',
  'C2', 'C#2', 'D2', 'D#2', 'E2', 'F2',
  'F#2', 'G2', 'G#2', 'A2', 'A#2', 'B2',
  'C3', 'C#3', 'D3', 'D#3', 'E3', 'F3',
  'F#3', 'G3', 'G#3', 'A3', 'A#3', 'B3',
  'C4', 'C#4', 'D4', 'D#4', 'E4', 'F4',
  'F#4', 'G4', 'G#4', 'A4', 'A#4', 'B4',
  'C5', 'C#5', 'D5', 'D#5', 'E5', 'F5',
  'F#5', 'G5', 'G#5', 'A5', 'A#5', 'B5',
  'C6', 'C#6', 'D6', 'D#6', 'E6', 'F6',
  'F#6', 'G6', 'G#6', 'A6', 'A#6', 'B6',
]

const barFiller = Array(16).fill(
  Object.assign({}, { note: 'REST', isPlaying: false }),
)

const notesToBarsWithoutFiller = (notes, isPlaying, playingNote) =>
  notes.reduce((bars, note, noteIndex) => {
    for (let index = 0; index < noteBeats[note.duration]; index += 1) {
      const barNote = {
        note: note.note,
        isPlaying: (isPlaying && (playingNote === noteIndex)),
      }
      if (index === 0) {
        barNote.start = true
      }
      if (index + 1 === noteBeats[note.duration]) {
        barNote.end = true
      }
      bars[bars.length - 1].push(barNote)
      if (bars[bars.length - 1].length === 16) {
        bars.push([])
      }
    }
    return bars
  }, [[]])

const allBars = bars => [...bars, ...Array(8).fill([])].slice(0, 8)

const fillBar = bar => [...bar, ...barFiller.slice(0)].slice(0, 16)

const fullBars = bars => bars.map(fillBar)

const notesToBars = (notes, isPlaying, playingNote) =>
  fullBars(allBars(notesToBarsWithoutFiller(notes, isPlaying, playingNote)))

const notesToBeats = notes =>
  notes.map(note => noteBeats[note.duration])

const arraySum = numbers =>
  numbers.reduce((total, value) => total + value, 0)

const notesBeatSum = notes => arraySum(notesToBeats(notes))

const indexBeforeSum = (numbers, sum) => {
  let index = 0
  let sumAtIndex = 0
  while (sumAtIndex <= sum) {
    sumAtIndex += numbers[index]
    index += 1
  }
  return index - 1
}

const indexAtOrAfterSum = (numbers, sum) => {
  let index = 0
  let sumAtIndex = 0
  while (sumAtIndex < sum) {
    sumAtIndex += numbers[index]
    index += 1
  }
  return index
}

const restToFillBeats = (beats) => {
  const rests = []
  let beatsToRemove = beats
  while (beatsToRemove > 0) {
    if (beatsToRemove >= 16) {
      rests.push({ note: 'REST', duration: '1' })
      beatsToRemove -= 16
    } else if (beatsToRemove >= 8) {
      rests.push({ note: 'REST', duration: '1/2' })
      beatsToRemove -= 8
    } else if (beatsToRemove >= 4) {
      rests.push({ note: 'REST', duration: '1/4' })
      beatsToRemove -= 4
    } else if (beatsToRemove >= 2) {
      rests.push({ note: 'REST', duration: '1/8' })
      beatsToRemove -= 2
    } else if (beats >= 1) {
      rests.push({ note: 'REST', duration: '1/16' })
      beatsToRemove -= 1
    }
  }
  return rests
}

const addNoteToNotes = (notes, addNoteTone, addNoteBeats, beatIndex) => {
  const note = {
    note: addNoteTone,
    duration: beatsToDuration(addNoteBeats),
  }
  const notesBeats = notesBeatSum(notes)
  if (beatIndex >= notesBeats) {
    // If note insert is after notes,
    // add enough rests to reach beatIndex, then add note
    return [...notes, ...restToFillBeats(beatIndex - notesBeats), note]
  }
  return notes.reduce((result, oldNote) => {
    const oldNoteBeats = noteBeats[oldNote.duration]
    const oldNoteEndBeat = result.oldBeats + oldNoteBeats
    let notesToAdd = []
    let fillerRests = []
    if (oldNoteEndBeat <= beatIndex) {
      // If oldNote ends at or before note starts,
      // add old note to new notes
      notesToAdd = [...notesToAdd, oldNote]
    } else if (result.oldBeats <= beatIndex && oldNoteEndBeat > beatIndex) {
      // If oldNote overlaps with note start,
      // add enough rests to reach beatIndex, then add note
      fillerRests = restToFillBeats(beatIndex - result.newBeats)
      notesToAdd = [...notesToAdd, ...fillerRests, note]
    } else if (result.oldBeats >= (beatIndex + addNoteBeats)) {
      // If oldNote starts after note finishes,
      // add enough rests to reach oldNote, then add oldNote
      fillerRests = restToFillBeats(result.oldBeats - result.newBeats)
      notesToAdd = [...notesToAdd, ...fillerRests, oldNote]
    }
    // If oldNote starts within note, add nothing
    return {
      oldBeats: result.oldBeats + oldNoteBeats,
      newBeats: result.newBeats + notesBeatSum(notesToAdd),
      notes: [...result.notes, ...notesToAdd],
    }
  }, { oldBeats: 0, newBeats: 0, notes: [] }).notes
}

export {
  noteBeats,
  colorMap,
  shapeMap,
  beatsToDuration,
  allTones,
  barFiller,
  notesToBarsWithoutFiller,
  allBars,
  fillBar,
  fullBars,
  notesToBars,
  notesToBeats,
  arraySum,
  notesBeatSum,
  indexBeforeSum,
  indexAtOrAfterSum,
  restToFillBeats,
  addNoteToNotes,
}
