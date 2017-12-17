import PropTypes from 'prop-types'
import React from 'react'

import Selector from '../containers/selector'
import Shape from '../svg/shape.svg'


const ShapeSelector = ({ value, changeHandler }) => {
  const displayOption = (shape, clickHandler) => (
    <Shape key={shape} shape={shape} clickHandler={clickHandler} />
  )
  return (
    <Selector
      value={value}
      options={[
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
        20, 21
      ]}
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
