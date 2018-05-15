import React from 'react'
import ReactDOM from 'react-dom'
import LoginForm from './LoginForm'

describe('LoginForm', () => {
  it('Should render an email input and password input', () => {
    const component = shallow(<LoginForm />)
    expect(component.exists()).toEqual(true)
    expect(component.find('[data-test-id="emailInput"]').length).toEqual(1)
    expect(component.find('[data-test-id="passwordInput"]').length).toEqual(1)
    expect(component.find('[data-test-id="submitLogin"]').length).toEqual(1)
    expect(component.find('[data-test-id="toggleLoginMode"]').length).toEqual(1)
  })
})
