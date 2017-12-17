import PropTypes from 'prop-types'
import React from 'react'

import Selector from '../containers/selector'
import Shape from '../svg/shape.svg'
import { shapeMap } from '../util'


const ShapeSelector = ({ value, changeHandler }) => {
  const displayOption = (shape, clickHandler) => (
    <Shape key={shape} shape={shape} clickHandler={clickHandler} />
  )
  return (
    <Selector
      value={value}
      options={Object.keys(shapeMap)}
      displayOption={displayOption}
      changeHandler={changeHandler}
    />
  )
}

ShapeSelector.propTypes = {
  value: PropTypes.number.isRequired,
  changeHandler: PropTypes.func.isRequired,
}

export default ShapeSelector
