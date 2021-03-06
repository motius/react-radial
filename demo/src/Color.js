// @flow
import React from 'react'
import { ChromePicker } from 'react-color'
import './style.css'

type colorType = {
  r: number,
  g: number,
  b: number,
  a: number,
}

type selectorColorType = {
  rgb: colorType,
}

type Props = {
  color: colorType,
  handleClick: (string) => void,
  handleChange: (selectorColorType, string) => void,
  enabled: boolean,
  param: string,
  view: string,
}

type State = {
  displayColorPicker: boolean,
  color: colorType,
}

class ChromePick extends React.Component<Props, State> {
  constructor (props: Props) {
    super(props)
    const { r, g, b, a } = props.color
    this.state = {
      displayColorPicker: false,
      color: { r, g, b, a },
    }
  }

  handleClick = () => {
    this.props.handleClick(this.props.view)
  };

  handleClose = () => {
    this.props.handleClick(this.props.view)
  };

  handleChange = (color: selectorColorType) => {
    this.props.handleChange(color, this.props.param)
  };

  render () {
    return (
      <div>
        <div
          style={{
            width: '100%',
            padding: '5px',
            background: '#fff',
            borderRadius: '1px',
            boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
            display: 'inline-block',
            cursor: 'pointer',
          }}
          onClick={this.handleClick}
        >
          <div style={{
            width: '100%',
            height: '8px',
            borderRadius: '2px',
            border: '1px solid black',
            background: `rgba(${this.props.color.r}, ${this.props.color.g}, ${this.props.color.b}, ${this.props.color.a})`,
          }} />
        </div>
        {this.props.enabled && (
          <div
            style={{
              position: 'absolute',
              zIndex: '2',
            }}
          >
            <div
              style={{
                position: 'fixed',
                top: '0px',
                right: '0px',
                bottom: '0px',
                left: '0px',
              }}
              onClick={this.handleClose}
            />
            <ChromePicker color={this.props.color} onChange={this.handleChange} />
          </div>
        )}

      </div>
    )
  }
}

export default ChromePick
