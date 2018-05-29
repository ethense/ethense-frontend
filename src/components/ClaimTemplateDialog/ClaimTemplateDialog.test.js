import React from 'react'
import { ClaimTemplateDialog } from './ClaimTemplateDialog'

const defaultProps = {
  onSubmit: () => {},
  handleSubmit: fn => fn(),
}

describe('Claim template dialog', () => {
  it('should render', () => {
    const component = shallow(<ClaimTemplateDialog {...defaultProps} />)
    expect(component.exists()).toBe(true)
  })
})
