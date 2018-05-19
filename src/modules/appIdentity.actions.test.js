import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import moxios from 'moxios'
import expect from 'expect'

import * as appIdActions from './appIdentity'
import { api } from '../services/NetworkService'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

beforeEach(() => {
  moxios.install(api)
})

afterEach(() => {
  moxios.uninstall()
})

describe('getAppIds actions', () => {
  it('dispatches GET_APP_ID_SUCCESS on success', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: [
          {
            name: 'new app',
            mnid: '12389123718237',
            privateKey: 'jaesi4j5tiajtfrwj4j',
            id: '5aff712c66f0b6e1315bc770',
          },
        ],
      })
    })

    const expectedActions = [
      { type: appIdActions.GET_APP_IDS_REQUEST },
      {
        type: appIdActions.GET_APP_IDS_SUCCESS,
        payload: [
          {
            name: 'new app',
            mnid: '12389123718237',
            privateKey: 'jaesi4j5tiajtfrwj4j',
            id: '5aff712c66f0b6e1315bc770',
          },
        ],
      },
    ]

    const store = mockStore()

    await store.dispatch(appIdActions.getAppIds())
    expect(store.getActions()).toEqual(expectedActions)
  })

  it('dispatches GET_APP_ID_FAILURE', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 500,
        response: { error: 'server error' },
      })
    })

    const expectedActions = [
      { type: appIdActions.GET_APP_IDS_REQUEST },
      {
        type: appIdActions.GET_APP_IDS_FAILURE,
        payload: new Error('Request failed with status code 500'),
      },
    ]

    const store = mockStore()

    await store.dispatch(appIdActions.getAppIds())
    expect(store.getActions()).toEqual(expectedActions)
  })
})
