import React from 'react'
import styled from 'styled-components'
import LoginForm from '../LoginForm/LoginForm'

const FullWindow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`

const App = () => (
  <FullWindow>
    <LoginForm />
  </FullWindow>
)

export default App