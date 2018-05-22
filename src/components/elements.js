import React from 'react'
import { withTheme } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import { Typography, TextField } from '@material-ui/core'
import Select from '@material-ui/core/Select'
import styled from 'styled-components'

export const GradientButton = withTheme()(styled(props => (
  <Button {...props} />
))`
  background-image: linear-gradient(
    45deg,
    ${props => !props.disabled && props.theme.palette.primary.main} 10%,
    ${props => !props.disabled && props.theme.palette.secondary.main} 90%
  );

  color: ${props => !props.disabled && props.theme.palette.grey['50']};

  &:hover {
    background-image: linear-gradient(
      45deg,
      ${props => !props.disabled && props.theme.palette.primary.dark} 10%,
      ${props => !props.disabled && props.theme.palette.secondary.dark} 90%
    );
  }
`)

export const PageHeader = withTheme()(styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.large};
  padding-left: ${props => props.theme.spacing.small};
  padding-right: ${props => props.theme.spacing.small};
`)

export const SectionTitle = withTheme()(styled(({ children, ...other }) => (
  <Typography variant="caption" {...other}>
    {children}
  </Typography>
))`
  margin-left: ${props => props.theme.spacing.small};
`)

export const InputRow = withTheme()(styled(({ children, ...other }) => (
  <Paper elevation={1} {...other}>
    {children}
  </Paper>
))`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${props => props.theme.spacing.small};
  margin-top: ${props => props.theme.spacing.tiny};
  margin-bottom: ${props => props.theme.spacing.medium};
`)

export const FlexInput = withTheme()(styled(({ children, ...other }) => (
  <Paper elevation={1} {...other}>
    {children}
  </Paper>
))`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-top: ${props => props.theme.spacing.tiny};
`)

export const AddAttrButton = withTheme()(styled(Button)`
  align-self: flex-end;
  margin: ${props => props.theme.spacing.small};
`)

export const HoverSelect = styled(props => (
  <Select {...props} />
))`
  width: 96px;

  &::before {
    content: none;
  }
  &:hover::before {
    content: '';
  }
`

export const HoverTextField = styled(props => (
  <TextField {...props} InputProps={{ classes: { root: 'input' } }} />
))`
  & .input::before {
    content: none;
  }

  & .input:hover::before {
    content: '';
  }
`
