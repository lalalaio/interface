import PropTypes from 'prop-types'
import Bar from './bar.jsx'
import Play from '../svg/play.svg.jsx'
import noteBeats from '../util.js'

const Post = ({post, playHandler}) => {
  let bars = post.notes.reduce((bars, note) => {
    Array(noteBeats[note.duration]).fill('').map((_, index) => {
      const barNote = {'note': note.note}
      if (index === 0) {
        barNote.start = true
      }
      if (index + 1 === noteBeats[note.duration]) {
        barNote.end = true
      }
      bars[bars.length-1].push(barNote)
      if (bars[bars.length-1].length == 16) {
        bars.push([])
      }
    })
    return bars
  }, [[]])
  bars = [...bars, ...Array(8).fill([])].slice(0, 8)
  bars = bars.map(bar => {
    return [...bar, ...Array(16).fill({'note': 'REST'})].slice(0, 16)
  })
  const barList = bars.map((notes, index) =>
    <Bar key={index} notes={notes} index={index} />
  )
  const postPlayHandler = event => {
    event.stopPropagation()
    playHandler(event, post)
  }
  return (
    <div className="post" data-uuid={post.uuid}>
      <div className="icon">
        <a
          href="#"
          className="playButton"
          onClick={postPlayHandler}>
            <Play />
          </a>
      </div>
      <div className="notes">
        {barList}
      </div>
    </div>
  )
}

Post.propTypes = {
  post: PropTypes.object,
  playHandler: PropTypes.func
}

export default Post
