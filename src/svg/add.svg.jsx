import React from 'react'

import SVG from './svg'

const Add = () => (
  <SVG
    className="icon add-icon"
    viewBox="0 0 1200 1200"
  >
    <path
      className="primary"
      d="M 600,1200 C 268.65,1200 0,931.35 0,600 0,268.65 268.65,0 600,0 c 331.35,0 600,268.65 600,600 0,331.35 -268.65,600 -600,600 z"
      mask="url(#add-icon-clip)"
    />
    <mask id="add-icon-clip">
      <path
        d="M 600,1200 C 268.65,1200 0,931.35 0,600 0,268.65 268.65,0 600,0 c 331.35,0 600,268.65 600,600 0,331.35 -268.65,600 -600,600 z"
        fill="white"
      />
      <path
        d="M 525 350 L 675 350 L 675 850 L 525 850 Z"
      />
      <path
        d="M 350 525 L 850 525 L 850 675 L 350 675 Z"
      />
    </mask>
  </SVG>
)

export default Add
