import React from 'react'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import RequireAuth from './RequireAuth'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('RequireAuth', () => {
  it('should render the composed component', () => {
    const Component = RequireAuth(<div />, '/')
    const wrapper = shallow(
      <Provider store={mockStore({})}>
        <Component />
      </Provider>
    )
    expect(wrapper.exists()).toEqual(true)
  })

  // TODO: it('should redirect when a user is not logged in', () => {})
  // TODO: it('should redirect when a user does not have the correct permissions', () => {})
  // TODO: it('should not redirect when a user is logged in', () => {})
  // TODO: it('should refresh login if user auth info is stored locally', () => {})
})
