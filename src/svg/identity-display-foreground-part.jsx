import React from 'react'
import PropTypes from 'prop-types'
import { colorMap } from '../util'

const IdentityDisplayForegroundPart = ({ size, x, y, shape, foreground }) => {
  const xEnd = x + size
  const xMid = x + (size / 2)
  const yEnd = y + size
  const yMid = y + (size / 2)
  const start = `${x},${y}`
  const end = `${xEnd},${yEnd}`
  const mid = `${xMid},${yMid}`
  const leftDown = `${x},${yEnd}`
  const rightUp = `${xEnd},${y}`
  const downMid = `${xMid},${yEnd}`
  const upMid = `${xMid},${y}`
  const leftMid = `${x},${yMid}`
  const rightMid = `${xEnd},${yMid}`
  const shapeMap = {
    // Full
    0: `M ${start} ${rightUp} ${end} ${leftDown} Z`,
    // Triangle halves
    1: `M ${leftDown} ${end} ${rightUp} Z`,
    2: `M ${start} ${leftDown} ${end} Z`,
    3: `M ${start} ${leftDown} ${rightUp} Z`,
    4: `M ${start} ${end} ${rightUp} Z`,
    // Rectangle halves
    5: `M ${start} ${upMid} ${downMid} ${leftDown} Z`,
    6: `M ${start} ${rightUp} ${rightMid} ${leftMid} Z`,
    7: `M ${upMid} ${rightUp} ${end} ${downMid} Z`,
    8: `M ${leftMid} ${rightMid} ${end} ${leftDown} Z`,
    // Quarter circles
    9: `M ${leftDown} Q ${x} ${y} ${xEnd} ${y} L ${end} Z`,
    10: `M ${start} Q ${xEnd} ${y} ${xEnd} ${yEnd} L ${leftDown} Z`,
    11: `M ${rightUp} Q ${xEnd} ${yEnd} ${x} ${yEnd} L ${start} Z`,
    12: `M ${end} Q ${x} ${yEnd} ${x} ${y} L ${rightUp} Z`,
    // Quarter squares
    13: `M ${start} ${upMid} ${mid} ${leftMid} Z`,
    14: `M ${upMid} ${rightUp} ${rightMid} ${mid} Z`,
    15: `M ${mid} ${rightMid} ${end} ${downMid} Z`,
    16: `M ${leftMid} ${mid} ${downMid} ${leftDown} Z`,
    // Inverse quarter squares
    17: `M ${upMid} ${rightUp} ${end} ${leftDown} ${leftMid} ${mid} Z`,
    18: `M ${rightMid} ${end} ${leftDown} ${start} ${upMid} ${mid} Z`,
    19: `M ${downMid} ${leftDown} ${start} ${rightUp} ${rightMid} ${mid} Z`,
    20: `M ${leftMid} ${start} ${rightUp} ${end} ${downMid} ${mid} Z`,
  }
  if (shape === 21) {
    // Circle
    return (
      <circle cx={xMid} cy={yMid} r={(size / 2)} fill={colorMap[foreground]} />
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
