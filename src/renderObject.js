import { describeArc, describeArcRegion } from './util/svghelper'

export const renderObject = (data, i) => {
  const { cx, cy, radius, angleStart, angleEnd, key, fill, strokeWidth, radiusDiff, stroke, text } = data
  return ({
    g: {
      // parent svg group
      fillOpacity: 0.6,
      key,
      id: 'arc' + text,
      style: {
        transform: `translate(${strokeWidth}px,${strokeWidth}px)`,
      },
    },
    region: {
      // main pie slice
      d: [describeArcRegion(cx, cy, radius, radius + radiusDiff, angleStart, angleEnd)],
      style: {
        fill,
        strokeWidth,
        stroke,
      },
    },
    arc: {
      // smaller outside arc to set path for text
      d: [describeArc(cx, cy, radius + radiusDiff * 0.8, angleStart, angleEnd)],
      style: { opacity: 1e-6 },
      id: angleStart,
    },
    text: {
      // main text tag
      textAnchor: 'middle',
      fontFamily: 'sans-serif',
    },
    textPath: {
      // each line of text
      fontWeight: 100,
      fill: stroke,
      startOffset: '50%',
      xlinkHref: '#' + angleStart,
      // this matches the arc id (above)
    },
  })
}
