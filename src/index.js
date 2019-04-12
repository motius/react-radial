// @flow
import React, { Component } from 'react'
import ArcSegment, { polarToCartesian } from './ArcSegment'
import { Animate } from 'react-move'
import type { Element } from 'react'

type buttonValue = {
  startAngle: number,
  endAngle: number,
  segmentOuterRadius: number,
  x: number,
  y: number,
}

type radialButtonLink = {
  label: Element<any>,
  onClick: Function,
  id: string,
}

type Props = {
  cx: number,
  cy: number,
  innerRadius: number,
  outerRadius: number,
  buttons: Array<radialButtonLink>,
  onClickOutside: Function,
  hoverShift: number,
}

type State = {
  hovered?: string,
  show: boolean,
  buttonValues: Array<buttonValue>,
}

const enterDuration = 500
const leaveDuration = 100
const hoverDuration = 100

const getAnimationSpec = (hoverShift) => ({
  start: {
    enter: 0,
    hover: 0,
  },
  enter: {
    enter: [1],
    hover: 0,
    timing: {
      duration: enterDuration,
    },
  },
  update: [
    {
      enter: [1],
      timing: {
        duration: enterDuration,
      },
    },
    {
      hover: [hoverShift],
      timing: {
        duration: hoverDuration,
      },
    },
  ],
  leave: [
    {
      enter: [0],
      timing: {
        duration: leaveDuration,
      },
    },
    {
      hover: [0],
      timing: {
        duration: hoverDuration,
      },
    },
  ],
})

const getDrawingConstants = (props: Props): Array<buttonValue> => {
  const {
    cx,
    cy,
    buttons,
    outerRadius,
  } = props

  const anglePerButton = 2 * Math.PI / buttons.length
  return buttons.map((button, index) => {
    const startAngle = anglePerButton * index
    const endAngle = anglePerButton * (index + 1)
    const halfAngle = (endAngle + startAngle) / 2
    const segmentOuterRadius = outerRadius + index * 10
    const { x, y } = polarToCartesian(cx, cy, 2, halfAngle)

    return {
      startAngle,
      endAngle,
      segmentOuterRadius,
      x,
      y,
    }
  })
}

class ReactRadial extends Component<Props, State> {
  constructor (props) {
    super(props)
    this.state = {
      hovered: undefined,
      show: true,
      buttonValues: getDrawingConstants(props),
    }
  }

  componentDidMount () {
    this.resetDrawingConstants()
  }

  handleMouseEnter = (id) => () => {
    this.setState({ hovered: id })
  }

  handleMouseLeave = () => {
    this.setState({ hovered: undefined })
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.buttons.length !== this.props.buttons.length) {
      this.resetDrawingConstants()
    }
  }

  resetDrawingConstants = () => {
    this.setState({
      buttonValues: getDrawingConstants(this.props),
    })
  }

  render () {
    const {
      cx,
      cy,
      innerRadius,
      buttons,
      onClickOutside,
      hoverShift,
    } = this.props

    const {
      hovered,
      buttonValues,
    } = this.state

    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
        }}
        onClick={() => {
          this.setState({
            show: false,
          })
          setTimeout(onClickOutside, 500)
        }}
      >
        <svg
          style={{
            width: '100%',
            height: '100%',
          }}
        >
          {buttons.map((button, index) => {
            const {
              startAngle,
              endAngle,
              segmentOuterRadius,
              x,
              y,
            } = buttonValues[index]

            return (
              <Animate
                key={`${button.id}-arc`}
                {...getAnimationSpec(hovered === button.id ? hoverShift : 0)}
                show={this.state.show}
              >
                {(animationState) => {
                  return (
                    <ArcSegment
                      x={x}
                      y={y}
                      outerRadius={animationState.enter * segmentOuterRadius + animationState.hover}
                      innerRadius={innerRadius * animationState.enter}
                      startAngle={animationState.enter * startAngle}
                      endAngle={animationState.enter * endAngle}
                      onClick={button.onClick}
                      hovered={hovered === button.id}
                      onMouseEnter={this.handleMouseEnter(button.id)}
                      onMouseLeave={this.handleMouseLeave}
                    />
                  )
                }}
              </Animate>
            )
          })}
        </svg>
        {buttons.map((button, index) => {
          const {
            startAngle,
            endAngle,
            segmentOuterRadius,
          } = buttonValues[index]

          return (
            <Animate
              key={`${button.id}-label`}
              {...getAnimationSpec(hovered === button.id ? hoverShift : 0)}
              show={this.state.show}
            >
              {(animationState) => {
                const halfAngle = animationState.enter * (endAngle + startAngle) / 2
                const { x, y } = polarToCartesian(cx, cy, (animationState.enter * (innerRadius + segmentOuterRadius) + animationState.hover) / 2, halfAngle)
                const translatePercent = -50 / animationState.enter
                return (
                  <div
                    style={{
                      left: x,
                      top: y,
                      opacity: animationState.enter,
                      transform: `scale(${animationState.enter}, ${animationState.enter}) translate(${translatePercent}%, ${translatePercent}%)`,
                      position: 'absolute',
                      pointerEvents: 'none',
                      color: 'white',
                    }}
                  >
                    {button.label}
                  </div>
                )
              }}
            </Animate>
          )
        })}
      </div>
    )
  }
}

export default ReactRadial
