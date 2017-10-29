import {
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
  restToFillBeats,
  addNoteToNotes,
} from '../src/util'

const qC4 = {
  note: 'C4',
  duration: '1/4',
}

const hC4 = {
  note: 'C4',
  duration: '1/2',
}

const eD4 = {
  note: 'D4',
  duration: '1/8',
}

const sC4Beat = {
  note: 'C4',
  start: true,
  end: true,
  isPlaying: false,
}

const midC4Beat = {
  note: 'C4',
  isPlaying: false,
}

const hRest = {
  note: 'REST',
  duration: '1/2',
}

const sRest = {
  note: 'REST',
  duration: '1/16',
}

const eRest = {
  note: 'REST',
  duration: '1/8',
}

const wRest = {
  note: 'REST',
  duration: 1,
}

test("qC4 is { note: 'C4', duration: '1/4' }", () => {
  expect(qC4).toEqual({ note: 'C4', duration: '1/4' })
})

test("hC4 is { note: 'C4', duration: '1/2' }", () => {
  expect(hC4).toEqual({ note: 'C4', duration: '1/2' })
})

test("eD4 is { note: 'D4', duration: '1/8' }", () => {
  expect(eD4).toEqual({ note: 'D4', duration: '1/8' })
})

test("sC4Beat is { note: 'C4', start: true, end: true, isPlaying: false }", () => {
  expect(sC4Beat).toEqual({ note: 'C4', start: true, end: true, isPlaying: false })
})

test("midC4Beat is { note: 'C4', isPlaying: false }", () => {
  expect(midC4Beat).toEqual({ note: 'C4', isPlaying: false })
})

test("hRest is { note: 'REST', duration: '1/2' }", () => {
  expect(hRest).toEqual({ note: 'REST', duration: '1/2' })
})

test("sRest is { note: 'REST', duration: '1/16' }", () => {
  expect(sRest).toEqual({ note: 'REST', duration: '1/16' })
})

test("eRest is { note: 'REST', duration: '1/8' }", () => {
  expect(eRest).toEqual({ note: 'REST', duration: '1/8' })
})

test("noteBeats['1/4'] is 4", () => {
  expect(noteBeats['1/4']).toBe(4)
})

test("beatsToDuration(8) is '1/2'", () => {
  expect(beatsToDuration(8)).toBe('1/2')
})

test("beatsToDuration(5) is '1/2'", () => {
  expect(beatsToDuration(5)).toBe('1/2')
})

test("allTones[24] is 'C3'", () => {
  expect(allTones[24]).toBe('C3')
})

test("barFiller[5].note is 'REST'", () => {
  expect(barFiller[5].note).toBe('REST')
})

test("notesToBarsWithoutFiller(notes, false, 0) is bars", () => {
  const notes = [qC4, eD4]
  const bars = [
    [
      {
        note: 'C4',
        start: true,
        isPlaying: false,
      },
      midC4Beat,
      midC4Beat,
      {
        note: 'C4',
        end: true,
        isPlaying: false,
      },
      {
        note: 'D4',
        start: true,
        isPlaying: false,
      },
      {
        note: 'D4',
        end: true,
        isPlaying: false,
      }
    ]
  ]
  expect(notesToBarsWithoutFiller(notes, false, 0)).toEqual(bars)
})

test("allBars([[]]) is eightEmptyBars", () => {
  const eightEmptyBars = [
    [], [], [], [],
    [], [], [], [],
  ]
  expect(allBars([[]])).toEqual(eightEmptyBars)
})

test("fillBar([note]).length is 16", () => {
  const note =
  expect(fillBar([note]).length).toBe(16)
})

test("fillBar([sC4Beat])[5].note is 'REST'", () => {
  expect(fillBar([sC4Beat])[5].note).toBe('REST')
})

test("fullBars([[sC4Beat]])[0][5].note is 'REST'", () => {
  expect(fullBars([[sC4Beat]])[0][5].note).toBe('REST')
})

test("notesToBars([hC4], false, 0)[6][5].note is 'REST'", () => {
  expect(notesToBars([hC4], false, 0)[6][0].note).toBe('REST')
})

test("notesToBars([hC4], false, 0)[0][1] is midC4Beat", () => {
  expect(notesToBars([hC4], false, 0)[0][1]).toEqual(midC4Beat)
})

test("notesToBeats([hC4]) is [8]", () => {
  expect(notesToBeats([hC4])).toEqual([8])
})

test('arraySum([1, 2, 3]) is 6', () => {
  expect(arraySum([1, 2, 3])).toBe(6)
})

test("notesBeatSum([hC4, hC4]) is 16", () => {
  expect(notesBeatSum([hC4, hC4])).toBe(16)
})

test("indexBeforeSum([1, 7, 5, 3], 7) is 1", () => {
  expect(indexBeforeSum([1, 7, 5, 3], 7)).toBe(1)
})

test("indexBeforeSum([1, 7, 5, 3], 8) is 2", () => {
  expect(indexBeforeSum([1, 7, 5, 3], 8)).toBe(2)
})

test("indexBeforeSum([1, 7, 5, 3], 9) is 2", () => {
  expect(indexBeforeSum([1, 7, 5, 3], 9)).toBe(2)
})

test("indexBeforeSum([4, 4, 4, 4], 8) is 2", () => {
  expect(indexBeforeSum([4, 4, 4, 4], 8)).toBe(2)
})

test("indexBeforeSum([4, 4, 4, 4], 9) is 2", () => {
  expect(indexBeforeSum([4, 4, 4, 4], 9)).toBe(2)
})

test("restToFillBeats(8) is [hRest]", () => {
  expect(restToFillBeats(8)).toEqual([hRest])
})

test("restToFillBeats(10) is [hRest, eRest]", () => {
  expect(restToFillBeats(10)).toEqual([hRest, eRest])
})

test("addNoteToNotes([], 'C4', 4, 0) is [qC4]", () => {
  expect(addNoteToNotes([], 'C4', 4, 0)).toEqual([qC4])
})

test("restToFillBeats(1) is [sRest]", () => {
  expect(restToFillBeats(1)).toEqual([sRest])
})

test("addNoteToNotes([], 'C4', 4, 1) is [sRest, qC4]", () => {
  expect(addNoteToNotes([], 'C4', 4, 1)).toEqual([sRest, qC4])
})

test("addNoteToNotes([qC4], 'C4', 4, 1) is [sRest, qC4]", () => {
  expect(addNoteToNotes([qC4], 'C4', 4, 1)).toEqual([sRest, qC4])
})

test("addNoteToNotes([qC4], 'C4', 4, 4) is [qC4, qC4]", () => {
  expect(addNoteToNotes([qC4], 'C4', 4, 4)).toEqual([qC4, qC4])
})

test("notesBeatSum([]) is 0", () => {
  expect(notesBeatSum([])).toBe(0)
})

test("notesBeatSum([qC4, qC4]) is 8", () => {
  expect(notesBeatSum([qC4, qC4])).toBe(8)
})

test("addNoteToNotes([qC4, qC4], 'C4', 4, 2) is [eRest, qC4]", () => {
  expect(addNoteToNotes([qC4, qC4], 'C4', 4, 2)).toEqual([eRest, qC4])
})

test("addNoteToNotes([wRest, qC4], 'C4', 4, 2) is [eRest, qC4, hRest, eRest, qC4]", () => {
  expect(addNoteToNotes([wRest, qC4], 'C4', 4, 2)).toEqual([eRest, qC4, hRest, eRest, qC4])
})
