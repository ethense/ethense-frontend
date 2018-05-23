import React from 'react'
import { UserDialog } from './UserDialog'

const defaultProps = {
  onSubmit: () => {},
  handleSubmit: fn => fn(),
}

const getShallowComponent = props =>
  shallow(<UserDialog {...defaultProps} {...props} />)

describe('User Dialog', () => {
  it('should render', () => {
    const component = getShallowComponent()
    expect(component.exists()).toBe(true)
  })
})
