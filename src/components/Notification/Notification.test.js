import React from 'react'
import Notification from './Notification'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Notification', () => {
  it('should render', () => {
    const store = mockStore({
      notification: {
        open: false,
        message: 'test',
      },
    })
    const component = mount(
      <Provider store={store}>
        <Notification />
      </Provider>
    )
    expect(component.exists()).toBe(true)
  })
})
