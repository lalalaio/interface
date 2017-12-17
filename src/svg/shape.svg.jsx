import React from 'react'
import PropTypes from 'prop-types'

import IdentityDisplayForegroundPart from './identity-display-foreground-part'
import SVG from './svg'
import ClickableSquare from './clickable-square'

const Shape = ({ shape, clickHandler }) => (
  <SVG
    className="identity-display"
    height="16px"
    width="16px"
    viewBox="0 0 16 16"
  >
    <IdentityDisplayForegroundPart
      size={16}
      x={0}
      y={0}
      shape={shape}
      foreground={0}
    />
    <ClickableSquare
      size={16}
      x={0}
      y={0}
      clickHandler={() => { clickHandler(shape) }}
    />
  </SVG>
)

Shape.propTypes = {
  shape: PropTypes.number.isRequired,
  clickHandler: PropTypes.func.isRequired,
}

export default Shape
