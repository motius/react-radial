/* eslint-env jest */
import { polarToCartesian } from './ArcSegment'

describe('polar to cartesian', () => {
  // Remember - svg coordinates have y "upside down" from a maths point of view
  it('should place 0 radians at the top', () => {
    const result = polarToCartesian(0, 0, 1, 0)
    expect(result.x).toBeCloseTo(0)
    expect(result.y).toBeCloseTo(-1)
  })

  it('should place π/2 at the right', () => {
    const result = polarToCartesian(0, 0, 1, Math.PI / 2)
    expect(result.x).toBeCloseTo(1)
    expect(result.y).toBeCloseTo(0)
  })

  it('should place π at the bottom', () => {
    const result = polarToCartesian(0, 0, 1, Math.PI)
    expect(result.x).toBeCloseTo(0)
    expect(result.y).toBeCloseTo(1)
  })

  it('should place 3π/2 at the left', () => {
    const result = polarToCartesian(0, 0, 1, 3 * Math.PI / 2)
    expect(result.x).toBeCloseTo(-1)
    expect(result.y).toBeCloseTo(0)
  })

  it('should place π/4 at the top right', () => {
    const result = polarToCartesian(0, 0, 1, Math.PI / 4)
    expect(result.x).toBeCloseTo(Math.sqrt(2) / 2)
    expect(result.y).toBeCloseTo(-Math.sqrt(2) / 2)
  })
})
