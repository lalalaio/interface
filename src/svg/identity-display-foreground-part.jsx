import React from 'react'
import PropTypes from 'prop-types'
import { colorMap } from '../util'

const IdentityDisplayForegroundPart = ({size, x, y, shape, foreground}) => {
  const shapeMap = {
    // Full
    0: `M ${x},${y} ${x+size},${y} ${x+size},${y+size} ${x},${y+size} Z`,
    // Triangle halves
    1: `M ${x},${y+size} ${x+size},${y+size} ${x+size},${y} Z`,
    2: `M ${x},${y} ${x},${y+size} ${x+size},${y+size} Z`,
    3: `M ${x},${y} ${x},${y+size} ${x+size},${y} Z`,
    4: `M ${x},${y} ${x+size},${y+size} ${x+size},${y} Z`,
    // Rectangle halves
    5: `M ${x},${y} ${x+(size/2)},${y} ${x+(size/2)},${y+size} ${x},${y+size} Z`,
    6: `M ${x},${y} ${x+size},${y} ${x+size},${y+(size/2)} ${x},${y+(size/2)} Z`,
    7: `M ${x+(size/2)},${y} ${x+size},${y} ${x+size},${y+size} ${x+(size/2)},${y+size} Z`,
    8: `M ${x},${y+(size/2)} ${x+size},${y+(size/2)} ${x+size},${y+size} ${x},${y+size} Z`,
    // Quarter circles
    9: `M ${x},${y+size} Q ${x} ${y} ${x+size} ${y} L ${x+size},${y+size} Z`,
    10: `M ${x},${y} Q ${x+size} ${y} ${x+size} ${y+size} L ${x},${y+size} Z`,
    11: `M ${x+size},${y} Q ${x+size} ${y+size} ${x} ${y+size} L ${x},${y} Z`,
    12: `M ${x+size},${y+size} Q ${x} ${y+size} ${x} ${y} L ${x+size},${y} Z`,
    // Quarter squares
    13: `M ${x},${y} ${x+(size/2)},${y} ${x+(size/2)},${y+(size/2)} ${x},${y+(size/2)} Z`,
    14: `M ${x+(size/2)},${y} ${x+size},${y} ${x+size},${y+(size/2)} ${x+(size/2)},${y+(size/2)} Z`,
    15: `M ${x+(size/2)},${y+(size/2)} ${x+size},${y+(size/2)} ${x+size},${y+size} ${x+(size/2)},${y+size} Z`,
    16: `M ${x},${y+(size/2)} ${x+(size/2)},${y+(size/2)} ${x+(size/2)},${y+size} ${x},${y+size} Z`,
    // Inverse quarter squares
    17: `M ${x+(size/2)},${y} ${x+size},${y} ${x+size},${y+size} ${x},${y+size} ${x},${y+(size/2)} ${x+(size/2)},${y+(size/2)} Z`,
    18: `M ${x+size},${y+(size/2)} ${x+size},${y+size} ${x},${y+size} ${x},${y} ${x+(size/2)},${y} ${x+(size/2)},${y+(size/2)} Z`,
    19: `M ${x+(size/2)},${y+size} ${x},${y+size} ${x},${y} ${x+size},${y} ${x+size},${y+(size/2)} ${x+(size/2)},${y+(size/2)} Z`,
    20: `M ${x},${y+(size/2)} ${x},${y} ${x+size},${y} ${x+size},${y+size} ${x+(size/2)},${y+size} ${x+(size/2)},${y+(size/2)} Z`,
  }
  if (shape === 21) {
    // Circle
    return (
      <circle cx={x+(size/2)} cy={y+(size/2)} r={(size/2)} fill={colorMap[foreground]} />
    )
  }
  return (
    <path d={shapeMap[shape]} fill={colorMap[foreground]} />
  )
}

IdentityDisplayForegroundPart.propTypes = {
  size: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  shape: PropTypes.number.isRequired,
  foreground: PropTypes.number.isRequired,
}

export default IdentityDisplayForegroundPart
