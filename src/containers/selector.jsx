import PropTypes from 'prop-types'
import React from 'react'

class Selector extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
    }
  }

  render() {
    const { value, options, displayOption, changeHandler } = this.props
    const optionList = options.map(value => displayOption(value, () => {
      this.setState({ open: false })
      changeHandler(value)
    }))
    if (this.state.open) {
      return (
        <div className="selector">
          <div className="options">
            {optionList}
          </div>
        </div>
      )
    }
    return (
      <div className="selector">
        <div className="selection">
          {displayOption(value, () => { this.setState({ open: true }) })}
        </div>
      </div>
    )
  }
}

Selector.propTypes = {
  value: PropTypes.number.isRequired,
  options: PropTypes.array.isRequired,
  displayOption: PropTypes.func.isRequired,
  changeHandler: PropTypes.func.isRequired
}

export default Selector
