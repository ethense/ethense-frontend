import reducer, * as actions from './appIdentity'
import expect from 'expect'

describe('appIdentity reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      identities: [],
      reading: false,
      error: null,
    })
  })

  it('should handle GET_APP_IDS_REQUEST', () => {
    expect(reducer(undefined, { type: actions.GET_APP_IDS_REQUEST })).toEqual({
      identities: [],
      reading: true,
      error: null,
    })
  })

  it('should handle GET_APP_IDS_SUCCESS', () => {
    expect(
      reducer(undefined, {
        type: actions.GET_APP_IDS_SUCCESS,
        payload: [{ name: 'name', mnid: '123', privateKey: 'abc' }],
      })
    ).toEqual({
      identities: [{ name: 'name', mnid: '123', privateKey: 'abc' }],
      reading: false,
      error: null,
    })
  })

  it('should handle GET_APP_IDS_FAILURE', () => {
    expect(
      reducer(undefined, {
        type: actions.GET_APP_IDS_FAILURE,
        payload: new Error('server error'),
      })
    ).toEqual({
      identities: [],
      reading: false,
      error: new Error('server error'),
    })
  })
})
