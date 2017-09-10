const noteBeats = {
  1: 16,
  '1/2': 8,
  '1/4': 4,
  '1/8': 2,
  '1/16': 1,
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

const notesBeforeBeat = (notes, beat) =>
  notes.slice(0, indexBeforeSum(notesToBeats(notes), beat))

const notesAfterBeat = (notes, beat) =>
  notes.slice(indexAtOrAfterSum(notesToBeats(notes), beat))

const restToFillBeats = (beats) => {
  const rests = []
  let beatsToRemove = beats
  let duration
  while (beatsToRemove > 0) {
    duration = beatsToDuration(beatsToRemove)
    rests.push({ note: 'REST', duration })
    beatsToRemove -= noteBeats[duration]
  }
  return rests
}

const notesBeforeAdd = (notes, beatIndex) => {
  const beforeNotes = notesBeforeBeat(notes, beatIndex)
  const neededBeforeBeats = beatIndex - notesBeatSum(beforeNotes)
  const fillerRestsBefore = restToFillBeats(neededBeforeBeats)
  return [...beforeNotes, ...fillerRestsBefore]
}

const notesAfterAdd = (notes, beatIndex, beforeNotes, addNoteBeats) => {
  const afterNotes = notesAfterBeat(notes, beatIndex + addNoteBeats)
  const afterBeats = notesBeatSum(afterNotes)
  if (afterBeats > 0) {
    const beforeAndNoteBeats = notesBeatSum(beforeNotes) + addNoteBeats
    const beatsWithoutRestsAfter = beforeAndNoteBeats + afterBeats
    const neededAfterBeats = notesBeatSum(notes) - beatsWithoutRestsAfter
    const fillerRestsAfter = restToFillBeats(neededAfterBeats)
    return [...fillerRestsAfter, ...afterNotes]
  }
  return afterNotes
}

const addNoteToNotes = (notes, addNoteTone, addNoteBeats, beatIndex) => {
  const note = {
    note: addNoteTone,
    duration: beatsToDuration(addNoteBeats),
  }
  const beforeNotes = notesBeforeAdd(notes, beatIndex)
  const afterNotes = notesAfterAdd(notes, beatIndex, beforeNotes, addNoteBeats)
  return [...beforeNotes, note, ...afterNotes]
}

export {
  noteBeats,
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
  notesBeforeBeat,
  notesAfterBeat,
  restToFillBeats,
  notesBeforeAdd,
  notesAfterAdd,
  addNoteToNotes,
}
