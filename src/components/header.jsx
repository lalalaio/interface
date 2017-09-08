import PropTypes from 'prop-types'
import React from 'react'
import Add from '../svg/add.svg'

const Header = ({ editHandler }) => (
  <div>
    <nav>
      <a href="#&#43;" onClick={editHandler}>
        <Add />
      </a>
    </nav>
  </div>
)

Header.propTypes = {
  editHandler: PropTypes.func.isRequired,
}

export default Header
