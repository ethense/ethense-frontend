import { withTheme } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
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
