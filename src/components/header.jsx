import PropTypes from 'prop-types'
import React from 'react'
import Add from '../svg/add.svg'

const Header = ({ editHandler }) => (
  <div>
    <nav>
      <a onClick={editHandler} role="button" tabIndex="0">
        <Add />
      </a>
    </nav>
  </div>
)

Header.propTypes = {
  editHandler: PropTypes.func.isRequired,
}

export default Header
