// @flow
import React, { Component } from 'react'
import { render } from 'react-dom'

import ReactRadial from '../../src'

import Drawer from '@material-ui/core/Drawer'
import Slider from '@material-ui/lab/Slider'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

import Color from './Color'

type color = {
  r: number,
  g: number,
  b: number,
  a: number,
}

type Props = {
  classes: Object,
}

type State = {
  message: string,
  drawerOpen: boolean,
  sliderRadiusInner: number,
  sliderFirstRadius: number,
  sliderLastRadius: number,
  enterDuration: number,
  leaveDuration: number,
  hoverDuration: number,
  buttonCount: number,
  update: boolean,
  fill: color,
  displayColorPickerStroke: boolean,
  displayColorPickerFill: boolean,
  click?: [number, number],
}

class Demo extends Component<Props, State> {
  constructor () {
    super()
    this.state = {
      message: null,
      drawerOpen: true,
      sliderRadiusInner: 20,
      sliderFirstRadius: 120,
      sliderLastRadius: 180,
      enterDuration: 400,
      leaveDuration: 100,
      hoverDuration: 100,
      buttonCount: 5,
      update: false,
      fill: { r: 0, g: 0, b: 0, a: 0.8 },
      displayColorPickerStroke: false,
      displayColorPickerFill: false,
      click: undefined,
    }
  }

  arrayMaker = (count, value) => {
    const arr = []
    for (let i = 1; i <= count; i++) {
      const closureI = i
      switch (value) {
        case 'button':
          arr.push(value + closureI)
          break
        case 'function':
          arr.push(() => this.dummyFunction(closureI))
          break
        default:
          arr.push(value)
          break
      }
    }
    return arr
  }

  dummyFunction (i) {
    this.setState({
      message: `you've clicked button number ${i}!`,
      click: undefined,
    })
  }

  handleClickOutside = () => {
    this.setState({
      click: undefined,
    })
  }

  handleSlider = (event, value, key) => {
    this.setState({ [key]: value })
  }

  handleClick = (event) => {
    this.setState({
      click: [
        event.clientX - 300,
        event.clientY - 60,
      ],
    })
  }

  sliderMaker = (array) => (
    array.map((ob, i) =>
      <div key={i}>
        <Typography>{`${ob.title}: ` + this.state[ob.value]}</Typography>
        <Slider
          min={ob.min}
          max={ob.max}
          step={ob.step}
          value={this.state[ob.value]}
          onChange={(event, value) => this.handleSlider(event, value, ob.value)}
          classes={{
            container: this.props.classes.slider,
          }}
        />
      </div>
    )
  )
  colorHandleClick = (key) => {
    this.setState({ [key]: !this.state[key] })
  };

  colorHandleClose = (key) => {
    this.setState({ [key]: false })
  };

  colorHandleChange = (color, key) => {
    this.setState({ [key]: color.rgb })
  };

