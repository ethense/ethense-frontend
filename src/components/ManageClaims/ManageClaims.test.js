import React from 'react'
import { ManageClaims } from './ManageClaims'

const defaultProps = {}

const getShallowComponent = props =>
  shallow(<ManageClaims {...defaultProps} {...props} />)

describe('Manage Claims page', () => {
  it('should render', () => {
    const component = getShallowComponent()
    expect(component.exists()).toBe(true)
  })
})
