import React from 'react'
import { AddAppIdDialog } from './AddAppIdDialog'

const defaultProps = {
  onSubmit: () => {},
  handleSubmit: fn => fn(),
}

describe('Add app id dialog', () => {
  it('should render', () => {
    const component = shallow(<AddAppIdDialog {...defaultProps} />)
    expect(component.exists()).toBe(true)
  })
})
