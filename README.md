# react-radial

Forked from [original project](https://github.com/modelab/react-radial) by [Mode Lab](https://modelab.is)

## Intro

This is a straightforward, customizable radial menu, built with [React](https://facebook.github.io/react/).

The radial component is built with SVG, and can be ported into a div, canvas, WebGL scene, etc. The demo file is an interactive environment for defining how you want the radial menu to look.

## Getting Started

NPM package coming soon

Load the component into your app
```
import React, { Component } from 'react'
import ReactRadial from 'react-radial'

class Component extends Component {
  render () {
    return <ReactRadial {/* props */} />
  }
}
```

In contrast to the original component, this version needs to be told where to draw (the idea being it will be centered on clickable elements, with their own properties for the menu)

## Props

| Name          | Type                                                     | Description                                          |
| ------------- | -------------------------------------------------------- | ---------------------------------------------------- |
| cx            | number                                                   | x position enter of the circle, in pixels            |
| cx            | number                                                   | y position enter of the circle, in pixels            |
| fill          | string                                                   | rgba(...) string for the fill colour of the segments |
| buttons       | Array<{ id: string, label: Element, onClick: function }> | An array of buttons, with all of their behaviour     |
| innerRadius   | number                                                   | donut hole size                                      |
| outerRadius   | number                                                   | radius of the outer edge of the first segment        |
| enterDuration | number                                                   | duration of the enter animation                      |
| leaveDuration | number                                                   | duration of the leave animation                      |
| hoverDuration | number                                                   | duration of the hover animation                      |
