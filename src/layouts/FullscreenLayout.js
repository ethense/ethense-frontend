import React from 'react'
import styled from 'styled-components'
import Notification from '../components/Notification'

const Fullscreen = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`

export const FullscreenLayout = ({ children, ...rest }) => {
  return (
    <Fullscreen>
      <Notification anchorOrigin={{ vertical: 'top', horizontal: 'center' }} />
      {children}
    </Fullscreen>
  )
}
