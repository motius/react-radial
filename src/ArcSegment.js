// @flow
import React, { Component } from 'react'

export const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInRadians: number): { x: number, y: number } => {
  return {
    x: centerX + (radius * Math.sin(angleInRadians)),
    y: centerY - (radius * Math.cos(angleInRadians)),
  }
}

export const describeArcRegion = (x: number, y: number, radiusA: number, radiusB: number, startAngle: number, endAngle: number): string => {
  var startA = polarToCartesian(x, y, radiusA, endAngle)
  var endA = polarToCartesian(x, y, radiusA, startAngle)
  var startB = polarToCartesian(x, y, radiusB, endAngle)
  var endB = polarToCartesian(x, y, radiusB, startAngle)

  return `
    M ${startA.x} ${startA.y}
    A ${radiusA} ${radiusA} 0 0 0 ${endA.x} ${endA.y}
    L ${endB.x} ${endB.y}
    A ${radiusB} ${radiusB} 0 0 1 ${startB.x} ${startB.y}
    L ${startB.x} ${startB.y}
  `
}

type Props = {
  x: number,
  y: number,
  innerRadius: number,
  outerRadius: number,
  startAngle: number,
  endAngle: number,
  onClick: Function,
  onMouseEnter: Function,
  onMouseLeave: Function,
  fill: string,
}

class ArcSegment extends Component<Props> {
  render () {
    const {
      x,
      y,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      onClick,
      onMouseEnter,
      onMouseLeave,
      fill,
    } = this.props

    const regionPath = describeArcRegion(x, y, innerRadius, outerRadius, startAngle, endAngle)
    return (
      <g
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <path d={regionPath} style={{
          cursor: 'pointer',
          fill: fill,
        }} />
      </g>
    )
  }
}

export default ArcSegment
