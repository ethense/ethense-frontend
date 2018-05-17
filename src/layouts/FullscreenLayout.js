import React from 'react'
import styled from 'styled-components'

const Fullscreen = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`

export const FullscreenLayout = ({ children, ...rest }) => {
  return <Fullscreen>{children}</Fullscreen>
}
