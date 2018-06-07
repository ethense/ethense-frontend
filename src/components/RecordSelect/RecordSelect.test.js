import React from 'react'
import { RecordSelect } from './RecordSelect'

const defaultProps = {}

const getShallowComponent = props =>
  shallow(<RecordSelect {...defaultProps} {...props} />)

describe('Record selection component', () => {
  it('should render', () => {
    const component = getShallowComponent()
    expect(component.exists()).toBe(true)
  })
})
