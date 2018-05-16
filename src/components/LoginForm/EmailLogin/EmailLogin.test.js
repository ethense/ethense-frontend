import React from 'react'
import { EmailLogin } from './EmailLogin'

const defaultProps = {
  submitText: 'login',
  onSubmit: () => {},
  handleSubmit: fn => fn(),
}

describe('EmailLogin', () => {
  describe('Inputs', () => {
    let component
    beforeEach(() => {
      component = shallow(<EmailLogin {...defaultProps} />)
    })

    it('should have an email field', () => {
      expect(component.find('[data-test-id="emailInput"]').length).toEqual(1)
    })

    it('should have a password input', () => {
      const passwordInput = component.find('[data-test-id="passwordInput"]')
      expect(passwordInput.length).toEqual(1)
      expect(passwordInput.props().type).toEqual('password')
    })

    it('should have a submit button', () => {
      const passwordInput = component.find('[data-test-id="passwordInput"]')
      expect(passwordInput.length).toEqual(1)
      expect(passwordInput.props().type).toEqual('password')
    })
  })

  it('should call onSubmit when the form submits', () => {
    const mockOnSubmit = jest.fn()
    const component = shallow(
      <EmailLogin {...defaultProps} onSubmit={mockOnSubmit} />
    )
    component.find('form').simulate('submit')
    expect(mockOnSubmit.mock.calls.length).toBe(1)
  })
})
