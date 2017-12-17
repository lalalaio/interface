import PropTypes from 'prop-types'
import React from 'react'

import ColorSelector from '../components/color-selector'
import ShapeSelector from '../components/shape-selector'
import IdentityDisplay from '../svg/identity-display.svg'

class IdentityForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      shapes: [17,14,15,16,5,4,3,2,1],
      foregrounds: [0,0,0,0,0,0,0,0,0],
      shapeValue: 0,
      foregroundValue: 0,
    }
    this.setForegroundValue = this.setForegroundValue.bind(this)
    this.setShapeValue = this.setShapeValue.bind(this)
    this.setDisplayPart = this.setDisplayPart.bind(this)
  }

  setForegroundValue(value) {
    this.setState({ foregroundValue: parseInt(value) })
  }

  setShapeValue(value) {
    this.setState({ shapeValue: parseInt(value) })
  }

  setDisplayPart(x, y) {
    const index = x + (y * 3)
    this.setState((prevState) => {
      const { foregrounds, shapes } = prevState
      foregrounds[index] = prevState.foregroundValue
      shapes[index] = prevState.shapeValue
      return { foregrounds, shapes }
    })
  }

  render() {
    const {shapes, foregrounds} = this.state

    return (
      <div className="identity-form">
        <IdentityDisplay
          shapes={shapes}
          foregrounds={foregrounds}
          clickHandler={this.setDisplayPart}
        />
        <ColorSelector
          value={this.state.foregroundValue}
          changeHandler={this.setForegroundValue}
        />
        <ShapeSelector
          value={this.state.shapeValue}
          changeHandler={this.setShapeValue}
        />
      </div>
    )
  }
}

export default IdentityForm
