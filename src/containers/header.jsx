import React from 'react'
import PropTypes from 'prop-types'
import Add from '../svg/add.svg.jsx'

class Header extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <nav>
        <a href="#">
          <Add />
        </a>
      </nav>
    )
  }

}

Header.propTypes = {
}

export default Header
