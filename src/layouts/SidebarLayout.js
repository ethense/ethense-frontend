import React from 'react'
import styled from 'styled-components'
import Sidebar from '../components/Sidebar'
import Notification from '../components/Notification'
import { withTheme } from '@material-ui/core/styles'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
`

const Content = withTheme()(styled.div`
  flex: 1;
  background: none;
  padding: ${props => props.theme.spacing.medium};
  overflow-y: scroll;
`)

export const SidebarLayout = ({ children, ...rest }) => {
  return (
    <Container>
      <Notification anchorOrigin={{ vertical: 'top', horizontal: 'center' }} />
      <Sidebar />
      <Content>{children}</Content>
    </Container>
  )
}