  render () {
    const {
      classes,
    } = this.props

    const codeOb = {
      fill: `rgba(${this.state.fill.r},${this.state.fill.g},${this.state.fill.b},${this.state.fill.a})`,
      buttons: `[
        {
          id: 'button1',
          label: 'button1',
          onClick: () => console.log('Clicked button 1'),
        },
        ...
      ]`,
      innerRadius: this.state.sliderRadiusInner,
      firstOuterRadius: this.state.sliderFirstRadius,
      lastOuterRadius: this.state.sliderLastRadius,
      enterDuration: this.state.enterDuration,
      leaveDuration: this.state.leaveDuration,
      hoverDuration: this.state.hoverDuration,
    }

    const buttons = this.arrayMaker(this.state.buttonCount, 'button').map(buttonLabel => {
      return {
        label: buttonLabel,
        id: buttonLabel,
        onClick: () => undefined,
      }
    })

    return <div className={classes.root}>
      <AppBar
        position='fixed'
        className={classes.appBar}
        style={{ background: codeOb.fill }}
      >
        <Toolbar>
          <Typography variant='h6' color='inherit' noWrap inline>react-radial demo</Typography>
          <div className={classes.grow}>
            <a href='https://github.com/motius/react-radial' target='_blank'>
              <Typography variant='h6' color='inherit' noWrap inline>
                GitHub
              </Typography>
            </a>
            <span style={{ paddingLeft: '10px', paddingRight: '10px' }}>|</span>
            <a href='https://motius.de' target='_blank'>
              <Typography variant='h6' color='inherit' noWrap inline>
                Motius
              </Typography>
            </a>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant='permanent'
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor='left'
      >
        <div style={{ width: '75%', margin: '0 auto', marginTop: '30px', fontSize: '12px', padding: '0px' }}>
          <Typography variant='h6'>react-radial Parameters</Typography>
          <div style={{ marginBottom: '40px' }}>
            <Typography variant='h6'>Geometry</Typography>
            {this.sliderMaker(geoArray)}
          </div>
          <div style={{ marginBottom: '40px' }}>
            <Typography variant='h6'>Color</Typography>
            <div style={{ width: '100%' }}>
              <div style={{ marginTop: '15px', marginBottom: '15px' }}>Fill Color</div>
              <Color
                handleClick={this.colorHandleClick}
                handleClose={this.colorHandleClose}
                handleChange={this.colorHandleChange}
                enabled={this.state.displayColorPickerFill}
                color={this.state.fill}
                param='fill'
                view='displayColorPickerFill'
              />
            </div>
          </div>
          <Typography variant='h6'>Time</Typography>
          {this.sliderMaker(timeArray)}
        </div>
        <div className={classes.codeBlock}>
          <code>
            {`<ReactRadial
              cx={/*TODO*/}
              cy={/*TODO*/}
              ` + Object.keys(codeOb).map(key => (
              key === 'fill'
                ? `${key}={"${(codeOb[key])}"}`
                : `${key}={${(codeOb[key])}}`)
            ).join('\n') + `\n/>`}
          </code>
        </div>
      </Drawer>
      <main className={classes.content} onClick={this.handleClick}>
        {this.state.click && (
          <ReactRadial
            cx={this.state.click[0]}
            cy={this.state.click[1]}
            fill={`rgba(${this.state.fill.r}, ${this.state.fill.g}, ${this.state.fill.b}, ${this.state.fill.a})`}
            innerRadius={this.state.sliderRadiusInner}
            firstOuterRadius={this.state.sliderFirstRadius}
            lastOuterRadius={this.state.sliderLastRadius}
            buttons={buttons}
            hoverShift={10}
            onClickOutside={this.handleClickOutside}
            enterDuration={this.state.enterDuration}
            leaveDuration={this.state.leaveDuration}
            hoverDuration={this.state.hoverDuration}
          />
        )}
      </main>
    </div >
  }
}

const geoArray = [
  {
    title: 'Button Count',
    value: 'buttonCount',
    min: 2,
    max: 20,
    step: 1,
  },
  {
    title: 'Inner Radius',
    value: 'sliderRadiusInner',
    min: 1,
    max: 300,
    step: 1,
  },
  {
    title: 'First Outer Radius',
    value: 'sliderFirstRadius',
    min: 1,
    max: 300,
    step: 1,
  },
  {
    title: 'Last Outer Radius',
    value: 'sliderLastRadius',
    min: 1,
    max: 300,
    step: 1,
  },
]

const timeArray = [
  {
    value: 'enterDuration',
    title: 'Enter Duration',
    min: 0,
    max: 1600,
    step: 1,
  },
  {
    value: 'leaveDuration',
    title: 'Leave Duration',
    min: 0,
    max: 1600,
    step: 1,
  },
  {
    value: 'hoverDuration',
    title: 'Hover Duration',
    min: 0,
    max: 1600,
    step: 1,
  },
]

const drawerWidth = 300

const styles = theme => ({
  root: {
    display: 'flex',
    height: '100vh',
  },
  grow: {
    flex: 1,
    textAlign: 'right',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    height: `calc(100% - ${theme.mixins.toolbar.minHeight + theme.spacing.unit + 4}px)`,
    position: 'relative',
    top: theme.mixins.toolbar.minHeight + theme.spacing.unit,
    boxSizing: 'border-box',
  },
  codeBlock: {
    padding: '15px',
    whiteSpace: 'pre-line',
  },
  slider: {
    marginTop: '10px',
    marginBottom: '10px',
  },
})

const StyledDemo = withStyles(styles)(Demo)

render(<StyledDemo />, document.querySelector('#demo'))
