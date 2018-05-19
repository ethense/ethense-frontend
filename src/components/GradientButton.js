
import React from 'react'
import { withTheme } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import styled from 'styled-components'

const GradientButton = withTheme()(styled(props => <Button {...props} />)`
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
export default GradientButton
