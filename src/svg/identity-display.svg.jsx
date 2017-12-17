import React from 'react'
import PropTypes from 'prop-types'

import IdentityDisplayForegroundPart from './identity-display-foreground-part'
import ClickableSquare from './clickable-square'

import SVG from './svg'

const IdentityDisplay = ({ shapes, foregrounds, clickHandler }) => {
  const size = 30
  const rows = 3
  const viewBox = `0 0 ${size * rows} ${size * rows}`
  const foregroundList = shapes.map((shape, index) => {
    const x = index % rows
    const y = Math.floor(index / rows)
    return (
      <IdentityDisplayForegroundPart
        key={`${x}-${y}`}
        size={size}
        x={size * x}
        y={size * y}
        shape={shape}
        foreground={foregrounds[index]}
      />
    )
  })
  const clickableList = shapes.map((shape, index) => {
    const x = index % rows
    const y = Math.floor(index / rows)
    return (
      <ClickableSquare
        key={`${x}-${y}`}
        size={size}
        x={size * x}
        y={size * y}
        clickHandler={() => { clickHandler(x, y) }}
      />
    )
  })
  return (
    <SVG
      className="identity-display"
      height="48px"
      width="48px"
      viewBox={viewBox}
    >
      {foregroundList}
      {clickableList}
    </SVG>
  )
}

IdentityDisplay.propTypes = {
  shapes: PropTypes.arrayOf(PropTypes.number).isRequired,
  foregrounds: PropTypes.arrayOf(PropTypes.number).isRequired,
  clickHandler: PropTypes.func.isRequired,
}

export default IdentityDisplay
