import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import moxios from 'moxios'
import expect from 'expect'
import * as actions from './authentication'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

beforeEach(() => {
  moxios.install()
})

  afterEach(() => {
    moxios.uninstall()
  })

describe('getUsersExist actions', () => {
  it('dispatches USERS_EXIST_SUCCESS on success', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: { usersExist: false },
      })
    })

    const expectedActions = [
      { type: actions.USERS_EXIST_REQUEST },
      { type: actions.USERS_EXIST_SUCCESS, payload: { usersExist: false } },
    ]

    const store = mockStore()

    await store.dispatch(actions.getUsersExist())
    expect(store.getActions()).toEqual(expectedActions)
  })

  it('dispatches USERS_EXIST_FAILURE on failure', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 500,
        response: { error: "server error" },
      })
    })

    const expectedActions = [
      { type: actions.USERS_EXIST_REQUEST },
      { type: actions.USERS_EXIST_FAILURE, payload: new Error('Request failed with status code 500') },
    ]

    const store = mockStore()

    await store.dispatch(actions.getUsersExist())
    expect(store.getActions()).toEqual(expectedActions)
  })
})

describe('createAdmin actions', () => {
  it('dispatches CREATE_ADMIN_SUCCESS on success', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: {/* ... */},
      })
    })

    const expectedActions = [
      { type: actions.CREATE_ADMIN_REQUEST },
      { type: actions.CREATE_ADMIN_SUCCESS, payload: {/* ... */}}
    ]

    const store = mockStore()

    await store.dispatch(actions.createAdmin('email@valid.com', 'password'))
    expect(store.getActions()).toEqual(expectedActions)
  })

  it('dispatches CREATE_ADMIN_FAILURE on failure', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 500,
        response: { error: "server error" },
      })
    })

    const expectedActions = [
      { type: actions.CREATE_ADMIN_REQUEST },
      { type: actions.CREATE_ADMIN_FAILURE, payload: new Error('Request failed with status code 500')}
    ]

    const store = mockStore()

    await store.dispatch(actions.createAdmin('email', 'password'))
    expect(store.getActions()).toEqual(expectedActions)
  })
})
