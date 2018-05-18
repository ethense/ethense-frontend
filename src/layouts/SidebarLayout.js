import React from 'react'
import styled from 'styled-components'
import Sidebar from '../components/Sidebar'
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
`)

export const SidebarLayout = ({ children, ...rest }) => {
  return (
    <Container>
      <Sidebar />
      <Content>{children}</Content>
    </Container>
  )
}
