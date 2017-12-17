import React from 'react'

const SVG = ({children, className, width = '50px', height = '50px', viewBox = '0 0 100 100'}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    version="1.1"
    width={width}
    height={height}
    viewBox={viewBox}
  >
    {children}
  </svg>
)

export default SVG
