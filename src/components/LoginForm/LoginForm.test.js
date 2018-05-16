import React from 'react'
import ReactDOM from 'react-dom'
import { LoginForm } from './LoginForm'
import * as constants from './LoginForm'

const defaultProps = {
  usersExist: true,
  getUsersExist: () => {},
  createAdmin: () => {},
  login: () => {},
}

describe('LoginForm', () => {
  it('should render with the correct elements', () => {
    const component = shallow(
      <LoginForm {...defaultProps} createAdmin={() => {}} />
    )
    expect(component.exists()).toEqual(true)
    expect(component.find('[data-test-id="emailInput"]').length).toEqual(1)
    expect(component.find('[data-test-id="passwordInput"]').length).toEqual(1)
    expect(component.find('[data-test-id="submitLogin"]').length).toEqual(1)
    expect(component.find('[data-test-id="toggleLoginMode"]').length).toEqual(1)
  })

  it('should call a function to see if any users exist', () => {
    const mockUsersExist = jest.fn()
    const component = shallow(
      <LoginForm {...defaultProps} getUsersExist={mockUsersExist} />
    )
    expect(mockUsersExist.mock.calls.length).toBe(1)
  })

  describe('Submit button', () => {
    it('should display "login" if users exist or "create admin" if they don\'t', () => {
      const component = shallow(<LoginForm {...defaultProps} />)
      expect(component.state().submitText).toBe(constants.SUBMIT_LOGIN)
      component.setProps({ usersExist: false })
      expect(component.state().submitText).toBe(constants.SUBMIT_CREATE)
      component.setProps({ usersExist: true })
      expect(component.state().submitText).toBe(constants.SUBMIT_LOGIN)
    })

    it("should call a function to create an admin if users don't exist", () => {
      const mockCreateAdmin = jest.fn()
      const component = shallow(
        <LoginForm {...defaultProps} usersExist={false} createAdmin={mockCreateAdmin} />
      )
      component.find('[data-test-id="submitLogin"]').simulate('click')
      expect(mockCreateAdmin.mock.calls.length).toBe(1)
    })

    it('should call a function to login if users exist', () => {
      const mockLogin = jest.fn()
      const component = shallow(
        <LoginForm {...defaultProps} login={mockLogin} />
      )
      component.find('[data-test-id="submitLogin"]').simulate('click')
      expect(mockLogin.mock.calls.length).toBe(1)
    })
  })

  describe('Toggle login mode button', () => {
    it('should display "login with uport" if users exist or "create with uport" if they don\'t', () => {
      const component = shallow(<LoginForm {...defaultProps} />)
      expect(component.state().toggleText).toBe(constants.TOGGLE_LOGIN_UPORT)
      component.setProps({ usersExist: false })
      expect(component.state().toggleText).toBe(constants.TOGGLE_CREATE_UPORT)
      component.setProps({ usersExist: true })
      expect(component.state().toggleText).toBe(constants.TOGGLE_LOGIN_UPORT)
    })
  })
})
