import React from 'react';

import { GridList, GridTile } from 'material-ui/GridList';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';

import RemoveCircle from 'material-ui/svg-icons/content/remove-circle';

import lodash from 'lodash';

import {
  SUBKEY_SERVICE_PARAMETER_NAME,
  SUBKEY_SERVICE_PARAMETER_VALUE,
  SUBKEY_SERVICE_PARAMETER_INVISIBLE
} from '../constants/service_constants';

class ParameterItem extends React.Component {
  shouldComponentUpdate(nextProps) {
    const props = { ...this.props };
    for (var key in props) {
      if (props.hasOwnProperty(key) && nextProps.hasOwnProperty(key)) {
        if (
          !lodash.isEqual(props[key], nextProps[key]) &&
          typeof props[key] !== 'function'
        ) {
          return true;
        }
      }
    }
    return false;
  }

  render() {
    const {
      Translate,
      action_deleteParameterItem,
      action_modifyParameterItem,
      data = {},
      default_props,
      index,
      muiTheme,
      errorText
    } = this.props;
    return (
      <GridList cols={12} cellHeight="auto" padding={0}>
        <IconButton
          tooltip={'Delete'}
          onClick={() => action_deleteParameterItem(index)}
        >
          <RemoveCircle color={muiTheme.palette.accent1Color} />
        </IconButton>
        <GridTile cols={11} style={{ padding: 2 }}>
          <Card>
            <CardHeader
              actAsExpander={true}
              showExpandableButton={true}
              subtitle={
                <Translate
                  value="projects.export_configuration.export_setting_type"
                  name={data.type}
                />
              }
              title={
                <Translate
                  value="projects.export_configuration.export_setting_name"
                  name={data.name}
                />
              }
            />
            <CardText
              expandable={true}
              style={{ padding: '0px 16px 16px 16px' }}
            >
              <TextField
                autoFocus
                {...default_props.text_field}
                floatingLabelText={
                  <Translate
                    dangerousHTML
                    value="configurations.service_definitions.name"
                  />
                }
                errorText={errorText}
                value={data[SUBKEY_SERVICE_PARAMETER_NAME] || ''}
                onChange={event =>
                  action_modifyParameterItem(
                    SUBKEY_SERVICE_PARAMETER_NAME,
                    event.target.value
                  )
                }
                name={`${SUBKEY_SERVICE_PARAMETER_NAME}`}
              />
              <TextField
                {...default_props.text_field}
                floatingLabelText={
                  <Translate
                    dangerousHTML
                    value="configurations.service_definitions.value"
                  />
                }
                value={data[SUBKEY_SERVICE_PARAMETER_VALUE] || ''}
                onChange={event =>
                  action_modifyParameterItem(
                    SUBKEY_SERVICE_PARAMETER_VALUE,
                    event.target.value
                  )
                }
                name={`${SUBKEY_SERVICE_PARAMETER_VALUE}`}
              />
              <Checkbox
                label={
                  <Translate
                    dangerousHTML
                    value="configurations.service_definitions.invisible"
                  />
                }
                checked={data[SUBKEY_SERVICE_PARAMETER_INVISIBLE] || false}
                onCheck={(event, isInputChecked) =>
                  action_modifyParameterItem(
                    SUBKEY_SERVICE_PARAMETER_INVISIBLE,
                    isInputChecked
                  )
                }
              />
            </CardText>
          </Card>
        </GridTile>
      </GridList>
    );
  }
}

export default ParameterItem;
