import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

describe('App', () => {
  it('Should render without crashing', () => {
    const component = shallow(<App />)
    expect(component.exists()).toEqual(true)
  })
})
