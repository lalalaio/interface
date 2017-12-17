import PropTypes from 'prop-types'
import React from 'react'

import Selector from '../containers/selector'
import Shape from '../svg/shape.svg'
import { colorMap } from '../util'


const ColorSelector = ({ value, changeHandler }) => {
  const displayOption = (colorIndex, clickHandler) => (
    <div
      key={colorIndex}
      className="color-option"
      style={{background: colorMap[colorIndex]}}
      onClick={() => { clickHandler(colorIndex) }}
    />
  )
  return (
    <Selector
      value={value}
      options={Object.keys(colorMap)}
      displayOption={displayOption}
      changeHandler={changeHandler}
    />
  )
}

ColorSelector.propTypes = {
  value: PropTypes.number.isRequired,
  changeHandler: PropTypes.func.isRequired,
}

export default ColorSelector
