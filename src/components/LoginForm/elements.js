import { withTheme } from 'material-ui/styles'
import Paper from 'material-ui/Paper'
import styled from 'styled-components'

export const StyledPaper = withTheme()(styled(Paper)`
  display: flex;
  flex-direction: column;
  width: 380px;
  height: 420px;
  padding: ${props => props.theme.spacing.medium};
`)

export const FlexSpace = withTheme()(styled.div`
  flex: 1;
  position: relative;

  &:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    border-top: 1px solid ${props => props.theme.palette.grey['200']};
    background: block;
    width: 100%;
  }
`)

export const FullWindow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`
