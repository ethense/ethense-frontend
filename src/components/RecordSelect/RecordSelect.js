import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import { withTheme } from '@material-ui/core/styles'

import { InputRow } from '../elements'

export class RecordSelect extends Component {
  render() {
    return (
      <InputRow>
        <Select
          style={{ flex: 1, marginRight: this.props.theme.spacing.medium }}
          value={this.props.selectValue}
          onChange={this.props.onChangeValue}
          displayEmpty
        >
          <MenuItem value={''}>
            <em>{this.props.emptyValue}</em>
          </MenuItem>
          {this.props.selectItems &&
            this.props.selectItems.map(item => (
              <MenuItem key={item.id} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
        </Select>
        <IconButton
          disabled={!this.props.selectValue}
          onClick={this.props.onClickDelete}
          variant="outlined"
        >
          <Icon>delete_outline</Icon>
        </IconButton>
        <IconButton
          disabled={!this.props.selectValue}
          onClick={this.props.onClickSave}
          variant="outlined"
        >
          <Icon>save</Icon>
        </IconButton>
        <IconButton color="secondary" onClick={this.props.onClickCreate}>
          <Icon>add_circle</Icon>
        </IconButton>
      </InputRow>
    )
  }
}

RecordSelect.propTypes = {
  emptyValue: PropTypes.string.isRequired,
  selectItems: PropTypes.array,
  // selectItems expects an array of items with id an
  selectValue: PropTypes.string.isRequired,
  onChangeValue: PropTypes.func.isRequired,
  onClickCreate: PropTypes.func.isRequired,
  onClickSave: PropTypes.func.isRequired,
  onClickDelete: PropTypes.func.isRequired,
}

export default withTheme()(RecordSelect)
