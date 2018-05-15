import React from 'react'
import ReactDOM from 'react-dom'
import { LoginForm } from './LoginForm'

describe('LoginForm', () => {
  it('Should render with the correct elements', () => {
    const component = shallow(<LoginForm getUsersExist={() => {}} />)
    expect(component.exists()).toEqual(true)
    expect(component.find('[data-test-id="emailInput"]').length).toEqual(1)
    expect(component.find('[data-test-id="passwordInput"]').length).toEqual(1)
    expect(component.find('[data-test-id="submitLogin"]').length).toEqual(1)
    expect(component.find('[data-test-id="toggleLoginMode"]').length).toEqual(1)
  })

  it('Should call a function to see if any users exist', () => {
    const mockUsersExist = jest.fn()
    const component = mount(<LoginForm getUsersExist={mockUsersExist} />)
    expect(mockUsersExist.mock.calls.length).toBe(1)
  })
})
