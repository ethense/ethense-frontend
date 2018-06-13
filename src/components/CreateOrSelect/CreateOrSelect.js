import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Select, MenuItem } from '@material-ui/core'

import { InputRow } from '../elements'

class CreateOrSelect extends Component {
  render() {
    return (
      <InputRow>
        {this.props.selectItems && this.props.selectItems.length > 0 ? (
          <Select
            fullWidth
            value={this.props.selectValue}
            onChange={this.props.onChangeItem}
            displayEmpty
            disabled={this.props.disabled}
          >
            <MenuItem value="">
              <em>{this.props.emptyValue}</em>
            </MenuItem>
            {this.props.selectItems &&
              this.props.selectItems.map(item => (
                <MenuItem key={item.id} value={item.id}>
                  {item.name}
                </MenuItem>
              ))}
          </Select>
        ) : (
          [
            this.props.emptyNode,
            <Button
              onClick={this.props.onCreateItem}
              key={1}
              variant="raised"
              color="primary"
            >
              {this.props.buttonText}
            </Button>,
          ]
        )}
      </InputRow>
    )
  }
}

CreateOrSelect.propTypes = {
  emptyNode: PropTypes.node.isRequired,
  emptyValue: PropTypes.string.isRequired,
  selectItems: PropTypes.array,
  selectValue: PropTypes.string.isRequired,
  onCreateItem: PropTypes.func.isRequired,
  onChangeItem: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
}

export default CreateOrSelect
